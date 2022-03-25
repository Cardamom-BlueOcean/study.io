import * as React from "react";
import ReplyList from './replies/ReplyList';
import { useState } from 'react';
import { Box, Stack, Avatar, Button } from '@mui/material';
import styled from 'styled-components';

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

  if (message.TimeStamp !== null) {
    chatDate = message.TimeStamp.toDate().toDateString();
    chatDate = chatDate.substring(0, chatDate.length - 4);
    chatTime = message.TimeStamp.toDate().toLocaleTimeString();
  }

  return (
    <Box>
      {!showReply
        ? <Box sx={{ display: 'grid', gridTemplateColumns: '5% 95%', borderBottom: 1, borderColor: "divider" }}>
          <Avatar sx={{ width: 32, height: 32, alignSelf: 'center', justifySelf: 'center' }} src={message.Avatar} imgProps={{ referrerPolicy: 'noReferrer' }}></Avatar>
          <Stack>
            <Box>{message.Name}</Box>
            <Box>{message.Message}</Box>
            <Box>{`${chatDate} at ${chatTime}`}</Box>
            {message.MessageMediaContent.length > 0 ?
              <img src={message.MessageMediaContent} height="240" width="180"></img> : null}
            {message.MessageThread.length > 0 ?
              <Button onClick={handleReplyClick} style={{ maxHeight: '15px', maxWidth: '100px', fontSize: '8px' }}>Show {message.MessageThread.length} Replies</Button>
              : <Button onClick={handleReplyClick} style={{ maxHeight: '15px', maxWidth: '100px', fontSize: '8px' }}>Reply</Button>}
          </Stack>
        </Box>
        : <Box sx={{ display: 'grid', gridTemplateColumns: '5% 95%', borderBottom: 1, borderColor: "divider" }}>
          <Avatar sx={{ width: 32, height: 32, alignSelf: 'center', justifySelf: 'center' }} src={message.Avatar} imgProps={{ referrerPolicy: 'noReferrer' }}></Avatar>
          <Stack>
            <Box>{message.Name}</Box>
            <Box>{message.Message}</Box>
            <Box>{`${chatDate} at ${chatTime}`}</Box>
            {message.MessageMediaContent.length > 0 ?
              <img src={message.MessageMediaContent} height="240" width="180"></img> : null}
            <br></br>

            <ReplyList replyToThread={replyToThread} messageThread={message.MessageThread} documentId={message.Documentid} setShowReply={setShowReply} />
          </Stack>
        </Box>}
    </Box>
  )
}