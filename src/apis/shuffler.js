import axios from 'axios';
import {getCSRFStorage} from '../utils/auth';

//For now use local for calling the database server
const databaseURL = 'http://localhost:3000/';
const youtubeURL = databaseURL + 'youtube/';
const shufflerURL = databaseURL + 'shuffler/';
const authURL = databaseURL + 'auth/';
const usersURL = databaseURL + 'users/';

const getAxios = (url, initalQuery = {}) => (query = {}) => 
	axios.get(url, {
		...initalQuery,
		params: {
			...query
		}
	});

const postAxios = (url, config = {}) => (data = {}) => 
	axios.post(url, {...data}, {
		xsrfHeaderName: 'CSRF',
		headers: {CSRF: getCSRFStorage()},
		...config
	});

export const getYoutubeSearchChannels = q => getAxios(youtubeURL + 'search/channels')({q});
export const getYoutubeChannels = ids => getAxios(youtubeURL + 'channels')({ids});
export const getYotubeTopicIds = () => getAxios(youtubeURL + 'topicIds')();
export const getChannels = getAxios(shufflerURL + 'channels');
export const getChannel = id => getAxios(shufflerURL + 'channels/' + id)();
export const createChannel = postAxios(shufflerURL + 'channels');
export const registerUser = postAxios(authURL + 'register');
export const loginUser = postAxios(authURL + 'login');
export const getUserVideoInfo = id => getAxios(usersURL + 'video_info/' + id)();
