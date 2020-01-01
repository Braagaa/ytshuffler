import React from 'react';
import {useUpdateImage} from '../../hooks/';
import Conditional from '../Conditional';

import {ReactComponent as Heart} from '../../imgs/heart.svg';
import {Wrappper, HeartWrapper, Inner, Header, Img, P, Ul} from './styles';

const HeartOrNull = Conditional(Heart);

export default function({thumbnail_url, title, topics, songs, ...props}) {
	const {_id, history, isFavourite} = props;
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
			<HeartWrapper>
				<HeartOrNull bool={isFavourite} fill="red"/>
			</HeartWrapper>
		</Wrappper>
	);
};
