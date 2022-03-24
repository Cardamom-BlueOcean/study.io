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

type Nullable<T> = T | null;

const VideoChat = () => {
  const [token, setToken] = useState('');

/**
 * Entry point.
 */
//  const localMediaContainer = document.querySelector('#local-media-container') as HTMLDivElement;

// async function main() {
//     // Provides a camera preview window.
//     const localVideoTrack = await createLocalVideoTrack({ width: 640 });
//     console.log('localVideoTrack',localVideoTrack )
//     //localMediaContainer.appendChild(localVideoTrack.attach());
// }

  const [room, setRoom] = useState(null);
  const [participants, setParticipants] = useState<any>([]);

  // const remoteParticipants = participants.map(participant => (
  //   <p key={participant.sid}>{participant.identity}</p>
  // ));

  // useEffect(() => {
  //   const participantConnected = participant => {
  //     setParticipants(prevParticipants => [...prevParticipants, participant]);
  //   };
  //   const participantDisconnected = participant => {
  //     setParticipants(prevParticipants =>
  //       prevParticipants.filter(p => p !== participant)
  //     );
  //   };
  //   Video.connect(token, {
  //     name: roomName
  //   }).then(room => {
  //     setRoom(room);
  //     room.on('participantConnected', participantConnected);
  //     room.on('participantDisconnected', participantDisconnected);
  //     room.participants.forEach(participantConnected);
  //   });
  // });

  const connectToRoom = async () => {


    // main()
    // const data = {
    //   room: 'mathRoom',
    //   userName: 'Alex',
    // }
    // const response = await fetch('/token', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json'
    //     // 'Content-Type': 'application/x-www-form-urlencoded',
    //   },
    //   body: JSON.stringify(data) // body data type must match "Content-Type" header
    // });
    // const roomToken =  await response.json(); // parses JSON response into native JavaScript objects
    // await setToken(roomToken);
    // Video.connect(token, { name:'mathRoom' })
    //   .then(room => {//, audio: true, video: {width: 640}
    //   console.log(`Successfully joined a Room: ${room}`);
    //   // room.on('participantConnected', participant => {
    //   //   console.log(`A remote Participant connected: ${participant}`);
    //   // });
    // },
    // // error => {
    // //   console.error(`Unable to connect to Room: ${error.message}`);
    // // });
    // )
  }



  useEffect(() => {
    const participantConnected:any = (participant: any) => {
      setParticipants((prevParticipants: any[]) =>{ [...prevParticipants, participant]});
    };
    const participantDisconnected = participant => {
      setParticipants(prevParticipants =>
        prevParticipants.filter(p => p !== participant)
      );
    };
    connect(token, {
      name: 'math'
    }).then((room: any) => {
      setRoom(room);
      room.on('participantConnected', participantConnected);
      room.on('participantDisconnected', participantDisconnected);
      room.participants.forEach(participantConnected);
    });
  });


  //onClick={handleLogout}
  // return (
  //   // <div className="room">
  //   //   <h2>Room: testroom</h2>
  //   //   <button onClick={connectToRoom}>connectToRoom</button>
  //   //   <button >Log out</button>
  //   //   {/* <div className="local-participant">
  //   //     {room ? (
  //   //       <p key={room.localParticipant.sid}>{room.localParticipant.identity}</p>
  //   //     ) : (
  //   //       ''
  //   //     )}
  //   //   </div>
  //   //   <h3>Remote Participants</h3>
  //   //   <div className="remote-participants">{remoteParticipants}</div> */}
  //   // </div>
  // );

};

export default VideoChat;