import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const ButtonDiv = styled.div`
	cursor: pointer;
	/* display: flex; */
`;

const Button = styled.button`
	background: #542f34;
	border-radius: 5px;
	border: none;
	color: hsla(10, 70%, 70%, 0.5);
	cursor: pointer;
	font-family: 'Montserrat', sans-serif;
	font-weight: 900;
	font-size: 15px;
	height: 38px;
	line-height: 1.5;
	/* margin-left: 10px; */
	margin: 10px 10px auto 10px;
	padding: 7px 15px 10px 15px;
	width: 50px;
	&:hover {
		/* background: hsla(10, 70%, 70%, 0.5); */
		opacity: 80%;
	}
`;

const ShareMemesButton = ({ showMemeModal }) => {
	return (
		<ButtonDiv id='share-memes-btn-main'>
			<Button onClick={() => showMemeModal()}>🤣</Button>
		</ButtonDiv>
	);
};

export default ShareMemesButton;
