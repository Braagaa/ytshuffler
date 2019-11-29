import styled from 'styled-components';
import main from '../../style/main';

export const Wrapper = styled.div`
	position: fixed;
	bottom: 20px;
	right: 20px;
	z-index: 1000;
	width: 300px;
	padding: 10px;
	background-color: ${main.colors.color1};
	color: ${main.colors.color3};
	border: 3px solid ${main.colors.color6};
	border-radius: 5px;
	box-shadow: 10px 10px 13px 0px rgba(0,0,0,0.75);
	transition: all 0.3s ease-in-out;

	${props => props.minimize || `
		transform: translate(150px, 150px) scale(0);
	`}
`;

export const ButtonsWrapper = styled.div`
	display: flex;
	justify-content: space-evenly;
`;

export const Hide = styled.div`
	opacity: ${props => props.auth ? '0' : '1'};
	visibility: ${props => props.auth ? 'hidden' : 'visible'};
`;

export const Textt = styled.div`
	font-size: 1.1em;
	font-weight: bold;
	text-align: center;
`;
export const SongTitle = styled(Textt)`
	color: ${main.colors.color5};
`;
export const ChannelTitle = styled(Textt)`
	font-size: 0.8em;
	color: ${main.colors.purple};
	margin-bottom: 20px;
`;

export const Artist = styled(Textt)`
	color: ${main.colors.color3};
`;

export const ButtonWrapper = styled.div`
	width: 25px;
	height: 25px;
	cursor: pointer;
`;

export const MinimizeWrapper = styled(ButtonWrapper)`
	transform: rotate(180deg);
`;

export const ExpandWrapper = styled.div`
	width: 50px;
	height: 50px;
	position: fixed;
	right: 20px;
	bottom: 20px;
	background-color: ${main.colors.color1};
	border: 3px solid ${main.colors.color6};
	border-radius: 5px;
	box-shadow: 7px 7px 13px 0px rgba(0,0,0,0.75);
	display: flex;
	justify-content: center;
	align-items: center;
	z-index: 10000;
	transition: all 0.3s ease-in-out;
	transform: scale(0);

	${props => props.minimize || `
		transform: scale(1);
	`}
`;

export const ImgHolder = styled.div`
	width: 174px;
	height: 174px;
	margin: 0 auto 20px;
`;
