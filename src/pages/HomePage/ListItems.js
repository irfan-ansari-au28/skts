import * as React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import SearchIcon from '@mui/icons-material/Search';
import DownloadIcon from '../../assets/icons/DownloadIcon'; 

export default function ListItems() {
  const [selectedIndex, setSelectedIndex] = React.useState(0);  // Initialize state to select the first item by default

  const handleListItemClick = (event, index) => {
    setSelectedIndex(index);  // Update the selected index state
  };

  return (
    <React.Fragment>
      <ListItemButton
        selected={selectedIndex === 0}  // Apply the selected prop
        onClick={(event) => handleListItemClick(event, 0)}  // Handle click
        sx={{ marginTop: 2 }}
      >
        <ListItemIcon>
          <SearchIcon color={selectedIndex === 0 ? "primary" : "#555770"} />
        </ListItemIcon>
        <ListItemText primary="Search" />
      </ListItemButton>
      <ListItemButton
        selected={selectedIndex === 1}  // Apply the selected prop
        onClick={(event) => handleListItemClick(event, 1)}  // Handle click
        sx={{ marginTop: 2 }}
      >
        <ListItemIcon>
          <DownloadIcon color={selectedIndex === 1 ? "primary" : "#555770"} />
        </ListItemIcon>
        <ListItemText primary="Download" />
      </ListItemButton>
    </React.Fragment>
  );
}
