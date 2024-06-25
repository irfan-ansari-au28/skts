import React, { useState } from 'react';
import { Button, Menu, MenuItem, Typography } from '@mui/material';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import DynamicForm from './form';
import Form from './form2';
import SampleForm from './form3';





function NestedDropdown() {
  const [anchorEl, setAnchorEl] = useState(null);
  const [subMenuAnchorEl, setSubMenuAnchorEl] = useState(null);

  const handleOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setSubMenuAnchorEl(null);
  };

  const handleSubmenuOpen = (event) => {
    event.preventDefault();
    setSubMenuAnchorEl(event.currentTarget);
  };

  const handleSubmenuClose = () => {
    setSubMenuAnchorEl(null);
  };

  const handleSelection = (value) => {
    console.log("Selected Value:", value);
    handleClose();
  };

  return (
    <div>
      <SampleForm/>
      <Button
        aria-controls="simple-menu"
        aria-haspopup="true"
        onClick={handleOpen}
        endIcon={anchorEl ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />}
        variant="outlined"
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          width: '100%',
          textTransform: 'none',
          borderColor: 'rgba(0, 0, 0, 0.23)',
          '&:hover': {
            borderColor: 'rgba(0, 0, 0, 0.87)',
          }
        }}
      >
        <Typography variant="body2" color="text.secondary">
          Document Type
        </Typography>
      </Button>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={() => handleSelection('FNCA')}>FNCA</MenuItem>
        <MenuItem 
          aria-haspopup="true" 
          aria-owns={subMenuAnchorEl ? 'simple-submenu' : undefined}
          onMouseOver={handleSubmenuOpen}
          sx={{ justifyContent: 'space-between' }}
        >
          FNCA - ERR Batches
          <ChevronRightIcon />
        </MenuItem>
        <Menu
          id="simple-submenu"
          anchorEl={subMenuAnchorEl}
          keepMounted
          open={Boolean(subMenuAnchorEl)}
          onClose={handleSubmenuClose}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'left',
          }}
        >
          {/* <MenuItem onClick={() => handleSelection('Advance Payment')}>Advance Payment</MenuItem>
          <MenuItem onClick={() => handleSelection('ERR Batches')}>ERR Batches</MenuItem>
          <MenuItem onClick={() => handleSelection('GFF Urgent Payment')}>GFF Urgent Payment</MenuItem>
          <MenuItem onClick={() => handleSelection('LARA Intermodal & 3PF')}>LARA Intermodal & 3PF</MenuItem> */}
          <MenuItem onClick={() => handleSelection('Non-PO Credit Memo')}>Non-PO Credit Memo</MenuItem>
          <MenuItem onClick={() => handleSelection('Payment History Correction Form')}>Payment History Correction Form</MenuItem>
          <MenuItem onClick={() => handleSelection('Advance Payment')}>Advance Payment</MenuItem>
          <MenuItem onClick={() => handleSelection('ERR Batches')}>ERR Batches</MenuItem>
          <MenuItem onClick={() => handleSelection('GFF Urgent Payment')}>GFF Urgent Payment</MenuItem>
          <MenuItem onClick={() => handleSelection('LARA Intermodal & 3PF')}>LARA Intermodal & 3PF</MenuItem>
          <MenuItem onClick={() => handleSelection('Non-PO Credit Memo')}>Non-PO Credit Memo</MenuItem>
          <MenuItem onClick={() => handleSelection('Payment History Correction Form')}>Payment History Correction Form</MenuItem>
          <MenuItem onClick={() => handleSelection('Advance Payment')}>Advance Payment</MenuItem>
          <MenuItem onClick={() => handleSelection('ERR Batches')}>ERR Batches</MenuItem>
          <MenuItem onClick={() => handleSelection('GFF Urgent Payment')}>GFF Urgent Payment</MenuItem>
          <MenuItem onClick={() => handleSelection('LARA Intermodal & 3PF')}>LARA Intermodal & 3PF</MenuItem>
          <MenuItem onClick={() => handleSelection('Non-PO Credit Memo')}>Non-PO Credit Memo</MenuItem>
          <MenuItem onClick={() => handleSelection('Payment History Correction Form')}>Payment History Correction Form</MenuItem>
          <MenuItem onClick={() => handleSelection('Advance Payment')}>Advance Payment</MenuItem>
          <MenuItem onClick={() => handleSelection('ERR Batches')}>ERR Batches</MenuItem>
          <MenuItem onClick={() => handleSelection('GFF Urgent Payment')}>GFF Urgent Payment</MenuItem>
          <MenuItem onClick={() => handleSelection('LARA Intermodal & 3PF')}>LARA Intermodal & 3PF</MenuItem>
          <MenuItem onClick={() => handleSelection('Non-PO Credit Memo')}>Non-PO Credit Memo</MenuItem>
          <MenuItem onClick={() => handleSelection('Payment History Correction Form')}>Payment History Correction Form</MenuItem>
        </Menu>
      </Menu>
    </div>
  );
}

export default NestedDropdown;
