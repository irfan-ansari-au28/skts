import React, { useState, useEffect } from 'react';
import { Button, Menu, MenuItem, Typography } from '@mui/material';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

const organizeDataByType = (data) => {
  if (!data || data.length === 0) {
    return {};
  }

  return data.reduce((acc, entity) => {
    const { type } = entity;
    if (!acc[type]) {
      acc[type] = [];
    }
    acc[type].push(entity);
    return acc;
  }, {});
};

const NestedDropdown = () => {
  const [menuData, setMenuData] = useState({});
  const [anchorEl, setAnchorEl] = useState(null);
  const [subMenuAnchors, setSubMenuAnchors] = useState({});
  const [selectedEntity, setSelectedEntity] = useState(null);

  useEffect(() => {
    // Mock fetching menu data
    const fetchData = async () => {
      const datas = organizeDataByType(sampleData);
      console.log(datas);
      setMenuData(organizeDataByType(sampleData));
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

  const handleSubmenuOpen = (type, event) => {
    setSubMenuAnchors((prev) => ({ ...prev, [type]: event.currentTarget }));
  };

  const handleSubmenuClose = (type) => {
    setSubMenuAnchors((prev) => ({ ...prev, [type]: null }));
  };

  const handleSelection = (entity) => {
    console.log('Selected Entity:', entity);
    setSelectedEntity(entity);
    handleClose();
  };

  const renderMenuItems = (type, items) => {
    return items.map((item) => (
      <MenuItem key={item.entityId} onClick={() => handleSelection(item)}>
        {item.displayname}
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
          {(selectedEntity && `${selectedEntity?.type}`) || 'Document Type'}
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

export default NestedDropdown;

const sampleData = [
  {
    type: 'Freight Cash Image',
    entityName: 'ZAPEMPEXP',
    displayname: 'ZAPEMPEXP',
    entityId: 2,
    searchFields: [
      {
        minValue: 0,
        fieldName: 'IS Create Date From',
        displayName: 'IS Create Date From',
        maxValue: 0,
        defaultValue: 11,
        dataType: 'date',
        isMandatory: true,
        fieldId: 1,
        status: 'ACTIVE',
      },
      {
        minValue: 0,
        fieldName: 'IS Create Date To',
        displayName: 'IS Create Date To ',
        maxValue: 0,
        defaultValue: 2,
        dataType: 'date',
        isMandatory: true,
        fieldId: 2,
        status: 'ACTIVE',
      },
      {
        minValue: 0,
        fieldName: 'Scan Batch ID',
        displayName: 'Scan Batch ID',
        maxValue: 0,
        defaultValue: 'Boy',
        dataType: 'text',
        isMandatory: true,
        fieldId: 3,
        status: 'ACTIVE',
      },
    ],
  },
  {
    type: 'FNCA',
    entityName: 'ZAPGFFUP',
    displayname: 'ZAPGFFUP',
    entityId: 1,
    searchFields: [
      {
        minValue: 4,
        fieldName: 'COCD',
        displayName: 'COCD',
        maxValue: 11,
        defaultValue: 11,
        dataType: 'number',
        isMandatory: true,
        fieldId: 1,
        status: 'ACTIVE',
      },
      {
        minValue: 2,
        fieldName: 'DOC_NUMBER',
        displayName: 'DOCUMENT NUMBER',
        maxValue: 5.5,
        defaultValue: 2,
        dataType: 'number',
        isMandatory: true,
        fieldId: 2,
        status: 'ACTIVE',
      },
      {
        minValue: 0,
        fieldName: 'YEAR',
        displayName: 'YEAR',
        maxValue: 0,
        defaultValue: 'Boy',
        dataType: 'String',
        isMandatory: true,
        fieldId: 3,
        status: 'ACTIVE',
      },
    ],
  },
  {
    type: 'FNCA',
    entityName: 'ZAPFNCAEXP',
    displayname: 'ZAPFNCAEXP',
    entityId: 3,
    searchFields: [
      {
        minValue: 0,
        fieldName: 'CREATION_DATE',
        displayName: 'CREATION DATE',
        maxValue: 0,
        defaultValue: '2023-01-01',
        dataType: 'date',
        isMandatory: false,
        fieldId: 4,
        status: 'ACTIVE',
      },
    ],
  },
];
