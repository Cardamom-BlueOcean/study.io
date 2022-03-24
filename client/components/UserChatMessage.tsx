import * as React from "react";
import ReplyList from './replies/ReplyList';
import { useState } from 'react';
import { Box, Stack, Tooltip, Avatar, Button } from '@mui/material';

export default function UserChatMessage({ replyToThread, message, index }) {

  const [showReply, setShowReply] = useState(false);

  const handleReplyClick = () => {
    setShowReply(true);
  }

  return (
    <Tooltip title="Reply" placement="bottom-end" key={index}>
      {!showReply
        ? <Box sx={{ display: 'grid', gridTemplateColumns: '95% 5%', bgcolor: '#fffcf7', borderBottom: 1, borderColor: "divider" }}>
          <Stack>
            <Box sx={{ textAlign: 'right' }}>{message.Name}</Box>
            <Box sx={{ textAlign: 'right' }}>{message.Message}</Box>
            {message.MessageThread.length > 0 ?
              <Button onClick={handleReplyClick} style={{ maxHeight: '15px', maxWidth: '100px', fontSize: '8px' }}>Show {message.MessageThread.length} Replies</Button>
              : <Button onClick={handleReplyClick} style={{ maxHeight: '15px', maxWidth: '100px', fontSize: '8px' }}>Reply</Button>}
            {/* <Item2>{date}</Item2> */}
          </Stack>
          <Avatar sx={{ width: 32, height: 32, alignSelf: 'center', justifySelf: 'center' }} src={message.Avatar} imgProps={{ referrerPolicy: 'noReferrer' }}></Avatar>
        </Box>
        : <Box sx={{ display: 'grid', gridTemplateColumns: '95% 5%', bgcolor: '#fffcf7', borderBottom: 1, borderColor: "divider" }}>
          <Stack>
            <Box sx={{ textAlign: 'right' }}>{message.Name}</Box>
            <Box sx={{ textAlign: 'right' }}>{message.Message}</Box>
            <ReplyList replyToThread={replyToThread} messageThread={message.MessageThread} documentId={message.Documentid} setShowReply={setShowReply} />
            {/* <Item2>{date}</Item2> */}
          </Stack>
          <Avatar sx={{ width: 32, height: 32, alignSelf: 'center', justifySelf: 'center' }} src={message.Avatar} imgProps={{ referrerPolicy: 'noReferrer' }}></Avatar>
        </Box>
      }

    </Tooltip>
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