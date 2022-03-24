import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const ButtonDiv = styled.div`
	cursor: pointer;
	display: flex;
`;

const Button = styled.button`
	background: hsla(10, 70%, 70%, 0.5);
	border-radius: 20px;
	border: none;
	color: purple;
	cursor: pointer;
	font-family: 'Montserrat', sans-serif;
	font-weight: 900;
	font-size: 17px;
	height: 50px;
	line-height: 1.5;
	margin-left: 10px;
	padding: 10px 15px 10px 17px;
	width: 175px;
	&:hover {
		background: hsla(10, 70%, 70%, 0.5);
		opacity: 80%;
	}
`;

const ShareMemesButton = ({ showMemeModal }) => {
	return (
		<ButtonDiv id='share-memes-btn-main'>
			<Button onClick={() => showMemeModal()}>share meme 🤣</Button>
		</ButtonDiv>
	);
};

export default ShareMemesButton;
