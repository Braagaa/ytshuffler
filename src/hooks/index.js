import {useState} from 'react';

export const useMessages = start => {
	const [message, setMessage] = useState({
		message: '',
		links: []
	});

	const callback = (message, links = []) => 
		setMessage({message, links});

	return [message, callback];
};
