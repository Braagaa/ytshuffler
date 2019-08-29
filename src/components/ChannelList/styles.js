import styled from 'styled-components';
import main from '../../style/main';

export const Wrappper = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	background: rgba(255,255,255,0.8);
	width: 100%;
	padding: 15px;
	cursor: pointer;
	border-radius: 30px;
	margin: 0 10px 10px 0;
	position: relative;

	@media (min-width: 576px) {
		width: 75%;
		margin: 0 auto 10px;
	}

	@media (min-width: 768px) {
		justify-content: flex-start;
		width: 48%;
	}
`;

export const Inner = styled.div`
	@media (min-width: 576px) {
	}
`;

export const Img = styled.img`
	border-radius: 50%;
	width: 150px;
	height: 150px;

	@media (min-width: 768px) {
		width: 132px;
		height: 132px;
	}
`;

export const textStyles = `
	color: ${main.colors.color3};
	font-weight: bold;
	margin-left: 32px;
`;

export const Header = styled.h4`
	${textStyles}
	width: fit-content;
	background: ${main.colors.color3};
	padding: 4px;
	color: ${main.colors.color1};
	font-size: 1em;
	margin-bottom: 1em;
`;

export const P = styled.p`
	${textStyles}
	font-weight: 700;
	margin-bottom: 5px;
`;
