// import React, { useRef, useState, useEffect, useCallback } from 'react';
// import 'regenerator-runtime/runtime';
// import styled from 'styled-components';
// import ShareMemesButton from './ShareMemesButton.tsx';
// import MemeModal from './MemeModal.tsx';

// const MemeContainer = styled.div`
// 	align-items: center;
// 	display: flex;
// 	justify-content: space-between;
// 	height: 100vh;
// `;

// const CreatedMemeImage = styled.img`
// 	align-items: center;
// 	border-radius: 20%;
// 	display: flex;
// 	height: 200px;
// 	justify-content: center;
// 	margin: 5px;
// 	width: 200px;
// `;

// const ShareMemes = () => {
// 	const [toggleMemeModal, setToggleMemeModal] = useState(false);
// 	const [allMemes, setAllMemes] = useState([]);
// 	const [createdMeme, setCreatedMeme] = useState('');

// 	useEffect(() => {
// 		getAllMemes();
// 	}, []);

// 	const getAllMemes = async () => {
// 		const memesRequest = await fetch('https://api.memegen.link/templates/');
// 		const memes = await memesRequest.json();

// 		setAllMemes(memes);
// 	};

// 	const showMemeModal = () => {
// 		setToggleMemeModal(!toggleMemeModal);
// 	};

// 	return (
// 		<MemeContainer>
// 			<ShareMemesButton showMemeModal={showMemeModal} />
// 			<MemeModal
// 				allMemes={allMemes}
// 				toggleMemeModal={toggleMemeModal}
// 				setToggleMemeModal={setToggleMemeModal}
// 				setCreatedMeme={setCreatedMeme}
// 			/>
// 			{createdMeme && <CreatedMemeImage src={createdMeme} alt='created-meme' />}
// 		</MemeContainer>
// 	);
// };

// export default ShareMemes;
