import React, { useState, useEffect, useRef, useCallback } from 'react';
import styled from 'styled-components';
import { useSpring, animated } from 'react-spring';

const MemeCreateButton = styled.button`
	background: #542f34;
	border: none;
	border-radius: 5px;
	color: hsla(10, 70%, 70%, 0.5);
	cursor: pointer;
	font-family: 'Montserrat', sans-serif;
	font-weight: 900;
	font-size: 15px;
	padding: 10px 20px;
	&:hover {
		/* background: hsla(10, 70%, 70%, 0.5); */
		opacity: 80%;
	}
`;

const AddMemeDiv = styled.div`
	align-items: flex-start;
	align-content: space-between;
	display: flex;
	flex-direction: column;
	max-width: 500px;
	margin-top: 50px;
`;

const AddMemeInput = styled.input`
	border: 1px solid purple;
	color: purple;
	font-family: 'Montserrat', sans-serif;
	font-weight: 900;
	max-width: 450px;
	padding: 8px;
	width: 100%;
`;

const AddMemes = ({
	toggleMemeModal,
	setToggleMemeModal,
	setCreatedMeme,
	currentIndex,
	allMemes,
	currentMeme,
	messageOne,
	setMessageOne,
	messageTwo,
	setMessageTwo,
	memeID,
	memeRef,
}) => {
	//
	useEffect(() => {});
	//
	const createNewMeme = async (memeId, input1, input2) => {
		input1 = input1 || '_';
		input2 = input2 || '_';

		// const URL = `https://api.memegen.link/images/${memeId}/${input1}/${input2}.png`;
		const getNewMeme = await fetch(
			`https://api.memegen.link/images/${memeId}/${input1}/${input2}.png`
		);

		const memeResponse = await getNewMeme;
		// console.log('getNewMemeResponse: ', memeResponse.url);
		setCreatedMeme(memeResponse.url);
		setToggleMemeModal(!toggleMemeModal);
	};

	function onInputChange(event) {
		if (event.target.name === 'messageOne') {
			setMessageOne(event.target.value);
		} else {
			setMessageTwo(event.target.value);
		}
	}

	return (
		<div>
			<AddMemeDiv>
				<AddMemeInput
					name='messageOne'
					placeholder='Enter Text One'
					type='text'
					value={messageOne}
					onChange={onInputChange}
				/>
				<br />
				<br />
				<AddMemeInput
					name='messageTwo'
					placeholder='Enter Text Two'
					type='text'
					value={messageTwo}
					onChange={onInputChange}
				/>
			</AddMemeDiv>
			<br />
			<br />
			<MemeCreateButton
				onClick={() => {
					createNewMeme(memeID, messageOne, messageTwo);
					setMessageOne('');
					setMessageTwo('');
				}}
			>
				SEND 🤣
			</MemeCreateButton>
		</div>
	);
};

export default AddMemes;
