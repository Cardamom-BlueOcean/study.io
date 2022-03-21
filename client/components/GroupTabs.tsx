import * as React from 'react';
import { Box, Tab, TextField, Stack } from '@mui/material';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import { fakeData } from './fakeGroupData';
import { group } from 'console';

export default function GroupTabs() {
  const [value, setValue] = React.useState<string>('javascript');
  const [groups, setGroups] = React.useState(fakeData);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%', typography: 'body1' }}>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <TabList onChange={handleChange} aria-label="lab API tabs example">
            {groups.map((group, i) => (
              < Tab key={i} label={group.groupName} value={group.groupName} />
            ))}
          </TabList>
        </Box>
        <Box sx={{ height: '700px', overflow: 'scroll' }}>
          {groups.map((group, i) => (
            < TabPanel key={i} value={group.groupName}>
              {group.messages.map((message, i) => (
                <Stack spacing={1}>
                  <Box>{message.userName}</Box>
                  <Box>{message.body}</Box>
                  <Box>{message.date}</Box>
                </Stack>))}
            </TabPanel>
          ))}
        </Box>
      </TabContext>
      <Box
        component="form"
        sx={{
          '& > :not(style)': { m: 0, width: '100%' },
        }}
        noValidate
        autoComplete="off"
      >
        <TextField id="outlined-basic" label="Message" variant="outlined" />
      </Box>
    </Box>

  );
}
