import React from 'react';
import {connect} from 'react-redux';
import {selectData, deselectData} from '../../actions/select';

import {Genre, ImgWrapper, Message, Count} from './style';
import {ReactComponent as QuestionMark} from '../../imgs/genres/question-mark.svg';

import main from '../../style/main';

const mapStateToProps = storeData => ({
	selectedGenres: storeData.select
});
const mapDispatchToProps = {selectData, deselectData};
const connectFunction = connect(mapStateToProps, mapDispatchToProps);

export default connectFunction(function(props) {
	const {selectData, deselectData} = props;
	const {selectedGenres} = props;

	const ImgComponent = props.ImgComponent || QuestionMark;
	const title = props.ImgComponent ? props.title : 'Unknown';

	const onClick = e => !selectedGenres[title] ? 
		selectData(title) : deselectData(title)

	return (
		<Genre onClick={onClick} selected={selectedGenres[title]}>
			<ImgWrapper>
				<ImgComponent fill={main.colors.color1}/>
				<Message>{title}</Message>
				<Count>{props.count}</Count>
			</ImgWrapper>
		</Genre>
	);
});
