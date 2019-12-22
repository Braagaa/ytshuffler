import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import {playList} from '../../actions/player';
import {useInitalLoad, useLoadResource} from '../../hooks';
import {getAllArtistsPlaylists, getArtistsImages} from '../../apis/shuffler';

import PreLoader from '../../components/Loaders';
import SongList from '../../components/SongList';
import Banner from '../../components/Banner';
import {SmallButton} from '../../components/Buttons';
import NoResults from '../../components/NoResults';

const Loader = PreLoader();

const mapStateToProps = storeData => ({
	initialLoad: storeData.fetching.initialLoad,
	isLoading: storeData.fetching.isLoading,
	isError: storeData.fetching.isError,
	data: storeData.fetching.data || {},
	images: storeData.fetching.images || [],
});
const mapDispatchToProps = {playList};
const connectFunction = connect(mapStateToProps, mapDispatchToProps);

const ArtistView = connectFunction(function(props) {
	const {initialLoad, isLoading, isError, data, images} = props;
	const {playList} = props;
	const paramArtist = props.match.params.artist;
	const {artists: [artist = {}] = []} = data;
	const [image = {}] = images;

	const noArtistMessage = `${paramArtist} is not found in your channels. Go and <link>search<link> for channels that may have ${paramArtist}!`

	useInitalLoad(getAllArtistsPlaylists, 'data', {text: paramArtist});
	useLoadResource(getArtistsImages, 'images', paramArtist, 'large');

	const playAllClick = e => playList(artist.playlist);

	return (
		<Loader isLoading={initialLoad || isLoading} lm="3em">
			<NoResults 
				bool={!initialLoad && artist.artist !== undefined}
				links={[`/search?q=${paramArtist}`]}
				message={noArtistMessage}
			>
				<Banner 
					artistName={artist.artist} 
					imgUrl={image.url}
					isError={isError}
				/>
				<SmallButton
					bs={true} 
					margin="0 0 2em"
					onClick={playAllClick}
				>
					Play All
				</SmallButton>
				<SongList songs={artist.playlist || []}/>
			</NoResults>
		</Loader>
	);
});

export default ArtistView;

ArtistView.propTypes = {
	fetching: PropTypes.func,
	playList: PropTypes.func,
	initialLoad: PropTypes.bool,
	isLoading: PropTypes.bool,
	data: PropTypes.object,
	images: PropTypes.array
};

ArtistView.defaultProps = {
	initialLoad: true,
	isLoading: true,
	isError: false
};
