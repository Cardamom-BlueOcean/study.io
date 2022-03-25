import React, { useState, useEffect } from 'react';
import {
  connect,
  createLocalVideoTrack,
  RemoteAudioTrack,
  RemoteParticipant,
  RemoteTrack,
  RemoteVideoTrack,
  Room
} from 'twilio-video';

// type Nullable<T> = T | null;

const VideoChat = ({currentRoom, currentUserName, setVideoToggle}) => {
  const [token, setToken] = useState('');
  const [currentUserVideo, setCurrentUserVideo] = useState<any>(null);


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

  const [room, setRoom] = useState(null);
  const [participants, setParticipants] = useState([]);

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
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: JSON.stringify(data) // body data type must match "Content-Type" header
    });
    const roomToken = await response.json(); // parses JSON response into native JavaScript objects
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

    const div = document.createElement('div');
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
      {/* <div className="local-participant">
        {room ? (
          <p key={room.localParticipant.sid}>{room.localParticipant.identity}</p>
        ) : (
          ''
        )}
      </div>
      <h3>Remote Participants</h3>
      <div className="remote-participants">{remoteParticipants}</div> */}
      <div id="currentUserVideo"></div>
      {/* {divList.map((div) => {
        return div
})} */}
    </div>
  );

};

export default VideoChat;