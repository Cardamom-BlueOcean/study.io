import React, { useRef, useEffect, useCallback } from 'react';
import { useSpring, animated } from 'react-spring';
import styled from 'styled-components';
import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft';
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';

const MemeThumbnailDiv = styled.div`
	display: flex;
	flex-wrap: wrap;
	justify-content: start;
	height: 300px;
	margin: start;
	margin-left: 15px;
	margin-top: 10px;
	-ms-overflow-style: none;
	overflow-x: scroll;
	scrollbar-width: none;
	width: 800px;
	&::-webkit-scrollbar {
		box-shadow: inset 0 0 5px lightgrey;
		display: none;
	}
`;

const MemeThumbnailImage = styled.img`
	align-items: center;
	border: 1px dotted lightgrey;
	border-radius: 20%;
	box-shadow: 0 5px 16px rgba(0, 0, 0, 0.4);
	cursor: pointer;
	display: flex;
	height: 75px;
	margin: 5px;
	width: 75px;
	&:hover {
		opacity: 50%;
	}
`;

const MemeHeadText = styled.h1``;

const MemeThumbnail = ({ allMemes, setCurrentMeme, setCurrentIndex, messageOne, messageTwo }) => {
	//
	return (
		<MemeThumbnailDiv>
			{allMemes &&
				allMemes.map((meme, index) => (
					<MemeThumbnailImage
						key={index}
						src={meme.blank}
						onClick={(meme) => {
							setCurrentIndex(index);
							setCurrentMeme(meme);
						}}
					/>
				))}
		</MemeThumbnailDiv>
	);
};

export default MemeThumbnail;
