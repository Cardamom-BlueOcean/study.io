import * as React from "react";
import { Box, Stack, Tooltip, Avatar, } from '@mui/material';

export default function UserChatMessage({ message, index }) {

  return (
    <Tooltip title="Reply" placement="bottom-end" key={index}>
      <Box sx={{ display: 'grid', gridTemplateColumns: '95% 5%', bgcolor: '#D3D3D3', borderBottom: 1, borderColor: "divider" }}>
        <Stack>
          <Box sx={{ textAlign: 'right' }}>{message.Name}</Box>
          <Box sx={{ textAlign: 'right' }}>{message.Message}</Box>
          {/* <Item2>{date}</Item2> */}
        </Stack>
        <Avatar sx={{ width: 32, height: 32, alignSelf: 'center', justifySelf: 'center' }} src={message.Avatar} imgProps={{ referrerPolicy: 'noReferrer' }}></Avatar>
      </Box>
    </Tooltip>
  )
}