import React, { useState, useEffect, useRef, useCallback } from 'react';
import styled from 'styled-components';
import { useSpring, animated } from 'react-spring';
import MemeThumbnail from './MemeThumbnail.tsx';
import AddMemes from './AddMemes.tsx';
import DoNotDisturbOnIcon from '@mui/icons-material/DoNotDisturbOn';

const CloseModalIcon = styled(DoNotDisturbOnIcon)`
	color: purple;
	cursor: pointer;
	height: 20px;
	position: absolute;
	padding: 0;
	right: 10px;
	top: 10px;
	width: 20px;
	z-index: 1;
`;

const ModalDiv = styled.div`
	align-items: start;
	display: flex;
	height: 100%;
	justify-content: start;
	position: fixed;
	width: 100%;
	z-index: 999;
`;

const ModalContainer = styled.div`
	border-radius: 10px;
	box-shadow: 0 5px 16px rgba(0, 0, 0, 0.2);
	background: white;
	color: #000000;
	display: flex;
	flex-direction: column;
	height: 600px;
	grid-template-columns: 1fr 1fr;
	position: relative;
	width: 800px;
	/* z-index: 999; */
`;

const ModalMainImage = styled.img`
	/* background-color: hsla(10, 50%, 70%, 0.5); */
	box-shadow: 0 5px 16px rgba(0, 0, 0, 0.8);
	display: flex;
	height: 300px;
	margin-right: 30px;
	margin-top: 20px;
	width: 350px;
`;

const ModalCreateForm = styled.div`
	align-items: center;
	color: purple;
	display: flex;
	flex-direction: column;
	font-family: 'Montserrat', sans-serif;
	font-weight: 900;
	font-size: 17px;
	justify-content: center;
	line-height: 2;
`;

const MemeModalContainer = styled.div`
	display: flex;
	height: 400px;
	justify-content: space-evenly;
	width: 800px;
`;

const jokerMeme = {
	id: 'joker',
	name: "It's Simple, Kill the Batman",
	lines: 2,
	overlays: 0,
	styles: [],
	blank: 'https://api.memegen.link/images/joker.png',
	example: {
		text: ["it's simple", 'kill the batman'],
		url: "https://api.memegen.link/images/joker/it's_simple/kill_the_batman.png",
	},
	source: 'https://www.youtube.com/watch?v=f_XHjqABQQA',
	_self: 'https://api.memegen.link/templates/joker',
};

const MemeModal = ({ allMemes, toggleMemeModal, setToggleMemeModal, setCreatedMeme }) => {
	const [currentIndex, setCurrentIndex] = useState(0);
	const [currentMeme, setCurrentMeme] = useState(jokerMeme);
	const [messageOne, setMessageOne] = useState('');
	const [messageTwo, setMessageTwo] = useState('');
	const [captions, setCaptions] = useState([]);
	const [memeID, setMemeID] = useState('');

	const ref = useRef();

	useEffect(() => {
		setCurrentMeme(allMemes[currentIndex]);
		setMemeID(allMemes[currentIndex]?.id);
	}, [currentIndex, currentMeme]);

	useEffect(() => {
		document.addEventListener('keydown', escapeKey);
		return () => document.removeEventListener('keydown', escapeKey);
	}, []);

	useEffect(() => console.log('memeID: ', memeID), [currentMeme]);

	const animation = useSpring({
		config: {
			duration: 250,
		},
		opacity: toggleMemeModal ? 1 : 0,
		transform: toggleMemeModal ? `translateY(0%)` : `translateY(-100%)`,
	});

	const closeMemeModal = (event) => {
		if (ref.current === event.target) {
			setToggleMemeModal(false);
		}
	};

	const escapeKey = useCallback(
		(event) => {
			if (event.key === 'Escape' && toggleMemeModal) {
				setToggleMemeModal(false);
			}
		},
		[setToggleMemeModal, toggleMemeModal]
	);

	return (
		<React.Fragment>
			{toggleMemeModal ? (
				<ModalDiv onClick={closeMemeModal} ref={ref}>
					<animated.div style={animation}>
						<ModalContainer toggleMemeModal={toggleMemeModal}>
							<MemeThumbnail
								allMemes={allMemes}
								setCurrentMeme={setCurrentMeme}
								setCurrentIndex={setCurrentIndex}
								setMemeID={setMemeID}
								messageOne={messageOne}
								messageTwo={messageTwo}
							/>
							<MemeModalContainer>
								{allMemes && <ModalMainImage src={currentMeme?.blank} alt='selected-meme' />}
								<AddMemes
									toggleMemeModal={toggleMemeModal}
									setToggleMemeModal={setToggleMemeModal}
									currentIndex={currentIndex}
									allMemes={allMemes}
									currentMeme={currentMeme}
									messageOne={messageOne}
									setMessageOne={setMessageOne}
									messageTwo={messageTwo}
									setMessageTwo={setMessageTwo}
									memeID={memeID}
									memeRef={ref}
									setCreatedMeme={setCreatedMeme}
								/>
								<CloseModalIcon
									aria-label='close-modal-icon'
									onClick={() => setToggleMemeModal(!toggleMemeModal)}
								/>
							</MemeModalContainer>
						</ModalContainer>
					</animated.div>
				</ModalDiv>
			) : null}
		</React.Fragment>
	);
};

export default MemeModal;
