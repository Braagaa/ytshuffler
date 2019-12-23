import React from 'react';
import styled from 'styled-components';

import Channel from './Channel';

const Wrapper = styled.div`
	margin: 2em 0;

	@media (min-width: 768px) {
		display: flex;
		flex-wrap: wrap;
	}
`;

export default function(props) {
	return (
		<Wrapper>
			{
				props.channels.map((c, i) => {
					return <Channel 
						{...c} 
						key={c._id}
						history={props.history}
					/>
				})
			}
		</Wrapper>
	);
};
