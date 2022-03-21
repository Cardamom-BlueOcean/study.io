import * as React from 'react';
import { Box, Tab } from '@mui/material';
import { TabContext, TabList, TabPanel } from '@mui/lab';
//import { fakeData } from './fakeGroupData';




export default function GroupTabs() {
  const [value, setValue] = React.useState<string>('1');
  //console.log(fakeData);

  const handleChange = (event: any, newValue :string) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%', typography: 'body1' }}>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <TabList onChange={handleChange} aria-label="lab API tabs example">
            <Tab label="Javascript" value="1" />
            <Tab label="Express" value="2" />
            <Tab label="Node" value="3" />
          </TabList>
        </Box>
        <TabPanel value="1">Item One</TabPanel>
        <TabPanel value="2">Item Two</TabPanel>
        <TabPanel value="3">Item Three</TabPanel>
      </TabContext>
    </Box>

  );
}
