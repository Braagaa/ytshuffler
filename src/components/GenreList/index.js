import React from 'react';

import Genre from './Genre';
import {List} from './style';

import {ReactComponent as Cross} from '../../imgs/genres/cross.svg'; 
import {ReactComponent as Violin} from '../../imgs/genres/violin.svg';
import {ReactComponent as Banjo} from '../../imgs/genres/banjo.svg';
import {ReactComponent as Headphones} from '../../imgs/genres/headphones.svg';
import {ReactComponent as Boombox} from '../../imgs/genres/boombox.svg';
import {ReactComponent as Punch} from '../../imgs/genres/punch.svg';
import {ReactComponent as Trumpet} from '../../imgs/genres/trumpet.svg';
import {ReactComponent as Sitar} from '../../imgs/genres/sitar.svg';
import {ReactComponent as Maracas} from '../../imgs/genres/maracas.svg';
import {ReactComponent as Microphone} from '../../imgs/genres/microphone.svg';
import {ReactComponent as AfricanDrum} from '../../imgs/genres/african-drum.svg'; 
import {ReactComponent as Harmonica} from '../../imgs/genres/harmonica.svg';
import {ReactComponent as Guitar} from '../../imgs/genres/electric-guitar.svg';
import {ReactComponent as Piano} from '../../imgs/genres/piano.svg';

const GenreImgs = {
	'Christian Music': Cross,
	'Classical Music': Violin,
	'Country': Banjo,
	'Electronic Music': Headphones,
	'Hip Hop Music': Boombox,
	'Independent Music': Punch,
	'Jazz': Trumpet,
	'Music of Asia': Sitar,
	'Music of Latin America': Maracas,
	'Pop Music': Microphone,
	'Reggae': AfricanDrum,
	'Rhythm and Blues': Harmonica,
	'Rock Music': Guitar,
	'Soul Music': Piano
};

export default function(props) {
	return (
		<List>
			{
				props.genres.map((genre, index) => (
					<li key={index}>
						<Genre 
							title={genre.genre} 
							ImgComponent={GenreImgs[genre.genre]}
							count={genre.count}
						/>
					</li>
				))
			}
		</List>
	);
};
