import React, {useState} from 'react';
import styled from 'styled-components';

import Button from '../../components/Buttons';
import Modal from '../../components/Modal';
import OverLay from '../../components/Modal/OverLay';
import Form from '../../components/Forms';
import main from '../../style/main';

const {colors} = main;

const Wrapper = styled.div`
	max-width: 800px;
	margin: 0 auto;
`;

const toField = ([text, type = null]) => ({text, type});
const fields = {
	login: [['email'],['password']].map(toField),
	register: [['email'], ['password'], ['repeat password', 'password']]
		.map(toField)
};

export default function (props) {
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

	return (
		<div className="text-center">
			<h1 className="display-3 my-5 font-weight-bold">YT Shuffler</h1>
			<Wrapper className="d-flex flex-column flex-md-row justify-content-md-around">
				<div className="mb-4 mb-md-0">
					<Button clickHandle={loginModalHandle}>Login</Button>
					<Modal color={colors.color3} on={modalsOn.login}>
						<Form 
							text="Login" 
							exitHandle={loginModalHandle}
							fields={fields.login}
						/>
					</Modal>
				</div>
				<div>
					<Button clickHandle={registerModalHandle}>Register</Button>
					<Modal color={colors.color3} on={modalsOn.register}>
						<Form 
							text="Sign Up" 
							exitHandle={registerModalHandle}
							fields={fields.register}
						/> 
					</Modal>
				</div>
			</Wrapper>
			<OverLay 
				background={colors.color1} 
				on={modalsOn.login || modalsOn.register}
			/>
		</div>	
	);
};
