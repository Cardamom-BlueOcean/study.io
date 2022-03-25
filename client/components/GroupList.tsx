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
  StayPrimaryLandscape,
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
  PaletteMode,
  Autocomplete,
} from "@mui/material";

import { fakeData } from './fakeGroupData';
import { te } from 'date-fns/locale';
import $ from "jquery";

export default function GroupList({ setCurrentRoom, currentRoom, setUserChats, setShowCalendar, toggleDark, settoggleDark, currentMode, mode, setMode, setLogoImg, logoImg }) {

  const db = getFirestore();
  const auth: any = getAuth();
  const [groups, setGroups] = React.useState(fakeData);
  // const [newGroupName, setNewGroup] = useState('');
  const [textFieldTemp, setTextFieldTemp] = useState('');
  const [DMTextField, setDMTextField] = useState('');
  const [addChatToggle, setAddChatToggle] = useState(true);

  const setNewGroup = useAppSelector((state) => state.globalFunctions.value.createRoom);
  const addNewDM = useAppSelector((state) => state.globalFunctions.value.createDM);
  const userRooms = useAppSelector((state) => state.userRooms.value);
  const userDMs = useAppSelector((state) => state.userDMs.value);
  const addToRoom = useAppSelector((state) => state.globalFunctions.value.addNewUserToRoom);
  const userList = useAppSelector((state) => state.users.value.userList);
  const userInfo = useAppSelector((state) => state.users.value.userInfo);
  const userName = useAppSelector((state) => state.userName.value);

  // console.log('please show DMs 😭', userDMs);

  function addRoom() {
    setNewGroup(textFieldTemp)
  }

  const findUserInfo = () => {

    for (let i = 0; i < userInfo.length; i++) {
      if (userInfo[i].name === DMTextField) {
        return userInfo[i];
      }
    }


  }

  const trimName = (string) => {
    let split = string.split(' ');

    return split[0]

  }


  const addDM = () => {
    let currentUserInfo = findUserInfo();
    console.log(currentUserInfo);
    let combined = trimName(DMTextField) + ' & ' + trimName(userName);

    addNewDM(combined);
    addToRoom(currentUserInfo, combined, db);

  }

  const setTextField = function (e) {
    // console.log(e.target.value)
    setTextFieldTemp(e.target.value)
  }

  const setDMField = (e) => {
    setDMTextField(e.target.value);
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

  const toggleAddDM = () => {
    setAddChatToggle(false);

  }

  const toggleAddGroup = () => {
    setAddChatToggle(true);
  }

  //console.log(`theme is ${theme}`)

  const fakeDMList = ['DM with Richard', 'DM with John', 'DM with Peanut']

  $("#groupNameEntry").unbind().keyup(function (event) {
    if (event.keyCode === 13) {

      //$("#sendMessageButton").click();
      addRoom()
      $('#groupNameEntry').val("");
      console.log('WOO');
    }
  });

  return (

    <Box sx={{
      width: '100%',
      //      bgColor: 'background.paper',
      flexDirection: 'column',

    }}>
      <Box backgroundColor="primary.main" sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', flexWrap: 'nowrap', justifyContent: 'flex-start', color: 'white' }} >
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
              backgroundColor: '#fff',
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
          <MenuItem >
            <Avatar src={auth.currentUser?.photoURL} /> {auth.currentUser?.displayName}
          </MenuItem>
          <MenuItem >
            <ListItemIcon>
              <PersonAdd fontSize="small" />
            </ListItemIcon>
            Switch Accounts
          </MenuItem>
          <MenuItem onClick={handleUsernameClick} sx={{ fontFamily: "Montserrat, sans-serif" }}>
            <ListItemIcon>
              <AccountCircleIcon fontSize="small" />
            </ListItemIcon>
            Change User Name
          </MenuItem>
          <Divider />
          <MenuItem >
            <FormControlLabel className="animate__animated animate__fadeIn" control={<Switch checked={toggleDark} onChange={() => { settoggleDark(!toggleDark); setLogoImg(!logoImg); setMode((prevMode: PaletteMode) => prevMode === 'light' ? 'dark' : 'light') }} />} label={currentMode + ' mode'} />
          </MenuItem>
          <MenuItem onClick={() => signOutUser()} >
            <ListItemIcon >
              <Logout fontSize="small" />
            </ListItemIcon>
            Logout
          </MenuItem>
        </Menu>
        <Typography onClick={handleUserMenuClick} sx={{ cursor: 'pointer', color: 'white' }}>
          {auth.currentUser?.displayName}
        </Typography>
      </Box >
      <Divider />
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />} >
          <Typography>Direct Messages</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Box sx={{ overflowY: 'scroll', maxHeight: '200px' }}>
            <List>
              {userDMs.map((group, i) => (
                < ListItem disablePadding key={i} value={group} onClick={() => { setCurrentRoom(group); setShowCalendar(false) }}>
                  <ListItemButton>

                    <ListItemText primary={group} />

                  </ListItemButton>
                </ListItem>
              ))}
            </List>
          </Box>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />} >
          <Typography>Study Groups</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Box sx={{ overflowY: 'scroll', maxHeight: '200px' }}>
            <List>
              {userRooms.map((group, i) => (
                < ListItem disablePadding key={i} value={group} onClick={() => { setCurrentRoom(group); setShowCalendar(false) }}>
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

        {addChatToggle
          ? <Box><TextField size="small" id="outlined-basic" label="group name" onChange={setTextField} />
            <Button variant="contained" sx={{ marginTop: '10px', marginBottom: '10px' }} onClick={addRoom}><AddIcon /></Button><Button onClick={toggleAddDM}>Add DM</Button></Box>
          : <Box><Autocomplete
            disablePortal
            id="choosedmparticipant"
            options={userList}
            sx={{ width: 230 }}
            inputValue={DMTextField}
            onInputChange={(event, group: any) => {
              setDMTextField(group)
            }}
            renderInput={(params) => <TextField {...params} label="direct message"
            />}
          />

            <Button variant="contained" sx={{ marginTop: '10px', marginBottom: '10px' }} onClick={addDM}><AddIcon /></Button><Button onClick={toggleAddGroup}>Add Group</Button></Box>
        }

        {/* <TextField size="small" id="outlined-basic" label="Direct Message" onChange={setDMField} /> */}

      </Box>
      <Divider />
    </Box >

  );
}