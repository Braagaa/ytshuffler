import axios from 'axios';

//For now use local for calling the database server
const databaseURL = 'http://localhost:3000/';
const youtubeURL = databaseURL + 'youtube/';
const spotifyURL = databaseURL + 'spotify/';
const shufflerURL = databaseURL + 'shuffler/';
const authURL = databaseURL + 'auth/';
const usersURL = databaseURL + 'users/';

//This is needed to prevent circular dependency
const getCSRFStorage = () => localStorage.getItem('CSRF');

const getAxios = (url, initalQuery = {}) => (query = {}) => 
	axios.get(url, {
		...initalQuery,
		params: {
			...query
		}
	});

const createAxios = type => (url, config = {}) => (data = {}) => 
	axios[type](url, data, {
		xsrfHeaderName: 'CSRF',
		headers: {CSRF: getCSRFStorage()},
		...config
	});
const postAxios = createAxios('post');
const putAxios = createAxios('put');

const deleteAxios = (url, config = {}) => () => 
	axios.delete(url, {
		xsrfHeaderName: 'CSRF',
		headers: {CSRF: getCSRFStorage()},
		...config
	});

//shuffler
export const getYoutubeSearchChannels = q => getAxios(youtubeURL + 'search/channels')({q});
export const getYoutubeChannels = ids => getAxios(youtubeURL + 'channels')({ids});
export const getYotubeTopicIds = () => getAxios(youtubeURL + 'topicIds')();
export const getChannels = getAxios(shufflerURL + 'channels');
export const getChannel = id => getAxios(shufflerURL + 'channels/' + id)();
export const getAllSongs = getAxios(shufflerURL + 'channels/songs');
export const getAllGenres = getAxios(shufflerURL + 'channels/genres');
export const getGenresPlaylist = getAxios(shufflerURL + 'channels/playlists/genres');
export const getAllArtistsPlaylists = getAxios(shufflerURL + 'channels/playlists/artists');
export const createChannel = postAxios(shufflerURL + 'channels');
export const deleteChannels = deleteAxios(shufflerURL + 'channels/');
export const deleteChannel = id => deleteAxios(shufflerURL + 'channels/' + id)();
export const updateAllChannels = putAxios(shufflerURL + 'channels/update');
export const updateChannelImage = id => putAxios(shufflerURL + `channels/${id}/update/image`)();
export const changeChannelPlaylist = (channelId, playmode) => 
	putAxios(shufflerURL + `channels/${channelId}/playlist/${playmode}`)();
export const getArtistsImages = (artists, size) => getAxios(spotifyURL + `search/artists/images`)({artists, size});
export const updateFavouriteStatus = (id, favourite) => putAxios(shufflerURL + `channels/${id}/favourite`)({favourite});
export const getFavouriteSongs = getAxios(shufflerURL + 'channels/favourites/songs');

//auth
export const registerUser = postAxios(authURL + 'register');
export const loginUser = postAxios(authURL + 'login');

//users
export const getUserVideoInfo = id => getAxios(usersURL + 'video_info/' + id)();
export const getUserSettings = getAxios(usersURL + 'settings');
export const updateUserSettings = putAxios(usersURL + 'settings');
