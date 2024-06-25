import React, { useState, useEffect } from 'react';
import { Button, Menu, MenuItem, Typography } from '@mui/material';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

function NestedDropdown() {
  const [menuData, setMenuData] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const [subMenuAnchors, setSubMenuAnchors] = useState({});

  useEffect(() => {
    // Mock fetching menu data
    const fetchData = async () => {
      const data = [
        {
          "label": "FCA",
          "value": "FCA",
          "entityId": 5,
          "children": null
        },
        {
          "label": "FNCA",
          "value": "FNCA",
          "entityId": 1,
          "children": [
            {
              "label": "FNCA - ERR Batches",
              "value": "FNCA - ERR Batches",
              "entityId": 2
            },
            {
              "label": "FNCA - Another Batch",
              "value": "FNCA - Another Batch",
              "entityId": 3
            }
          ]
        },
        {
          "label": "FBA",
          "value": "FBA",
          "entityId": 4,
          "children": [
            {
              "label": "FBA Sub Option 1",
              "value": "FBA Sub Option 1",
              "entityId": 8
            }
          ]
        }
      ];
      setMenuData(data);
    };
    fetchData();
  }, []);

  const handleOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setSubMenuAnchors({});
  };

  const handleSubmenuOpen = (item, event) => {
    setSubMenuAnchors(prev => ({ ...prev, [item.value]: event.currentTarget }));
  };

  const handleSubmenuClose = (item) => {
    setSubMenuAnchors(prev => ({ ...prev, [item.value]: null }));
  };

  const handleSelection = (entityId) => {
    console.log("Selected Entity ID:", entityId);
    handleClose();
  };

  const renderMenuItems = (items, parentId) => {
    return items.map((item) => (
      <MenuItem 
        key={item.value}
        onMouseOver={(event) => item.children ? handleSubmenuOpen(item, event) : null}
        onClick={() => !item.children ? handleSelection(item.entityId) : undefined}
      >
        {item.label}
        {item.children && <ChevronRightIcon />}
        {item.children && (
          <Menu
            anchorEl={subMenuAnchors[item.value]}
            open={Boolean(subMenuAnchors[item.value])}
            onClose={() => handleSubmenuClose(item)}
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            transformOrigin={{ vertical: 'top', horizontal: 'left' }}
            MenuListProps={{ onMouseLeave: () => handleSubmenuClose(item) }}
          >
            {renderMenuItems(item.children, item.value)}
          </Menu>
        )}
      </MenuItem>
    ));
  };

  return (
    <div>
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
        MenuListProps={{ onMouseLeave: handleClose }}
      >
        {renderMenuItems(menuData)}
      </Menu>
    </div>
  );
}

export default NestedDropdown;
