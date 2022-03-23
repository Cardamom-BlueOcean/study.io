import * as React from "react";
import { Box, Stack, Tooltip, Avatar, } from '@mui/material';

export default function OtherChatMessage({ message, index }) {

  return (
    <Tooltip title="Reply" placement="bottom-start" key={index}>
      <Box sx={{ display: 'grid', gridTemplateColumns: '5% 95%', borderBottom: 1, borderColor: "divider" }}>
        <Avatar sx={{ width: 32, height: 32, alignSelf: 'center', justifySelf: 'center' }} src={message.Avatar} imgProps={{ referrerPolicy: 'noReferrer' }}></Avatar>
        <Stack>
          <Box>{message.Name}</Box>
          <Box>{message.Message}</Box>
          {/* <Item>{date}</Item> */}
        </Stack>
      </Box>
    </Tooltip>
  )
}