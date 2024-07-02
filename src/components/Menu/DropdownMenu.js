import React, { useState, useEffect } from 'react';
import { Button, Menu, MenuItem, Typography } from '@mui/material';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { useDispatch, useSelector } from 'react-redux';
import { selectEntityAsync } from '../../features/entities/entitiesSlice';

const organizeDataByType = (data) => {
  if (!data || data.length === 0) {
    return {};
  }

  return data.reduce((acc, entity) => {
    // const { type } = entity;
    const type = entity.type || "Type 2"
    if (!acc[type]) {
      acc[type] = [];
    }
    acc[type].push(entity);
    return acc;
  }, {});
};

const DropdownMenu = () => {
  const [menuData, setMenuData] = useState({});
  const [anchorEl, setAnchorEl] = useState(null);
  const [subMenuAnchors, setSubMenuAnchors] = useState({});
  const [selectedEntity, setSelectedEntity] = useState(null);

  const { entities} = useSelector(state => state.entities); 
  const displayName = useSelector(state => state?.entities?.selectedEntity?.displayName); 
  const dispatch = useDispatch();
  
  useEffect(() => {
    // Mock fetching menu data
    const fetchData = async () => {
      const res = entities.resultData
      const datas = organizeDataByType(res);
      console.log(datas);
      setMenuData(organizeDataByType(res));
    };
    fetchData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setSubMenuAnchors({});
  };

  const handleSubmenuOpen = (type, event) => {
    setSubMenuAnchors((prev) => ({ ...prev, [type]: event.currentTarget }));
  };

  const handleSubmenuClose = (type) => {
    setSubMenuAnchors((prev) => ({ ...prev, [type]: null }));
  };

  const handleSelection = (entity) => {
    console.log('Selected Entity:', entity);
    setSelectedEntity(entity);
    // dispach to redux
    console.log('Selected Entity:', entity);
    dispatch(selectEntityAsync(entity));
    handleClose();
  };

  const renderMenuItems = (type, items) => {
    return items.map((item) => (
      <MenuItem key={item.displayName} onClick={() => handleSelection(item)}>
        {item.displayName}
      </MenuItem>
    ));
  };

  return (
    <div>
      <Typography variant="body1" sx={{ fontWeight: 'medium' }}>
        {'Document Type'}
      </Typography>
      <Button
        aria-controls="simple-menu"
        aria-haspopup="true"
        onClick={handleOpen}
        endIcon={anchorEl ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />}
        variant="outlined"
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          // width: '100%',
          // maxWidth: "240px",
          minWidth: '120px',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap',
          textTransform: 'none',
          borderColor: 'rgba(0, 0, 0, 0.23)',
          '&:hover': {
            borderColor: 'rgba(0, 0, 0, 0.87)',
          },
          paddingTop: 1,
          paddingBottom: 1,
        }}
      >
        <Typography variant="body2" color="text.secondary">
          {/* {selectedEntity && `${selectedEntity?.type} - ${selectedEntity?.entityName}` || "Document Type"} */}
          {/* {(selectedEntity && `${selectedEntity?.displayName || selectedEntity?.type  || "Type 2"}`) || 'Document Type'} */}
          {(displayName && `${displayName || selectedEntity?.type  || "Type 2"}`) || 'Document Type'}
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
        {Object.keys(menuData).map((type) => (
          <div key={type}>
            {menuData[type].length > 1 ? (
              <>
                <MenuItem
                  onMouseOver={(event) => handleSubmenuOpen(type, event)}
                  onClick={() => handleSubmenuOpen(type, event)}
                >
                  {type}
                  <ChevronRightIcon />
                </MenuItem>
                <Menu
                  anchorEl={subMenuAnchors[type]}
                  open={Boolean(subMenuAnchors[type])}
                  onClose={() => handleSubmenuClose(type)}
                  anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                  transformOrigin={{ vertical: 'top', horizontal: 'left' }}
                  MenuListProps={{
                    onMouseLeave: () => handleSubmenuClose(type),
                  }}
                >
                  {renderMenuItems(type, menuData[type])}
                </Menu>
              </>
            ) : (
              <MenuItem onClick={() => handleSelection(menuData[type][0])}>
                {type}
              </MenuItem>
            )}
          </div>
        ))}
      </Menu>
    </div>
  );
};

export default DropdownMenu;


