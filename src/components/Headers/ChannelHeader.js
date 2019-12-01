import React from 'react';
import styled from 'styled-components';
import Header from './index.js';

import {useUpdateImage} from '../../hooks';

const Wrapper = styled.div`
	width: 100%;
	display: flex;
	flex-wrap: wrap;

	h1 {
		align-self: center;

		@media (min-width: 768px) {
			margin: auto;
		}
	}
`;

export default function(props) {
	const [imageUrl, updateImage] = useUpdateImage(props.id, props.src);

	const onError = e => updateImage();

	return (
		<Wrapper>
			<img src={imageUrl} alt={props.title} onError={onError}/>
			<Header>{props.children}</Header>
		</Wrapper>
	);
};
