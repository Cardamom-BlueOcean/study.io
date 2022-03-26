import * as React from "react";
import ReplyList from './replies/ReplyList';
import { useState } from 'react';
import { Box, Stack, Avatar, Button, Chip } from '@mui/material';
import PhotoModal from './PhotoModal';
import ReplyIcon from '@mui/icons-material/Reply';
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
    <Box sx={{ display: 'flex', justifyContent: 'end' }}>
      {!showReply
        ? <Box sx={{ display: 'flex', justifyContent: 'flex-end', gridTemplateColumns: '5% 95%', border: "1px solid #ebc7cb", width: '60%', overflowX: 'wrap', padding: '8px', marginBottom: '5px', borderRadius: '4px' }}>
          <Stack>
            <Box sx={{ textAlign: 'right', fontWeight: 300, marginRight: '8px' }}>{message.Name}</Box>
            <Box sx={{ textAlign: 'right', fontSize: '10px', fontWeight: 200, marginRight: '8px' }}>{`${chatDate} at ${chatTime}`}</Box>
            <Box sx={{ textAlign: 'right', marginRight: '8px' }}>{message.Message}</Box>
            {message.MessageMediaContent.length > 0 ?
              <PhotoModal url={message.MessageMediaContent} /> : null}
            {message.MessageThread.length > 0 ?
              <Box sx={{ display: 'flex', alignSelf: 'end' }}><Button onClick={handleReplyClick} style={{ maxHeight: '15px', maxWidth: '100px', fontSize: '8px', justifyContent: 'end' }}>Show {message.MessageThread.length} Replies</Button></Box>
              : <Box sx={{ display: 'flex', alignSelf: 'end' }}><Button onClick={handleReplyClick} style={{ maxHeight: '15px', maxWidth: '100px', fontSize: '8px', justifyContent: 'end' }}>Reply<ReplyIcon size="small" /></Button></Box>}
          </Stack>
          <Avatar sx={{ width: 40, height: 40, alignSelf: 'top', justifySelf: 'center' }} src={message.Avatar} imgProps={{ referrerPolicy: 'no-referrer' }}></Avatar>
        </Box>
        : <Box sx={{ display: 'flex', justifyContent: 'flex-end', gridTemplateColumns: '5% 95%', border: "1px solid #ebc7cb", width: '60%', overflowX: 'wrap', padding: '8px', marginBottom: '5px', borderRadius: '4px' }}>
          <Stack>
            <Box sx={{ textAlign: 'right', fontWeight: 300 }}>{message.Name}</Box>
            <Box sx={{ textAlign: 'right', fontSize: '10px', fontWeight: 200, }}>{`${chatDate} at ${chatTime}`}</Box>
            <Box sx={{ textAlign: 'right' }}>{message.Message}</Box>
            {message.MessageMediaContent.length > 0 ?
              <PhotoModal url={message.MessageMediaContent} /> : null}
            <ReplyList replyToThread={replyToThread} messageThread={message.MessageThread} documentId={message.Documentid} setShowReply={setShowReply} />
          </Stack>
          <Avatar sx={{ width: 40, height: 40, alignSelf: 'top', justifySelf: 'center' }} src={message.Avatar} imgProps={{ referrerPolicy: 'no-referrer' }}></Avatar>
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