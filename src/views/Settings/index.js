import React, {useState} from 'react';

import Header from '../../components/Headers';
import RadioGroup from '../../components/RadioGroup';

import {handleChecked} from '../../utils/commonEvent';

const radioDefaultPlaymodeButtons = [
	['recent', 'Most Recent Songs'],
	['popular', 'Most Popular Songs'],
	['viewed', 'Most Viewed Songs']
];

const defaultPlaymodeHint = 'This defaults to which songs will be added when a channel is added to your library. The first 100 songs are obtained from the channel either by the following ways: most recently uploaded, most popular, or most viewed.';

export default function(props) {
	const [defaultPlaymode, setDefaultPlaymode] = useState({});
	const handleDefaultPlaymode = handleChecked(setDefaultPlaymode);

	return(
		<div>
			<Header>Settings</Header>
			<form>
				<RadioGroup
					title="Default Play Mode"
					name="default_playmode"
					hint={defaultPlaymodeHint}
					values={radioDefaultPlaymodeButtons}
					checked={defaultPlaymode.default_playmode || 'recent'}
					handler={handleDefaultPlaymode}
				/>
			</form>
		</div>
	);
}; 
