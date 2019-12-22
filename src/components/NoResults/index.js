import React from 'react';
import PropTypes from 'prop-types';

import {ConditionalLoader} from '../Conditional';
import Message from '../Message';

const NoResults = function(props) {
	return (
		<ConditionalLoader bool={props.bool}>
			<React.Fragment>
				{props.children}
			</React.Fragment>
			<Message mt="3em" links={props.links}>{props.message}</Message>
		</ConditionalLoader>
	);
};

export default NoResults;

NoResults.propTypes = {
	bool: PropTypes.bool,
	links: PropTypes.array,
	message: PropTypes.string
};

NoResults.defaultProps = {
	links: []
};
