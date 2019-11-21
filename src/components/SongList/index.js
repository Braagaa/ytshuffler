import React from 'react';
import styled from 'styled-components';
import ytDuration from 'youtube-duration-format';
import {adjustProp} from '../../utils/func';

import Song from './Song';

import main from '../../style/main';

const List = styled.ul`
	background: ${main.colors.color1};
	border-radius: 5px;
	padding: 0;
	list-style-type: none;
	padding: 10px;
	max-width: 700px;

	overflow-y: scroll;
	max-height: 600px;
	
	::-webkit-scrollbar {
	  width: 8px;
	  height: 8px;
	  background-color: #aaa; /* or add it to the track */
	}
	::-webkit-scrollbar-thumb {
		background: ${main.colors.purple};
	}

	li:last-child div {
		margin-bottom: 0;
	}
`;

export default function(props) {
	return(
		<List>
			{
				props.songs
					.map(adjustProp('duration', ytDuration))
					.map(s => <Song key={s._id} channelTitle={props.channelTitle} {...s}/>)
			}
		</List>
	);
}; 
