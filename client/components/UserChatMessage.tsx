import * as React from "react";
import ReplyList from './replies/ReplyList';
import { useState } from 'react';
import { Box, Stack, Avatar, Button } from '@mui/material';
import PhotoModal from './PhotoModal';

export default function UserChatMessage({ replyToThread, message, index }) {

  const [showReply, setShowReply] = useState(false);

  const handleReplyClick = () => {
    setShowReply(true);
  }

  let chatDate;
  let chatTime;

  if (message.TimeStamp !== null) {
    chatDate = message.TimeStamp.toDate().toDateString();
    chatDate = chatDate.substring(0, chatDate.length - 4);
    chatTime = message.TimeStamp.toDate().toLocaleTimeString();
  }

  return (
    <Box>
      {!showReply
        ? <Box sx={{ display: 'grid', gridTemplateColumns: '95% 5%', bgcolor: '#fffcf7', borderBottom: 1, borderColor: "divider" }}>
          <Stack>
            <Box sx={{ textAlign: 'right' }}>{message.Name}</Box>
            <Box sx={{ textAlign: 'right' }}>{message.Message}</Box>
            <Box sx={{ textAlign: 'right' }}>{`${chatDate} at ${chatTime}`}</Box>
            {message.MessageMediaContent.length > 0 ?
              <PhotoModal url={message.MessageMediaContent} /> : null}
            {message.MessageThread.length > 0 ?
              <Button onClick={handleReplyClick} style={{ maxHeight: '15px', maxWidth: '100px', fontSize: '8px' }}>Show {message.MessageThread.length} Replies</Button>
              : <Button onClick={handleReplyClick} style={{ maxHeight: '15px', maxWidth: '100px', fontSize: '8px' }}>Reply</Button>}
          </Stack>
          <Avatar sx={{ width: 32, height: 32, alignSelf: 'center', justifySelf: 'center' }} src={message.Avatar} imgProps={{ referrerPolicy: 'noReferrer' }}></Avatar>
        </Box>
        : <Box sx={{ display: 'grid', gridTemplateColumns: '95% 5%', bgcolor: '#fffcf7', borderBottom: 1, borderColor: "divider" }}>
          <Stack>
            <Box sx={{ textAlign: 'right' }}>{message.Name}</Box>
            <Box sx={{ textAlign: 'right' }}>{message.Message}</Box>
            <Box sx={{ textAlign: 'right' }}>{`${chatDate} at ${chatTime}`}</Box>
            {message.MessageMediaContent.length > 0 ?
              <PhotoModal url={message.MessageMediaContent} /> : null}
            <ReplyList replyToThread={replyToThread} messageThread={message.MessageThread} documentId={message.Documentid} setShowReply={setShowReply} />
          </Stack>
          <Avatar sx={{ width: 32, height: 32, alignSelf: 'center', justifySelf: 'center' }} src={message.Avatar} imgProps={{ referrerPolicy: 'noReferrer' }}></Avatar>
        </Box>
      }
    </Box>
  )
}






// <Box sx={{ display: 'grid', gridTemplateColumns: '95% 5%', bgcolor: '#D3D3D3', borderBottom: 1, borderColor: "divider" }}>
// <Stack>
//   <Box sx={{ textAlign: 'right' }}>{message.Name}</Box>
//   <Box sx={{ textAlign: 'right' }}>{message.Message}</Box>
//   {/* <Item2>{date}</Item2> */}
// </Stack>
// <Avatar sx={{ width: 32, height: 32, alignSelf: 'center', justifySelf: 'center' }} src={message.Avatar} imgProps={{ referrerPolicy: 'noReferrer' }}></Avatar>
// </Box>