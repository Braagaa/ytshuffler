import React from 'react';
import styled from 'styled-components';

import Channel from './Channel';

const Wrapper = styled.div`
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
						key={c.id}
					/>
				})
			}
		</Wrapper>
	);
};
