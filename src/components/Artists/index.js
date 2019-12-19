import React from 'react';
import PropTypes from 'prop-types';

import ArtistGroup from './ArtistGroup';
import {ArtistsList} from './style';
import {Li} from './style';

const Artists = function(props) {
	const {artists} = props;
	const listObj = artists
		.reduce((acc, obj) => {
			const capital = obj.artist.charAt(0);
			const capitalList = acc[capital] || [];
			return {...acc, [capital]: [...capitalList, obj]};
		}, {});

	return (
		<div>
			<ArtistsList>
				{
					Object.entries(listObj).map(([key, artists]) => (
						<Li key={key}>
							<ArtistGroup header={key} artists={artists}/>
						</Li>
					))
				}
			</ArtistsList>
		</div>
	);
};

export default Artists;

Artists.propTypes = {
	artists: PropTypes.array
};
Artists.defaultProps = {
	artists: []
};
