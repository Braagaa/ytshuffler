import React, {useState} from 'react';

import Header from '../../components/Headers';
import RadioGroup from '../../components/RadioGroup';
import SongList from '../../components/SongList';

import {handleChecked} from '../../utils/commonEvent';
import {video_example} from '../../data/';

const radioButtons = [
	['recent', 'Most Recent Songs'],
	['popular', 'Most Popular Songs'],
	['viewed', 'Most Viewed Songs'],
];

const songsAddedHint = 'Selects how songs are added to the library from the channel. Either by the most recently uploaded, the most popular, or the most viewed. 100 songs are added to the list at default.';

export default function(props) {
	const [playmodeChecked, setPlaymodeChecked] = useState({});
	const handlePlaymodeChecked = handleChecked(setPlaymodeChecked);

	return(
		<div>
			<Header>Songs</Header>
			<form>
				<RadioGroup 
					title="Play Mode"
					hint={songsAddedHint}
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
