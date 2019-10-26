import styled from 'styled-components';

import main from '../../style/main';

const hidden = props => props.hidden ? 'hidden' : 'visible';

export const Prev = styled.div`
	width: 50px;
	height: 50px;
	cursor: pointer;
	transform: rotate(0);
	margin-right: 20px;
	visibility: ${hidden};

	::before {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		border-radius: 50%;
		background: ${main.colors.color1};
		content: '';
		opacity: 0;
		transition: transform 0.3s, opacity 0.3s;
	}

	:hover::before {
		opacity: 1;
	}
`;

export const Next = styled(Prev)`
	transform: rotate(180deg);
`;

export const arrowStyles = `
	position: absolute;
	left: 25%;
	width: 3px;
	height: 50%;
	background: ${main.colors.color1};
	content: '';
	transition: transform 0.3s, background-color 0.3s;
`;

export const Icon = styled.span`
	position: relative;
	display: block;
	width: 80%;
	height: 80%;
	margin: 10% 0 0 10%;

	::before {
		transform-origin: 0 100%;
		transform: translateX(-50%) rotate(30deg);
		${arrowStyles}
	}

	:hover::before {
		background: ${main.colors.color3};
		transform: rotate(45deg);
	}

	::after {
		top: 50%;
		transform-origin: 0 0;
		transform: translateX(-50%) rotate(-30deg);
		${arrowStyles}
	}

	:hover::after {
		background: ${main.colors.color3};
		transform: rotate(-45deg);
	}
`;

export const PageNum = styled.div`
	visibility: ${hidden};
	font-size: 1.2em;
	align-self: center;
`;
