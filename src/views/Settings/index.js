import React, {useEffect} from 'react';
import {connect} from 'react-redux';
import {getUserSettings, updateUserSettings, deleteChannels} from '../../apis/shuffler';
import {fetching, mergeFetched, fetchClear} from '../../actions/fetching';
import {modalMode} from '../../actions/modal';

import Header from '../../components/Headers';
import RadioGroup from '../../components/RadioGroup';
import {SmallButton, ModalButton} from '../../components/Buttons';
import {FlexForm} from '../../components/Forms/style';
import Loaders from '../../components/Loaders';
import WaitingDots from '../../components/Loaders/WaitingDots';
import Modal from '../../components/Modal';
import OverLay from '../../components/Modal/OverLay';
import {Message} from '../../components/Results/styles';

import main from '../../style/main';
import {setState} from '../../utils/commonEvent';

const radioDefaultPlaymodeButtons = [
	['date', 'Most Recent Songs'],
	['viewCount', 'Most Viewed Songs'],
];

const defaultPlaymodeHint = 'This defaults to which songs will be added when a channel is added to your library. The first 100 songs are obtained from the channel either by the following ways: most recently uploaded or most viewed.';

const {color1: white, color3: redish} = main.colors;
const Loader = Loaders();
const WaitingDotsLoader = Loaders(WaitingDots);

const mapStateToProps = storeData => ({
	settings: storeData.fetching.settings || {},
	initalLoading: storeData.fetching.isLoading,
	modal: storeData.modal
});
const mapDispatchToProps = {fetching, mergeFetched, fetchClear, modalMode};
const connectFunction = connect(mapStateToProps, mapDispatchToProps);

export default connectFunction(function(props) {
	const {fetching, mergeFetched, fetchClear, modalMode} = props;
	const {initalLoading, settings, modal} = props;

	const playmodeOnChange = e => {
		mergeFetched('settings', {playmode: e.target.value});
	};

	const deleteAllChannels = e => {
		e.preventDefault();
		modalMode(true);
	};

	const yesDelete = e => {
		e.preventDefault();
		modalMode(true, true);
		deleteChannels()
			.then(setState(modalMode, false, false));
	};

	const noDelete = e => {
		e.preventDefault();
		modalMode(false);
	};

	const saveSettings = e => {
		e.preventDefault();
		fetching(updateUserSettings, 'settings', settings);
	};

	useEffect(() => {
		fetching(getUserSettings, 'settings');

		return () => fetchClear();
	}, [fetching, fetchClear]);

	return(
		<Loader isLoading={initalLoading} lm='2em' fill={main.colors.color1}>
			<div>
				<Header>Settings</Header>
				<form onSubmit={saveSettings}>
					<RadioGroup
						title="Default Play Mode"
						name="default_playmode"
						hint={defaultPlaymodeHint}
						values={radioDefaultPlaymodeButtons}
						checked={settings.playmode || 'date'}
						onChange={playmodeOnChange}
					/>
					<SmallButton 
						background={white} 
						color={redish}
						bs={true}
					>
						Save Settings
					</SmallButton>
					<SmallButton
						background={white} 
						color={redish}
						bs={true}
						margin='1em 0 0 2em'
						onClick={deleteAllChannels}
					>
						Delete All Channels
					</SmallButton>
				</form>
			</div>
			<Modal on={modal.on}>
				<WaitingDotsLoader 
					isLoading={modal.isLoading} 
					fill={redish}
					size="100px"
				>
					<Message fs='1.6em' mb='2em'>
						Are you sure you want to delete all of your channels?
					</Message>
					<FlexForm>
						<ModalButton 
							background={redish} 
							color={white}
							onClick={yesDelete}
						>
							Yes
						</ModalButton>
						<ModalButton 
							background={redish} 
							color={white} 
							onClick={noDelete}
						>
							No
						</ModalButton>
					</FlexForm>
				</WaitingDotsLoader>
			</Modal>
			<OverLay on={modal.on}/>
		</Loader>
	);
}); 
