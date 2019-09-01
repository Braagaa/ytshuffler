import React from 'react';
import styled from 'styled-components';

import Song from './Song';

const List = styled.ul`
	background: white;
	border-radius: 5px;
	padding: 0;
	list-style-type: none;
	padding: 10px;

	li:last-child div {
		margin-bottom: 0;
	}
`;

export default function(props) {
	return(
		<List>
			{
				props.songs.map(s => <Song key={s.id} {...s}/>)
			}
		</List>
	);
}; 
