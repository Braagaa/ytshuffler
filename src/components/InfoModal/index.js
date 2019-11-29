import React from 'react';
import {connect} from 'react-redux';
import styled from 'styled-components';

import {Message} from '../Results/styles';
import {ModalButton} from '../Buttons';
import {FlexForm} from '../Forms/style';
import {ConditionalLoader as Conditional} from '../Conditional';
import {ReactComponent as Lock} from '../../imgs/lock.svg'; 
import {ReactComponent as Warning} from '../../imgs/warning.svg'; 

import {modalMode} from '../../actions/modal';
import main from '../../style/main';

const {colors: {color1: white, color3: redish}} = main;

const ImgWrapper = styled.div`
	display: block;
	margin: 0 auto 2em;
	width: 120px;
	height: 120px;
`;

const createButton = (text, handle) => (
	<ModalButton 
		background={redish} 
		color={white}
		onClick={handle}
	>
		{text}
	</ModalButton>
);

const createImg = type => (
	<ImgWrapper>
		<Conditional bool={type === 'auth'}>
			<Lock fill={redish}/>
			<Warning fill={redish}/>
		</Conditional>
	</ImgWrapper>
);

const mapStateToProps = storeData => ({
	modal: storeData.modal
});
const mapDispatchToProps = {modalMode};
const connectFunction = connect(mapStateToProps, mapDispatchToProps);

export default connectFunction(function(props) {
	const {modal, modalMode} = props;

	const exitHandle = e => {
		e.preventDefault();
		modalMode(false)
	};

	return (
		<React.Fragment>
			{createImg(props.img)}
			<Message>{props.message || modal.data.message}</Message>
			<Conditional bool={props.type === 'options'}>
				<FlexForm>
					{createButton('Yes', props.yes)}
					{createButton('No', exitHandle)}
				</FlexForm>
				{createButton('OK', exitHandle)}
			</Conditional>		
		</React.Fragment>
	);
}); 
