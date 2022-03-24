import * as React from 'react';
import { Box, Stack, Avatar } from '@mui/material';


const Reply = ({ reply }) => {
  // console.log('this is in reply', reply);

  return (

    <div>
      {reply.userName}: {reply.message}
    </div>
  )

}

export default Reply;