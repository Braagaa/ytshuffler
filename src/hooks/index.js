import {useState, useEffect} from 'react';

export const useMessages = start => {
	const [message, setMessage] = useState({
		message: '',
		links: []
	});

	const callback = (message, links = []) => 
		setMessage({message, links});

	return [message, callback];
};

export const usePlayer = (vidObj = {}) => {
	const [player, setPlayer] = useState(null);

	useEffect(() => {
		const tag = document.createElement('script');
		tag.src = 'https://www.youtube.com/iframe_api';

		const firstScriptTag = document.getElementsByTagName('script')[0];
		firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

		const onStateChange = e => {
			if (e.data === window.YT.PlayerState.ENDED) {
			};
		};

		const onError = e => console.error(e.data);

		tag.onload = function() {
			window.onYouTubeIframeAPIReady = function() {
				const player = new window.YT.Player('player', {
					height: '174',
					width: '174',
					playerVars: {
						origin: document.location.origin,
						enablejsapi: 1,
						disablekb: 1
					}
				});

				player.addEventListener('onStateChange', onStateChange);
				player.addEventListener('onError', onError);

				setPlayer(player);
			}
		}

		return () => {
			player.removeEventListener('onStateChange', onStateChange);
			player.removeEventListener('onError', onError);
			player.destroy();
		};
		//eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return player;
};
