import styled, {css} from 'styled-components';
import main from '../../style/main';

export const Wrapper = styled.div`
	width: 100%;
	max-width: 800px;
	padding: 20px;
	margin: 40px 0 40px;
	border-radius: 10px;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	background-color: ${main.colors.mintcream};

	@media (min-width: 700px) {
		flex-direction: row;
		justify-content: flex-start;
	}
`;

export const Name = styled.h1`
	margin: 1em 0 0.5em;
	font-size: 1.8em;
	background-color: ${main.colors.color3};
	font-weight: bold;
	padding: 5px;
	border-radius: 5px;

	@media (min-width: 700px) {
		margin: 1em auto 0.5em;
		font-size: 2.5em;
	}

	@media (min-width: 800px) {
		font-size: 3.5em;
	}
`;

const headerProps = css`
	width: 200px;
	height: 200px;

	@media (min-width: 850px) {
		width: 240px;
		height: 240px;
	}
`;

export const Header = styled.header`
	background-image: ${props => `url("${props.imgUrl}")`};
	background-size: cover;
	border-radius: 50%;
	border: 4px ${main.colors.purple} solid;
	${headerProps}
`;

export const DefaultWrapper = styled.div`
	${headerProps}
`;
