import styled, {css} from 'styled-components';

const center = css`
	justify-content: center;
	align-items: center;
`;

export const FlexWrap = styled.div`
	display: flex;
	justify-content: ${props => props.jc || 'flex-start'};
	align-items: ${props => props.ai || 'start'};
	${props => props.center && center}
	margin-bottom: ${props => props.mb || '0'};
`;
