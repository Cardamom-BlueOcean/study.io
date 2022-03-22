import * as React from 'react';
import { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import Button from '@mui/material/Button';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import TextField from '@mui/material/TextField';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import InboxIcon from '@mui/icons-material/Inbox';
import DraftsIcon from '@mui/icons-material/Drafts';
import { fakeData } from './fakeGroupData';
import { useAppSelector, useAppDispatch } from '../hooks'
import { getAuth, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import GoogleIcon from '@mui/icons-material/Google';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import MenuItem from '@mui/material/MenuItem';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import PersonAdd from '@mui/icons-material/PersonAdd';
import Logout from '@mui/icons-material/Logout';
import Settings from '@mui/icons-material/Settings';

export default function GroupList() {
  const [groups, setGroups] = React.useState(fakeData);
  // const [newGroupName, setNewGroup] = useState('');
  const [textFieldTemp, setTextFieldTemp] = useState('');

  const setNewGroup = useAppSelector((state) => state.globalFunctions.value.createRoom);
  const userRooms = useAppSelector((state) => state.userRooms.value)

  //console.log(`list of rooms: ${userRooms}`)

  function addRoom() {
    setNewGroup(textFieldTemp)
  }

  const setTextField = function (e) {
    console.log(e.target.value)
    setTextFieldTemp(e.target.value)
  }

  let navigate = useNavigate();
  const auth = getAuth()
  console.log('auth.currentUser is', auth.currentUser)

  function signOutUser() {
    signOut(auth).then(() => {
      alert('Sign-out successful.')
      navigate(`/`)
    }).catch((error) => {
      alert('error trying to sign out')
    })
  }

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (

    <Box sx={{
      width: '100%',
      maxWidth: 200,
      bgcolor: 'background.paper',
      flexDirection: 'column'
    }}>
      <Tooltip title="Account settings">
        <IconButton
          onClick={handleClick}
          size="small"
          sx={{ ml: 2 }}
          aria-controls={open ? 'account-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}
        >
          <Avatar sx={{ width: 32, height: 32 }} src={auth.currentUser?.photoURL}></Avatar>
        </IconButton>
      </Tooltip>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            '&:before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              left: 14,
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: 'left', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'left', vertical: 'bottom' }}
      >
        <MenuItem>
          <Avatar src={auth.currentUser?.photoURL} /> {auth.currentUser?.displayName}
        </MenuItem>
        <Divider />
        <MenuItem>
          <ListItemIcon>
            <Settings fontSize="small" />
          </ListItemIcon>
          Settings
        </MenuItem>
        <MenuItem onClick={() => signOutUser()}>
          <ListItemIcon >
            <Logout fontSize="small" />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
      <List>
        {userRooms.map((group, i) => (
          < ListItem disablePadding key={i} value={group} onClick={() => console.log('you just clicked on', group)}>
            <ListItemButton>

              <ListItemText primary={group} secondary="study group" />

            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      <Button variant="contained" sx={{ marginTop: '10px', marginBottom: '10px' }} onClick={addRoom}>Add Group</Button>
      <TextField id="outlined-basic" label="group name" variant="outlined" onChange={setTextField} />
    </Box >
  );
}