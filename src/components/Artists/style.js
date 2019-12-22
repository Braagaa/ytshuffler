import styled from 'styled-components';

import {Pill as Button} from '../Buttons/';
import main from '../../style/main';

const {colors: {color1: white, color3: redish, color6: darkredish, mintcream}} = main;
const valueOrDefault = (prop, def) => props => props[prop] || def;

export const Ul = styled.ul`
	width: 100%;
	list-style-type: none;
	padding: 0;
`;

export const Li = styled.li`
	margin-bottom: 1em;
`;

export const ArtistsList = styled(Ul)`
	width: 100%;
	list-style-type: none;
	margin: ${props => props.m || '0 0 2em'};
	padding: 0;
`;

export const Wrapper = styled.div`
	display: flex;
	align-items: center;
	flex: ${valueOrDefault('f', 'none')};
	justify-content: ${valueOrDefault('jc', 'flex-start')};

`;

export const BodyWrapper = styled.div`
	display: flex;
	align-items: center;
	padding: 8px;
	transition: all 0.2s ease-in;
	border: 1px transparent solid;
	border-radius: 10px;
	max-width: 700px;

	:hover {
		color: ${redish};
		background: ${mintcream};
	}

	:hover button {
		transform: scale(1);
	}

	:hover svg {
		fill: ${redish};
	}
`;

export const Header = styled.h3`
	background: ${darkredish};
	width: 100%;
	font-size: 1.8em;
	font-weight: bold;
	padding: 2px 0 2px 12px;
	margin-bottom: 0.8em;
`;

export const Img = styled.img`
	width: 50px;
	height: 50px;
`;

export const Name = styled.span`
	font-size: 1.3em;
	font-weight: bold;
	padding: 9px;
	padding-left: 15px;
`;

export const Stats = styled.span`
	font-weight: bold;
	font-size: 0.9em;
`;

export const Pill = styled(Button)`
	background: ${redish};
	color: ${white};
	transform: scale(0);
	transition: 0.1s 0.1s ease-out;
`;
