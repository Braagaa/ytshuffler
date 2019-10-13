import React from 'react';
import {channel_example} from '../../data/';

import Header from '../../components/Headers';
import ChannelList from '../../components/ChannelList';

import {isAuthenticatedUser} from '../../utils/auth';

export default function(props) {
	if (!isAuthenticatedUser()) {
		props.history.push('/');
	}

	return (
		<div>
			<Header>My Channels</Header>
			<ChannelList channels={[channel_example]}/>
		</div>
	);
};
