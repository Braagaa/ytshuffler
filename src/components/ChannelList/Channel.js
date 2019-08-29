import React from 'react';
import styled from 'styled-components';

import main from '../../style/main';
import {Wrappper, Inner, Header, Img, P} from './styles';

export default function(props) {
	const {snippet: data} = props;
	const {snippet: {thumbnails}} = props;
	return (
		<Wrappper>
			<Img src={thumbnails.medium.url} alt={data.title}/>
			<Inner>
				<Header>{data.title}</Header>
				<P>{props.statistics.videoCount} Songs</P>
				<P>Type of Music</P>
			</Inner>
		</Wrappper>
	);
};
