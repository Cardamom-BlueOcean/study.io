import * as React from "react";
import ReplyList from './replies/ReplyList';
import { useState } from 'react';
import { Box, Stack, Tooltip, Avatar, Button } from '@mui/material';
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
  // message.Documentid
  // console.log('message thread:', message.MessageThread);
  return (
    <Tooltip title="Reply" placement="bottom-start" key={index} >
      {!showReply
        ? <Box sx={{ display: 'grid', gridTemplateColumns: '5% 95%', borderBottom: 1, borderColor: "divider" }}>
          <Avatar sx={{ width: 32, height: 32, alignSelf: 'center', justifySelf: 'center' }} src={message.Avatar} imgProps={{ referrerPolicy: 'noReferrer' }}></Avatar>
          <Stack>
            <Box>{message.Name}</Box>
            <Box>{message.Message}</Box>
            {message.MessageThread.length > 0 ?
              <Button onClick={handleReplyClick} style={{ maxHeight: '15px', maxWidth: '100px', fontSize: '8px' }}>Show {message.MessageThread.length} Replies</Button>
              : <Button onClick={handleReplyClick} style={{ maxHeight: '15px', maxWidth: '100px', fontSize: '8px' }}>Reply</Button>}
            {/* <Item>{date}</Item> */}
          </Stack>
        </Box>
        : <Box sx={{ display: 'grid', gridTemplateColumns: '5% 95%', borderBottom: 1, borderColor: "divider" }}>
          <Avatar sx={{ width: 32, height: 32, alignSelf: 'center', justifySelf: 'center' }} src={message.Avatar} imgProps={{ referrerPolicy: 'noReferrer' }}></Avatar>
          <Stack>
            <Box>{message.Name}</Box>
            <Box>{message.Message}</Box>
            <br></br>

            <ReplyList replyToThread={replyToThread} messageThread={message.MessageThread} documentId={message.Documentid} setShowReply={setShowReply} />
            {/* <Item>{date}</Item> */}
          </Stack>
        </Box>}

    </Tooltip>
  )
}