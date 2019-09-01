import React, {useState} from 'react';

import Header from '../../components/Headers';
import RadioGroup from '../../components/RadioGroup';
import SongList from '../../components/SongList';

import {handleChecked} from '../../utils/commonEvent';
import {video_example} from '../../data/';

const radioButtons = [
	['all', 'All Songs'],
	['recent', 'Most Recent Songs'],
	['popular', 'Most Popular Songs'],
	['viewed', 'Most Viewed Songs'],
];

export default function(props) {
	const [playmodeChecked, setPlaymodeChecked] = useState({});
	const handlePlaymodeChecked = handleChecked(setPlaymodeChecked);

	return(
		<div>
			<Header>Songs</Header>
			<form>
				<RadioGroup 
					title="Play Mode"
					name="playmode"
					values={radioButtons}
					checked={playmodeChecked.playmode || 'all'}
					handler={handlePlaymodeChecked}
				/>
			</form>
			<SongList songs={[video_example]}/>
		</div>
	);
}; 
