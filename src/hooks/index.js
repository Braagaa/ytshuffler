import {useState, useEffect, useLayoutEffect} from 'react';
import store from '../store/';
import {initalFetch, fetching, fetchClear, mapFetched} from '../actions/fetching';
import {updateChannelImage, getArtistsImages} from '../apis/shuffler';
import {unauthorized} from '../utils/auth';
import {prop, path, thunk} from '../utils/func';
import {ifErrorStatus} from '../utils/errors';

export const useInitalLoad = (apiCall, key, ...args) => {
	useEffect(() => {
		initalFetch(apiCall, key, ...args)(store.dispatch);
		return () => store.dispatch(fetchClear(key));
	//eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);
};

export const usePagination = (apiCall, key, pagination, history, ...args) => {
	useEffect(() => {
		if (!pagination.initalized) {
			fetching(apiCall, key, ...args)(store.dispatch)
				.catch(unauthorized(history));
		}
	//eslint-disable-next-line react-hooks/exhaustive-deps
	}, [pagination.page]);
};

export const useMessages = start => {
	const [message, setMessage] = useState({
		message: '',
		links: []
	});

	const callback = (message, links = []) => 
		setMessage({message, links});

	return [message, callback];
};

export const useUpdateImage = (channelId, thumbnail_url) => {
	const [used, setUsed] = useState(false);
	const [imageUrl, setImageUrl] = useState(thumbnail_url);

	useEffect(() => {
		setImageUrl(thumbnail_url);
	}, [thumbnail_url]);

	const callback = () => {
		if (!used) {
			updateChannelImage(channelId)
				.then(path('data.thumbnail_url'))
				.then(setImageUrl)
				.then(thunk(setUsed, true));
		}
	};

	return [imageUrl, callback];
};

export const useResize = () => {
	const [size, setSize] = useState([0, 0]);

	useLayoutEffect(() => {
		const updateSize = () => setSize(
			[window.innerWidth, window.innerHeight]
		);
		window.addEventListener('resize', updateSize);
		updateSize();
		return () => window.removeEventListener('resize', updateSize);
	}, []);

	return size;
};

const mapArtists = imgObjs => data => {
	const {artists} = data;
	const arr = imgObjs.reduce((acc, imgObj) => {
		const i = acc.findIndex(obj => obj.artist.toLowerCase() === imgObj.name.toLowerCase());
		if (i !== -1) acc[i].url = imgObj.url;
		return acc;
	}, artists);
	return ({...data, artists: arr});
};

const collectImages = artists => {
	const artistsStr = artists
		.map(prop('artist'))
		.join(',');
		
	return getArtistsImages(artistsStr)
		.then(prop('data'))
		.then(imgObjs => store.dispatch(mapFetched('data', mapArtists(imgObjs))));
};

export const useArtistsImages = artists => {
	const perSet = 20;

	useEffect(() => {
		let id = null;
		let time = 3000;
		let current = artists;

		if (artists.length > 0) {
			const callback = () => {
				const subset = current.slice(0, perSet);
				if (subset.length === 0) return clearTimeout(id);

				current = current.slice(perSet);
				collectImages(subset)
					.then(() => id = setTimeout(callback, time))
					.catch(ifErrorStatus(429, ({response: {headers}}) => 
						id = setTimeout(callback, parseInt(headers['Retry-After']))
					))
					.catch(() => clearTimeout(id));
			};

			id = setTimeout(callback, 1000);
		};

		return () => clearTimeout(id);
	}, [artists]);
};
