import React from 'react';
import {channel_example} from '../../data/';

import Header from '../../components/Headers';
import ChannelList from '../../components/ChannelList';

export default function(props) {
	return (
		<div>
			<Header>My Channels</Header>
			<ChannelList channels={[channel_example]}/>
		</div>
	);
};
