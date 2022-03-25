import * as React from 'react';
import { Box, Modal } from '@mui/material';

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  boxShadow: 24,
};

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
        <Box sx={style}>
          <img style={{ objectFit: 'contain' }} src={url} height="480" width="360"></img>
        </Box>
      </Modal>
    </Box >
  );
}