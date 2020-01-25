const noop = () => {};

const nullYTPlayer = [
	'loadVideoById',
	'setSize',
	'setVolume',
	'stopVideo',
	'playVideo',
	'pauseVideo',
	'mute',
	'unMute',
	'isMuted',
	'setVolume',
].reduce((acc, prop) => ({...acc, [prop]: noop}), {});

export {nullYTPlayer as default};
