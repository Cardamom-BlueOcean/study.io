import * as React from 'react';
import { Box, Modal } from '@mui/material';

export default function PhotoModal({ url }) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <Box>
      <img style={{ objectFit: 'contain' }} src={url} height="240" width="180" onClick={handleOpen}></img>
      <Modal
        open={open}
        onClose={handleClose}
        disableAutoFocus={true}
      >
        <img style={{
          objectFit: 'contain',
          position: 'absolute' as 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          boxShadow: '24',
        }} src={url} height="720" width="540"></img>
      </Modal>
    </Box >
  );
}