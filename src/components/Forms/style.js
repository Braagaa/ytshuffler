import styled from 'styled-components';
import main from '../../style/main';

const {color7, color3} = main.colors;

export const H2 = styled.h2`
	margin: 0;
	padding: 0.4em 0 0.3em;
	text-align: center;
	font-weight: 300;
	font-size: 3.5em;
`;

export const Form = styled.form`
	width: 320px;
	text-align: left;
	position: relative;

	p, ul {
		font-size: 0.8em;
	}

	ul {
		margin-bottom: 0;
	}
`;

export const Rule = styled.li`
	color: ${props => props.valid ? color7 : color3};
	transition: all 0.5s;
`;

export const HideRule = styled.p`
	margin: 0;
	visibility: ${props => props.hide ? 'hidden' : 'visible'};
	opacity: ${props => props.hide ? '0' : '1'};
	height: ${props => props.hide ? '0' : 'auto'};
	color: ${props => props.valid ? color7 : color3};
	transition: all 0.5s;
`;

export const SongForm = styled.form`
	@media (min-width: 725px) {
		display: flex;
	}

	button {
		margin: 0 0 1.5em 1em;

		@media (min-width: 725px) {
			align-self: center;
		}
	}
`;

export const FlexForm = styled.form`
	display: flex;
	justify-content: space-between;
`;
