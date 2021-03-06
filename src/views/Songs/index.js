import React, {useEffect} from 'react';
import {connect} from 'react-redux';

import Header from '../../components/Headers/ChannelHeader';
import {ButtonsWrapper} from './style';
import {SongForm as Form, FlexForm} from '../../components/Forms/style';
import {SmallButton, ModalButton} from '../../components/Buttons';
import RadioGroup from '../../components/RadioGroup';
import SongList from '../../components/SongList';
import Loaders from '../../components/Loaders';
import WaitingDots from '../../components/Loaders/WaitingDots';
import Modal from '../../components/Modal/';
import InfoModal from '../../components/InfoModal';
import OverLay from '../../components/Modal/OverLay';
import {Message, ChannelImg} from '../../components/Results/styles';
import DateText from '../../components/Message';
import Condition, {ConditionalLoader as Conditional} from '../../components/Conditional';
import Heart from '../../components/Heart';

import {getChannel, changeChannelPlaylist, deleteChannel, updateFavouriteStatus} from '../../apis/shuffler';
import {fetching, fetchClear, clearError} from '../../actions/fetching';
import {modalMode} from '../../actions/modal';
import {playList} from '../../actions/player';
import {setState} from '../../utils/commonEvent';
import main from '../../style/main';
import {unauthorized, noChannel} from '../../utils/auth';
import {channelDateFormat} from '../../utils/date';
import {useToggle} from '../../hooks';

const Loader = Loaders();
const ModalLoader = Loaders(WaitingDots);
const DateOrNull = Condition(DateText);
const radioButtons = [
	['date', 'Most Recent Songs'],
	['viewCount', 'Most Viewed Songs'],
];

const songsAddedHint = 'Selects how songs are selected for this channel. Either by the most recently uploaded or the most viewed. The top 100 songs are added to the list.';

const mapStateToProps = dataStore => ({
	fetchingState: dataStore.fetching,
	channel: dataStore.fetching.channel || {},
	isLoading: dataStore.fetching.isLoading,
	modal: dataStore.modal
});
const mapDispatchToProps = {fetching, fetchClear, modalMode, playList, clearError};
const connectFunction = connect(mapStateToProps, mapDispatchToProps);

export default connectFunction(function(props) {
	const {fetchingState, channel, isLoading, modal, history} = props;
	const {fetching, fetchClear, modalMode, playList, clearError} = props;
	const {id} = props.match.params;

	const [isFavourite, disabled, toggleHeart] = useToggle(
		channel.isFavourite, 
		updateFavouriteStatus, 
	);

	const onChange = e => {
		window.scrollTo(0, 0);
		fetching(changeChannelPlaylist, 'channel', id, e.target.value)
			.catch(unauthorized(props.history));
	};

	const onDelete = e => {
		e.preventDefault();
		clearError();
		modalMode(true);
	};

	const noDelete = e => {
		e.preventDefault();
		modalMode(false);
	};

	const yesDelete = e => {
		e.preventDefault();
		modalMode(true, true);
		deleteChannel(id)
			.then(() => props.history.push('/channels/'))
			.then(setState(modalMode, false))
			.catch(unauthorized(props.history));
	};

	const onPlay = e => {
		e.preventDefault();
		const songs = channel.songs
			.map(song => ({...song, channelTitle: channel.title}));
		playList(songs);
	};

	const onFavourite = e => {
		e.preventDefault();
		if (!disabled) {
			toggleHeart(id, !isFavourite);
		}
	};

	useEffect(() => {
		fetching(getChannel, 'channel', id)
			.catch(noChannel(history));
		return () => fetchClear();
	}, [fetching, fetchClear, id, history]);

	return(
		<Loader 
			isLoading={isLoading} 
			fill={main.colors.color1}
			lm={'5em'}
		>
			<div>
				<Header id={id} src={channel.thumbnail_url}>
					{channel.title}
				</Header>
				<Form onSubmit={onDelete}>
					<RadioGroup 
						title="Play Mode"
						hint={songsAddedHint}
						name="playmode"
						values={radioButtons}
						checked={channel.playmode}
						onChange={onChange}
					/>
					<ButtonsWrapper>
						<SmallButton
							color={main.colors.color3}
							background={main.colors.color1}
							bs={true}
							type="submit"
						>
							Delete Channel
						</SmallButton>
						<SmallButton
							color={main.colors.color3}
							background={main.colors.color1}
							bs={true}
							onClick={onPlay}
						>
							Play
						</SmallButton>
						<Heart 
							onClick={onFavourite}
							isFilled={isFavourite}
							m="0 0 0 1.5em"
						/>
					</ButtonsWrapper>
				</Form>
				<DateOrNull 
					bool={channel.updatedOn} 
					fs="1.2em" 
					mb="1em"
					ta="left"
				>
					{`Last Updated: ${channelDateFormat(channel.updatedOn)}`}
				</DateOrNull>
				<SongList 
					channelTitle={channel.title} 
					songs={channel.songs || []}
				/>
			</div>
			<Modal on={modal.on}>
				<Conditional bool={!fetchingState.error}>
					<ModalLoader 
						size="100px" 
						isLoading={modal.isLoading} 
						fill={main.colors.color3}
					>
						<ChannelImg 
							src={channel.thumbnail_url} 
							alt={channel.title}
						/>
						<Message>Are you sure you want to delete {channel.title}?</Message>
						<FlexForm onSubmit={yesDelete}>
							<ModalButton 
								color={main.colors.color1}
								background={main.colors.color3}
								type="submit"
							>
								Yes
							</ModalButton>
							<ModalButton
								color={main.colors.color1}
								background={main.colors.color3}
								onClick={noDelete}
							>
								No
							</ModalButton>
						</FlexForm>
					</ModalLoader>
					<InfoModal/>
				</Conditional>
			</Modal>
			<OverLay on={modal.on}/>
		</Loader>
	);
}); 
