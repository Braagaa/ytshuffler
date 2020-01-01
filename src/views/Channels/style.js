import styled from 'styled-components';

export const ButtonsWrapper = styled.div`
	display: flex;
	flex-direction: column;

	button {
		margin-bottom: 15px;
	}

	@media(min-width: 576px) {
		flex-direction: row;
		flex-wrap: wrap;

		button {
			margin: 0 auto;
		}
	}

	@media(min-width: 768px) {
		button {
			margin: 0 20px 0 0;
		}
	}
`;
