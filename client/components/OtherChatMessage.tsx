import * as React from "react";
import ReplyList from './replies/ReplyList';
import { useState } from 'react';
import { Box, Stack, Avatar, Button, Chip } from '@mui/material';
import styled from 'styled-components';
import PhotoModal from "./PhotoModal";

const ReplyDiv = styled.div`
  color: blue;
  font-size: 8px;
  text-decoration: underline;
`;

export default function OtherChatMessage({ replyToThread, message, index }) {

  const [showReply, setShowReply] = useState(false);

  const handleReplyClick = () => {
    setShowReply(true);
  }

  let chatDate;
  let chatTime;
  let suffix;

  if (message.TimeStamp !== null) {
    chatDate = message.TimeStamp.toDate().toDateString();
    chatDate = chatDate.substring(0, chatDate.length - 4);
    chatTime = message.TimeStamp.toDate().toLocaleTimeString();
  }

  return (
    <Box>
      {!showReply
        ? <Box sx={{ display: 'flex', gridTemplateColumns: '5% 95%', border: "1px solid #e3dcd5", width: '60%', overflowX: 'wrap', padding: '8px', marginBottom: '5px', borderRadius: '4px' }}>
          <Avatar sx={{ width: 40, height: 40, alignSelf: 'top', justifySelf: 'center' }} src={message.Avatar} imgProps={{ referrerPolicy: 'no-referrer' }}></Avatar>
          <Stack >
            <Box sx={{ fontWeight: 300, marginLeft: '8px' }}>{message.Name}</Box>
            <Box sx={{ fontSize: '10px', fontWeight: 200, marginLeft: '8px' }}>{`${chatDate} at ${chatTime}`}</Box>
            <Box sx={{ margin: '4px 8px' }} >{message.Message}</Box>
            {message.MessageMediaContent.length > 0 ?
              <PhotoModal url={message.MessageMediaContent} /> : null}
            {message.MessageThread.length > 0 ?
              <Box sx={{ display: 'flex', alignSelf: 'start' }}><Button onClick={handleReplyClick} style={{ maxHeight: '15px', maxWidth: '100px', fontSize: '8px' }}>Show {message.MessageThread.length} Replies</Button></Box>
              : <Box sx={{ display: 'flex', alignSelf: 'start' }}><Button onClick={handleReplyClick} style={{ maxHeight: '15px', maxWidth: '100px', fontSize: '8px', justifyContent: 'start' }}>Reply</Button></Box>}
          </Stack>
        </Box >
        : <Box sx={{ display: 'flex', gridTemplateColumns: '5% 95%', border: "1px solid #e3dcd5", width: '60%', overflowX: 'wrap', padding: '8px', marginBottom: '5px', borderRadius: '4px' }}>
          <Avatar sx={{ width: 40, height: 40, alignSelf: 'top', justifySelf: 'center' }} src={message.Avatar} imgProps={{ referrerPolicy: "no-referrer" }}></Avatar>
          <Stack>
            <Box sx={{ fontWeight: 300, marginLeft: '8px' }}>{message.Name}</Box>
            <Box sx={{ fontSize: '10px', fontWeight: 200, marginLeft: '8px' }}>{`${chatDate} at ${chatTime}`}</Box>
            <Box sx={{ margin: '4px 8px' }}>{message.Message}</Box>
            {message.MessageMediaContent.length > 0 ?
              <PhotoModal url={message.MessageMediaContent} /> : null}
            <br></br>

            <ReplyList replyToThread={replyToThread} messageThread={message.MessageThread} documentId={message.Documentid} setShowReply={setShowReply} />
          </Stack>
        </Box>
      }
    </Box >
  )
}