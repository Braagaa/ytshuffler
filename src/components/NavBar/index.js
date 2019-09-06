import React from 'react';
import styled from 'styled-components';
import LinkedItems from '../LinkedItems';
import main from '../../style/main';

const {colors} = main;

const Wrapper = styled.div`
	background: ${colors.color1};
`;


const Inner = styled.div`
	height: 100px;
	margin: 0 auto;
	display: flex;
	align-items: center;
	justify-content: center;
	max-width: 1200px;

	@media (min-width: 768px) {
		justify-content: flex-end;
	}
`;

const toData = ([link, text]) => 
	<data key={text} link={link} text={text}/>;

const navItems = [
	['/player', 'Player'],
	['/library', 'Library'], 
	['/search', 'Search'],
	['/signout', 'Sign Out']
].map(toData);

export default function(props) {
	return (
		<Wrapper>
			<Inner>
				<nav>
					<LinkedItems>{navItems}</LinkedItems>
				</nav>
			</Inner>
		</Wrapper>
	);
};
