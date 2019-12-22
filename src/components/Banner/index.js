import React from 'react';
import PropTypes from 'prop-types';
import {ReactComponent as MusicNote} from '../../imgs/music-player.svg';

import {ConditionalLoader} from '../Conditional/';
import {Wrapper, DefaultWrapper, Header, Name} from './style';
import main from '../../style/main';

const {colors: {color3: redish}} = main;

const Banner = function(props) {
	return (
		<Wrapper>
			<ConditionalLoader bool={!props.isError && props.imgUrl}>
				<Header imgUrl={props.imgUrl}/>
				<DefaultWrapper>
					<MusicNote fill={redish}/>
				</DefaultWrapper>
			</ConditionalLoader>
			<Name>{props.artistName}</Name>
		</Wrapper>
	);
};

export default Banner;

Banner.propTypes = {
	artistName: PropTypes.string,
	imgUrl: PropTypes.string,
	isError: PropTypes.bool
};
