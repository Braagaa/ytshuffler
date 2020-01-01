import React,{useEffect, useState} from 'react';
import {connect} from 'react-redux';

import {FlexWrap} from '../../components/Wrappers';
import Header from '../../components/Headers/';
import Genres from '../../components/GenreList';
import {SmallButton} from '../../components/Buttons';
import InfoTooltip from '../../components/Tooltip/InfoTooltip';
import PreLoader from '../../components/Loaders';
import NoResults from '../../components/NoResults';

import {getAllGenres} from '../../apis/shuffler';
import {initalFetch} from '../../actions/fetching';
import {clearData} from '../../actions/select';
import {playGenresPlaylist} from '../../actions/player';
import {unauthorized} from '../../utils/auth';
import {nth} from '../../utils/func';
import {setState} from '../../utils/commonEvent';

const Loader = PreLoader();
const infoTooltipMessage = "Select the genres you want to play, then press 'Play Genres' to randomly shuffle a playlist."
const noResultsMessage = 'No genres have been found in your channels.';

const mapStateToProps = storeData => ({
	genres: storeData.fetching.genres,
	selectedGenres: storeData.select
});
const mapDispatchToProps = {initalFetch, clearData, playGenresPlaylist};
const connectFunction = connect(mapStateToProps, mapDispatchToProps);

export default connectFunction(function(props) {
	const {initalFetch, clearData, playGenresPlaylist} = props;
	const {genres = [], selectedGenres = {}} = props;
	const [initialLoad, setInitialLoad] = useState(true);
	const [isLoading, setLoading] = useState(false);

	const playGenres = e => {
		const genresStr = Object.entries(selectedGenres)
			.filter(nth(1))
			.map(nth(0))
			.join(',');

		setLoading(true);
		playGenresPlaylist(genresStr)
			.then(setState(clearData))
			.then(setState(setLoading, false))
			.catch(unauthorized(props.history));
	};

	useEffect(() => {
		initalFetch(getAllGenres, 'genres')
			.then(setState(setInitialLoad, false));
		return () => clearData();
	}, [initalFetch, clearData]);

	return (
		<Loader isLoading={initialLoad} lm="3em">
			<Header>Genres</Header>
			<NoResults 
				bool={genres.length !== 0} 
				message={noResultsMessage}
			>
				<FlexWrap ai="center" mb="3em">
					<SmallButton 
						bs 
						display="block" 
						margin="0 1em 0 0" 
						disabled={initialLoad || isLoading}
						onClick={playGenres}
					>
						Play Genres
					</SmallButton>
					<InfoTooltip>{infoTooltipMessage}</InfoTooltip>
				</FlexWrap>
				<Genres genres={genres}/>
			</NoResults>
		</Loader>
	);
});
