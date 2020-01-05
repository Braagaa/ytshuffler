import React, {useEffect} from 'react';
import {connect} from 'react-redux';
import {getUserSettings, updateUserSettings, deleteChannels} from '../../apis/shuffler';
import {fetching, mergeFetched, fetchClear} from '../../actions/fetching';
import {modalMode} from '../../actions/modal';

import {SettingWrapper, ButtonsWrapper} from './style';
import Header from '../../components/Headers';
import RadioGroup from '../../components/RadioGroup';
import {SmallButton} from '../../components/Buttons';
import Loaders from '../../components/Loaders';
import WaitingDots from '../../components/Loaders/WaitingDots';
import Modal from '../../components/Modal';
import OverLay from '../../components/Modal/OverLay';
import InfoModal from '../../components/InfoModal';

import main from '../../style/main';
import {setState} from '../../utils/commonEvent';
import {unauthorized} from '../../utils/auth';

const radioDefaultPlaymodeButtons = [
	['date', 'Most Recent Songs'],
	['viewCount', 'Most Viewed Songs'],
];
const radioChannelOrder = [
	['alphabetical', 'Alphabetical'],
	['updated', 'Recently Updated'],
	['newest', 'Newest'],
	['oldest', 'Oldest']
];

const defaultPlaymodeHint = 'This defaults to which songs will be added when a channel is added to your library. The first 100 songs are obtained from the channel either by the following ways: most recently uploaded or most viewed.';
const channelOrderHint = 'Adjust how you want your channels to be ordered in your Channels List by the following ways:';

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
	
	const mergeSettings = prop => e => {
		mergeFetched('settings', {[prop]: e.target.value});
	};
	const playmodeOnChange = mergeSettings('playmode');
	const channelOrderOnChange = mergeSettings('channelOrder');

	const deleteAllChannels = e => {
		e.preventDefault();
		modalMode(true);
	};

	const yesDelete = e => {
		e.preventDefault();
		modalMode(true, true);
		deleteChannels()
			.then(setState(modalMode, false, false))
			.catch(unauthorized(props.history));
	};

	const saveSettings = e => {
		e.preventDefault();
		fetching(updateUserSettings, 'settings', settings)
			.catch(unauthorized(props.history));
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
					<SettingWrapper>
						<RadioGroup
							title="Default Play Mode"
							name="default_playmode"
							hint={defaultPlaymodeHint}
							values={radioDefaultPlaymodeButtons}
							checked={settings.playmode || 'date'}
							onChange={playmodeOnChange}
						/>
						<RadioGroup
							title="Channel Order"
							name="channel_order"
							hint={channelOrderHint}
							values={radioChannelOrder}
							checked={settings.channelOrder || 'alphabetical'}
							onChange={channelOrderOnChange}
						/>
					</SettingWrapper>
					<ButtonsWrapper>
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
							onClick={deleteAllChannels}
						>
							Delete All Channels
						</SmallButton>
					</ButtonsWrapper>
				</form>
			</div>
			<Modal on={modal.on}>
				<WaitingDotsLoader 
					isLoading={modal.isLoading} 
					fill={redish}
					size="100px"
				>
					<InfoModal 
						message="Are you sure you want to delete all of your channels?"
						type="options"
						yes={yesDelete}
					/>
				</WaitingDotsLoader>
			</Modal>
			<OverLay on={modal.on}/>
		</Loader>
	);
}); 
