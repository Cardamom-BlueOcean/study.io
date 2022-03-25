import * as React from 'react';
import { Box, Stack, Avatar, Button, TextField } from '@mui/material';
import Reply from './Reply';
import styled from 'styled-components';
import { useAppSelector } from '../../hooks';
import { Send as SendIcon } from "@mui/icons-material";

import $ from "jquery";

const ReplyDiv = styled.div`
  color: blue;
  font-size: 8px;
  text-decoration: underline;
`;

const ReplyList = ({ replyToThread, setShowReply, messageThread, documentId }) => {
  // console.log('this is in reply list', messageThread)
  const [replyInput, setReplyInput] = React.useState<string>("");

  const userName = useAppSelector((state) => state.userName.value)

  const handleHideReplies = () => {
    setShowReply(false);
  }

  const sendMessageToReplyThread = () => {

    replyToThread(documentId, { userName, message: replyInput })

  }

  const handleReplyInput = (replyBody) => {
    setReplyInput(replyBody);
  };

  $("#replyEntry").unbind().keyup(function (event) {
    if (event.keyCode === 13) {
      //$("#sendMessageButton").click();
      sendMessageToReplyThread()
    }
  });

  return (
    <Box sx={{
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'flex-start'
    }}>
      {messageThread?.map((reply, key) => (
        <Box key={key}>
          <Reply reply={reply} key={key} />
        </Box>
      ))}
      <Box sx={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start'
      }}>
        <TextField id='replyEntry' label='Enter Reply' variant='outlined' size="small" onChange={(e: React.ChangeEvent<HTMLInputElement>): void =>
          handleReplyInput(e.target.value)
        } />
        <Button sx={{ width: '40px' }} onClick={sendMessageToReplyThread}>
          <SendIcon />
        </Button>
      </Box>
      <Box sx={{
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start'
      }}>
        <Button onClick={handleHideReplies} style={{ maxHeight: '15px', maxWidth: '100px', fontSize: '8px' }}>
          Hide Replies
        </Button>
      </Box>

    </Box>
  )

}

export default ReplyList;