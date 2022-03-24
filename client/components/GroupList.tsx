import * as React from 'react';
import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import {
  getFirestore,
  collection,
  query,
  where,
  onSnapshot,
  doc,
  setDoc,
  orderBy
} from "firebase/firestore";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { useAppSelector, useAppDispatch } from '../hooks'

import {
  Drafts as DraftsIcon,
  Inbox as InboxIcon,
  Google as GoogleIcon,
  ExpandMore as ExpandMoreIcon,
  AccountCircle as AccountCircleIcon,
  Add as AddIcon,
  Logout,
  PersonAdd,
  Settings,
} from "@mui/icons-material";

import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  List,
  Button,
  ListItem,
  ListItemButton,
  TextField,
  ListItemIcon,
  ListItemText,
  Divider,
  Switch,
  Avatar,
  Menu,
  FormControlLabel,
  MenuItem,
  Tooltip,
  IconButton,
  Box,
  Paper,
  ThemeProvider,
  Typography,
} from "@mui/material";

import { fakeData } from './fakeGroupData';

export default function GroupList({ setCurrentRoom, currentRoom, setUserChats, toggleDark, settoggleDark, currentMode }) {

  const db = getFirestore();
  const auth: any = getAuth();
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
    // console.log(e.target.value)
    setTextFieldTemp(e.target.value)
  }


  React.useEffect(() => {
    //console.log('here')
    onAuthStateChanged(auth, (user: any) => {
      const subsribeToUpdatesForARoom = async (currentRoom) => {
        //The function can be called to subscribe to a room in
        if (user) {

          const q = query(
            collection(db, "Rooms", currentRoom, "Chats")
            , orderBy("TimeStamp")
          ); //
          const unsubscribe = onSnapshot(q, (querySnapshot) => {
            const chats: any = [];
            querySnapshot.forEach((doc) => {
              let temp = doc.data();
              temp['Documentid'] = doc.id;
              // console.log(temp);

              chats.push(temp);
            });
            setUserChats(chats)
          });
        }
      };
      subsribeToUpdatesForARoom(currentRoom)
    })

  }, [currentRoom])
  let navigate = useNavigate();
  // const auth = getAuth()
  //console.log('auth.currentUser is', auth.currentUser)

  function signOutUser() {
    signOut(auth).then(() => {
      alert('Sign-out successful.')
      navigate(`/`)
    }).catch((error) => {
      alert('error trying to sign out')
    })
  }

  const [anchorEl, setAnchorEl] = React.useState(null);
  const openMenu = Boolean(anchorEl);
  const handleUserMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleUsernameClick = (event) => {
    console.log('you just clicked to change the user name', event)
  }

  const handleSettingsClick = (event) => {
    console.log('you just clicked to set the settings', event)
  }

  const handleThemeClick = (event) => {
    console.log('you just clicked to change the theme', event)
  }

  const handleModeChange = () => {
    console.log('in handleModeChange...')
    settoggleDark(!toggleDark);
    console.log(toggleDark)
  };

  //console.log(`theme is ${theme}`)

  const fakeDMList = ['DM with Richard', 'DM with John', 'DM with Peanut']

  return (
    <Box sx={{
      width: '100%',
      //      bgColor: 'background.paper',
      flexDirection: 'column'
    }}>
      <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', flexWrap: 'nowrap', justifyContent: 'flex-start' }} >
        <Tooltip title="Account settings">
          <IconButton
            onClick={handleUserMenuClick}
          //   size="small"
          //   sx={{ ml: 2 }}
          //   aria-controls={open ? 'account-menu' : undefined}
          //   aria-haspopup="true"
          //   aria-expanded={open ? 'true' : undefined}
          >
            <Avatar sx={{ width: 32, height: 32 }} src={auth.currentUser?.photoURL} imgProps={{ referrerPolicy: 'noReferrer' }} ></Avatar>
          </IconButton>
        </Tooltip>
        <Menu
          anchorEl={anchorEl}
          id="account-menu"
          open={openMenu}
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
            },
          }}
          transformOrigin={{ horizontal: 'left', vertical: 'top' }}
          anchorOrigin={{ horizontal: 'left', vertical: 'bottom' }}
        >
          <MenuItem>
            <Avatar src={auth.currentUser?.photoURL} /> {auth.currentUser?.displayName}
          </MenuItem>
          <MenuItem>
            <ListItemIcon>
              <PersonAdd fontSize="small" />
            </ListItemIcon>
            Switch Accounts
          </MenuItem>
          <MenuItem onClick={handleUsernameClick}>
            <ListItemIcon>
              <AccountCircleIcon fontSize="small" />
            </ListItemIcon>
            Change User Name
          </MenuItem>
          <Divider />
          <MenuItem>
            <FormControlLabel control={<Switch checked={toggleDark} onChange={handleModeChange} />} label={currentMode + ' mode'} />
          </MenuItem>
          <MenuItem onClick={() => signOutUser()}>
            <ListItemIcon >
              <Logout fontSize="small" />
            </ListItemIcon>
            Logout
          </MenuItem>
        </Menu>
        <Typography onClick={handleUserMenuClick} sx={{ cursor: 'pointer', color: 'text.secondary' }}>
          {auth.currentUser?.displayName}
        </Typography>
      </Box >
      <Divider />
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />} >
          <Typography>Direct Messages</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>Coming Soon!</Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />} >
          <Typography>Group Chats</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Box sx={{ overflowY: 'scroll', maxHeight: '400px' }}>
            <List>
              {userRooms.map((group, i) => (
                < ListItem disablePadding key={i} value={group} onClick={() => setCurrentRoom(group)}>
                  <ListItemButton>

                    <ListItemText primary={group} />

                  </ListItemButton>
                </ListItem>
              ))}
            </List>
          </Box>
        </AccordionDetails>
      </Accordion>
      <Divider />
      <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', flexWrap: 'nowrap', justifyContent: 'flex-start' }}>
        <TextField size="small" id="outlined-basic" label="group name" onChange={setTextField} />
        <Button variant="contained" sx={{ marginTop: '10px', marginBottom: '10px' }} onClick={addRoom}><AddIcon /></Button>
      </Box>
      <Divider />
    </Box >
  );
}