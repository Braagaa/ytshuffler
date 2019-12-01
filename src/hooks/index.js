import {useState, useEffect} from 'react';
import {updateChannelImage} from '../apis/shuffler';
import {path, thunk} from '../utils/func';

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
