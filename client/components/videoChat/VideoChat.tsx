import React, { useState, useEffect } from 'react';
import {
  connect,
  createLocalVideoTrack,
  RemoteParticipant,
} from 'twilio-video';
import { Box, TextField, Stack, Typography, Button, Grid } from '@mui/material'
import styled from 'styled-components';

// type Nullable<T> = T | null;
const VideoFrame = styled('div')`
{
  box-sizing: border-box;
  position: relative;
  border-radius: 8px;
  margin-left: .75vw;
  margin-bottom: .75vw;
  width: 50%;
  overflow: hidden;
  height: 50%;
  -webkit-mask-image: -webkit-radial-gradient(white, black);
  display: flex;
  justify-content: center;
}
`;
const VideoContainer = styled('div')`
{
  display:flex;
  flex-wrap:wrap;
  width:100%;
  margin-left: -.75vw;
}
`;

const VideoChat = ({currentRoom, currentUserName, setVideoToggle}) => {
  const [token, setToken] = useState('');


  /**
   * Entry point.
   */
  //  const localMediaContainer = document.querySelector('#local-media-container') as HTMLDivElement;

  async function main() {
    // Provides a camera preview window.
    const localVideoTrack = await createLocalVideoTrack();
    console.log('localVideoTrack', localVideoTrack)

    const localMediaContainer = document.querySelector('#currentUserVideo') as HTMLDivElement;
    localMediaContainer.appendChild(localVideoTrack.attach());
  }

  useEffect(() => {
    main();
  }, []);

  const connectToRoom = async () => {


    // main()
    const data = {
      room: currentRoom,
      userName: currentUserName,
    }
    const response = await fetch('/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });
    const roomToken = await response.json();
    setToken(roomToken);
    // main()
    const conectedRoom = await connect(roomToken, {
      name: currentRoom,
      audio: false,
      video: {width: 640}
    })
    conectedRoom.participants.forEach(
      participant => participantConnected(participant)
  );

    console.log('conectedRoom', conectedRoom)
    conectedRoom.on('participantConnected', participantConnected);
    conectedRoom.on('participantDisconnected', participantDisconnected);
    conectedRoom.once('disconnected', error => conectedRoom.participants.forEach(participantDisconnected));

  }
  function participantConnected(participant: RemoteParticipant) {
    const localMediaContainer = document.querySelector('#currentUserVideo') as HTMLDivElement;
    console.log('Participant "%s" connected', participant.identity);

    const div = document.createElement("VideoFrame");
    div.id = participant.sid;
    div.innerText = participant.identity;
    // setDivList(divList => [...divList, div]);
    // console.log('divList', divList)


    participant.on('trackSubscribed', track => trackSubscribed(div, track));
    participant.on('trackUnsubscribed', trackUnsubscribed);

    participant.tracks.forEach(publication => {
      if (publication.isSubscribed) {
        trackSubscribed(div, publication.track);
      }
    });

    //document.body.appendChild(div);
    localMediaContainer.appendChild(div);
  }
  type participant = {
    identity: string,
    sid: string,
    tracks: any,
    on: any,
    once: any,
    off: any,
    removeTrack: any,
    publishTrack: any,
    unpublishTrack: any,
    unpublishAll: any,
    publish: any,
    unpublish: any,
  }


  function participantDisconnected(participant:RemoteParticipant) {
    console.log('Participant "%s" disconnected', participant.identity);
    const divToRemove = document.getElementById(participant.sid);
    divToRemove?.remove()

    // const newDivList = divList.filter(div => div.id !== participant.sid);
    // setDivList(newDivList);
  }

  function trackSubscribed(div, track) {
    div.appendChild(track.attach());
  }

  function trackUnsubscribed(track) {
    track.detach().forEach(element => element.remove());
  }

  //onClick={handleLogout}
  return (
    <div className="room">
      <h2>{currentRoom}</h2>
      <button onClick={connectToRoom}>connectToRoom</button>
      <button  onClick ={() => setVideoToggle(false)}>Log out</button>
      <VideoContainer id="currentUserVideo">



      </VideoContainer>
    </div>
  );

};

export default VideoChat;