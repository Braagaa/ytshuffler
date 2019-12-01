import React from 'react';
import {useUpdateImage} from '../../hooks/';

import {Wrappper, Inner, Header, Img, P, Ul} from './styles';

export default function({thumbnail_url, title, topics, songs, ...props}) {
	const {_id, history} = props;
	const onClick = e => history.push('/channels/' + _id);

	const [imageUrl, updateImage] = useUpdateImage(_id, thumbnail_url);

	const imageError = e => {
		updateImage();
	};

	return (
		<Wrappper onClick={onClick}>
			<Img src={imageUrl} alt={title} onError={imageError}/>
			<Inner>
				<Header>{title}</Header>
				<P>{songs.length} Songs</P>
				<Ul>
					{
						topics.slice(0,2)
							.map(topic => <li key={topic}><P>{topic}</P></li>)
					}
				</Ul>
			</Inner>
		</Wrappper>
	);
};
