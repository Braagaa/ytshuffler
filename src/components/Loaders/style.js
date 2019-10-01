import styled from 'styled-components';

export const MainWrapper = styled.div`
	width: ${props => props.size || '120px'};
	height: ${props => props.size || '120px'};
	margin: 0 auto;

	visibility: ${props => !props.isLoading ? 'hidden' : 'visible'};
	display: ${props => !props.isLoading ? 'none' : 'block'};
`;
