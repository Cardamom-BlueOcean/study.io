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
  position: absolute;
  right: 18%;


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
    $('#replyEntry').val("");
  }

  const handleReplyInput = (replyBody) => {
    setReplyInput(replyBody);
  };

  $("#replyEntry").unbind().keyup(function (event) {
    if (event.keyCode === 13) {

      //$("#sendMessageButton").click();
      sendMessageToReplyThread()
      $('#replyEntry').val("");
      console.log('WOO');
    }
  });

  return (
    <Box>
      {messageThread?.map((reply, key) => (
        <Box key={key}>
          <Reply reply={reply} key={key} />
        </Box>
      ))}
      <TextField sx={{ width: '50%', height: '10%' }} id='replyEntry' label='Enter Reply' variant='outlined' margin="none" size="small" onChange={(e: React.ChangeEvent<HTMLInputElement>): void =>
        handleReplyInput(e.target.value)
      } />
      <Button sx={{ width: '40px' }} onClick={sendMessageToReplyThread}><SendIcon /></Button>
      <br></br>
      <Button onClick={handleHideReplies} style={{ maxHeight: '15px', maxWidth: '100px', fontSize: '8px', position: 'absolute', right: '18%' }}>Hide Replies</Button>

    </Box>
  )

}

export default ReplyList;