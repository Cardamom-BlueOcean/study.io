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

  function signOutUser() {
    signOut(auth).then(() => {
      alert('Sign-out successful.')
      navigate(`/`)
    }).catch((error) => {
      alert('error trying to sign out')
    })
  }

  return (

    <Box sx={{
      width: '100%',
      maxWidth: 200,
      bgcolor: 'background.paper',
      flexDirection: 'column'
    }}>
      <Button variant="contained" onClick={() => signOutUser()}>Sign Out</Button>
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