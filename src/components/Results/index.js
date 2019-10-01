import React from 'react';
import styled from 'styled-components';
import {connect} from 'react-redux';
import Result from './Result';

import PreLoader from '../Loaders/';
import WaitingDots from '../Loaders/WaitingDots';
import Modal from '../Modal/';
import OverLay from '../Modal/OverLay';

import {flipObject} from '../../utils/func';
import {setState} from '../../utils/commonEvent';
import {Message} from './styles';
import {ModalButton} from '../Buttons/';
import {ChannelImg} from './styles';
import {modalMode} from '../../actions/modal';

import main from '../../style/main';
const {colors: {color3: modalColor, color1: modalBackground}} = main;

const Wrapper = styled.div`
	display: flex;
	flex-wrap: wrap;
`;
const Loader = PreLoader(WaitingDots);

const isNotSearchResult = item => item.kind !== 'youtube#searchResult';

const mapStateToProps = storeData => ({
	topicIds: storeData.initialLoad.topicIds,
	modal: storeData.modal
});
const mapDispatchToProps = {modalMode};
const connectFunction = connect(mapStateToProps, mapDispatchToProps);

export default connectFunction(function(props) {
	const {topicIds, modal} = props;
	const {data: modalData} = modal;
	const {modalMode} = props;

	const endModal = setState(modalMode, false);

	return (
		<Wrapper>
			<Modal on={modal.on}>
				<Loader size="50px" fill={modalColor} isLoading={modal.isLoading}>
					<ChannelImg src={modalData.thumbnail_url}/>
					<Message>{modalData.channelTitle} is added to your Channels!</Message>
					<ModalButton 
						color={modalBackground} 
						background={modalColor}
						onClick={endModal}
					>
						OK
					</ModalButton>
				</Loader>
			</Modal>
			<OverLay on={modal.on}/>
			{
				props.items
					.filter(isNotSearchResult)
					.map(item => <Result 
						key={item.id} 
						topicIds={flipObject(topicIds)} 
						{...item}
					/>)
			}
		</Wrapper>
	);
});
