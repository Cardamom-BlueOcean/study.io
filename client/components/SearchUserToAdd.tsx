import * as React from "react";
import { Autocomplete, TextField } from '@mui/material';

export default function SearchUserToAdd({ searchedUsers }) {
  return (
    <Autocomplete
      disablePortal
      id="usersSearch"
      options={searchedUsers}
      sx={{ width: 300 }}
      renderInput={(params) => <TextField {...params} label="Search Users" />}
    />
  );
}