import styled, {css, keyframes} from 'styled-components';
import main from '../../style/main';

const {colors: {color1: white}} = main;

const bumpIt = keyframes`
	0%, 100% {
		transform: scale(1);
	}

	50% {
		transform: scale(1.5);
	}
`;

const animation = css`
	animation: ${bumpIt} 0.2s ease-out;
`;

export const List = styled.ul`
	list-style-type: none;
	padding: 0;
	display: flex;
	text-align: center;
	flex-wrap: wrap;

	li {
		margin: 1em 0 3em;
		flex: 0 0 50%;

		@media (min-width: 650px) {
			flex: 0 0 33%;
		}

		@media (min-width: 900px) {
			flex: 0 0 25%;
		}
	}
`;

export const Genre = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	cursor: pointer;
	${props => props.selected && animation}

	svg path {
		stroke: ${white};
		stroke-width: 4;
		transition: fill 0.2s;
		fill: ${props => props.selected ? white : 'transparent'};
	}

`;

export const ImgWrapper = styled.div`
	height: 150px;
	width: 150px;
	margin-bottom: 2em;

	@media (min-width: 507px) {
		height: 120px;
		width: 120px;
	}
`;

export const Message = styled.p`
	margin: 1em 0 0;
	font-size: 1em;
	font-weight: bold;
	line-height: normal;
`;

export const Count = styled(Message)`
	margin: 0;
`;
