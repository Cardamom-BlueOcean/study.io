import React, { useState, useEffect } from 'react';
import {
  connect,
  createLocalVideoTrack,
  RemoteParticipant,
} from 'twilio-video';
import { Box, TextField, Stack, Typography, Button, Grid } from '@mui/material'
import styled from 'styled-components';
import '../../../src/video.css';
import { isFSA } from '@reduxjs/toolkit/dist/createAction';
import { isFuture } from 'date-fns';

// type Nullable<T> = T | null;
const VideoFrame = styled('div')`
{
  border: 3px solid #542F34;
  width: 100%;
  height: auto;
  justify-self: center;
  align-self: center;
  margin: 2px;
}
`;
const VideoContainer = styled('div')`
{
  display:grid;
  grid-template-columns: repeat(3, 30%);
  grid-template-rows: repreat(2, 250px);
  width:100%;
  gap: 5px;
  margin: auto;
}
`;


const VideoChat = ({ currentRoom, currentUserName, setVideoToggle }) => {

  const [connectButton, setConnectButton] = useState<boolean>(false);
  // const [token, setToken] = useState<any>(null);

  const [activeRoom, setActiveRoom] = useState<any>(null);


  async function setUpLocalVideo() {
    const localVideoTrack = await createLocalVideoTrack();
    console.log('localVideoTrack', localVideoTrack)
    const localMediaContainer = document.querySelector('#currentUserVideo') as HTMLDivElement;
    localMediaContainer.appendChild(localVideoTrack.attach());
  }

  useEffect(() => {
    setUpLocalVideo();

  }, []);

  // useEffect(() => {
  //   if (connectButton) {

  //   }
  // });


  const getToken = async () => {
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
    return roomToken
  }



  const connectToRoom = async () => {
    const token = await getToken();
    const conectedRoom = await connect(token, {
      name: currentRoom,
      audio: false,
      video: { width: 1000 }
    })
    if (!activeRoom) {
      setActiveRoom(conectedRoom);
    }

    const arr = []
    conectedRoom.participants.forEach(
      participant => { participantConnected(participant); arr.push(participant) }
    );
    setPeopleInDaRoom(arr)
    console.log('arr', arr)
    console.log('people in da room', peopleInDaRoom)
    listenForRoomUpdates(conectedRoom)
  }
  const [peopleInDaRoom, setPeopleInDaRoom] = useState<any>([]);
  const listenForRoomUpdates = async (room) => {
    room.on('participantConnected', participantConnected);
    room.on('participantDisconnected', participantDisconnected);
    room.once('disconnected', error => room.participants.forEach(participantDisconnected));
    window.onbeforeunload = () => room.disconnect();
  }

  useEffect(() => {

  }, [peopleInDaRoom])
  function participantConnected(participant: RemoteParticipant) {
    const localMediaContainer = document.querySelector('#currentUserVideo') as HTMLDivElement;
    console.log('Participant "%s" connected', participant.identity);

    const div = document.createElement("VideoFrame");
    div.id = participant.sid;
    //div.innerText = participant.identity;
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
    if (localMediaContainer) {
      localMediaContainer.appendChild(div);
    }
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


  async function participantDisconnected(participant: RemoteParticipant) {
    console.log('Participant "%s" disconnected', participant.identity);
    const divToRemove = document.getElementById(participant.sid);
    await divToRemove?.remove()
    participant.tracks.forEach(track => trackUnsubscribed(track));

    return null
  }

  function trackSubscribed(div, track) {
    div.appendChild(track.attach());
  }

  function trackUnsubscribed(track) {
    console.log('track', track)
    track.detach().forEach(element => element.remove());
  }
  const leaveVideoChat = async () => {
    // await participantDisconnected(activeRoom.localParticipant);
    // await activeRoom.participants.forEach(participant => participantDisconnected(participant));
    await activeRoom.disconnect();
    // activeRoom.on('participantDisconnected', participantDisconnected);
    // activeRoom.once('disconnected', error => activeRoom.participants.forEach(participantDisconnected));

    setConnectButton(false)
    setVideoToggle(false)


  }

  //onClick={handleLogout}
  return (
    <div className="room">
      <VideoContainer id="currentUserVideo">



      </VideoContainer>
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        {!connectButton ?
          <Button variant="outlined" onClick={() => { connectToRoom(); setConnectButton(true); getToken(); }} >connect</Button>//
          :
          null
        }
        {connectButton ? <Button variant="outlined" onClick={() => leaveVideoChat()}>Log out</Button>
          : null
        }

      </Box>

    </div>
  );

};

export default VideoChat;