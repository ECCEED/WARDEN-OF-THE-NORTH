import React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

function BasicSelect({ value, onChange }) {
  return (
    <Box sx={{minWidth: 50  }} >
      <FormControl fullWidth >
        <InputLabel id="demo-simple-select-label" > Role </InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={value}
          label="Role"
          onChange={onChange}
          sx={{ '& .MuiSelect-root': { color: 'red' } }}
        >
          <MenuItem value={1}>Shop</MenuItem>
          <MenuItem value={2}>Insurance</MenuItem>
          <MenuItem value={3}>Repair</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}

export default BasicSelect;
