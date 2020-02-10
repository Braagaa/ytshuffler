import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';

import Button from '../../components/Buttons';
import Modal from '../../components/Modal';
import OverLay from '../../components/Modal/OverLay';
import Register from '../../components/Forms/Register';
import Login from '../../components/Forms/Login';
import main from '../../style/main';
import InfoModal from '../../components/InfoModal';

import {Header, Wrapper, Inner, ButtonsWrap, MusicNote} from './style';
import {modalMode} from '../../actions/modal';

const {colors} = main;

const mapStateToProps = storeData => ({
	errorModal: storeData.modal
});
const mapDispatchToProps = {modalMode};
const connectFunction = connect(mapStateToProps, mapDispatchToProps);

export default connectFunction(function (props) {
	const {errorModal, modalMode} = props;
	const [modalsOn, setModalsOn] = useState({
		login: false, 
		register: false
	});

	const modalHandle = prop => e => setModalsOn({
		...modalsOn, 
		[prop]: !modalsOn[prop]
	});
	const loginModalHandle = modalHandle('login');
	const registerModalHandle = modalHandle('register');

	const isNewUser = new URLSearchParams(props.location.search)
		.get('newUser');

	useEffect(() => {
		if (isNewUser === '1') {
			modalMode(true, false, {
				message: 'You have completed your registration. Proceed to login!'
			});
		}
	}, [isNewUser]);	

	return (
		<Wrapper>
			<Inner>
				<Header>YT Shuffler</Header>
				<MusicNote/>
				<ButtonsWrap>
					<Button clickHandle={loginModalHandle}>Login</Button>
					<Modal color={colors.color3} on={modalsOn.login}>
						<Login history={props.history} exitHandle={loginModalHandle}/>
					</Modal>
					<Button clickHandle={registerModalHandle}>Register</Button>
					<Modal color={colors.color3} on={modalsOn.register}>
						<Register history={props.history} exitHandle={registerModalHandle}/>
					</Modal>
				</ButtonsWrap>
			</Inner>
			<Modal on={errorModal.on}>
				<InfoModal img="auth"/>
			</Modal>
			<OverLay 
				background={colors.color1} 
				on={modalsOn.login || modalsOn.register || errorModal.on}
			/>
		</Wrapper>	
	);
});
