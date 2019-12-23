const baseYoutubeUrl = 'https://www.youtube.com/';

class URL {
	constructor(baseUrl) {
		this.baseURL = baseUrl;
		this.paths = {};
	}

	createPath(key, value) {
		this.paths = {
			...this.paths, 
			[key]: this.baseURL + value
		};
	}

	paths() {
		return this.paths;
	}
}

export const youtubeURL = new URL(baseYoutubeUrl);
youtubeURL.createPath('channel', 'channel/');
youtubeURL.createPath('watch', 'watch?v=');
