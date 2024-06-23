import React from 'react';
import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { APP_TYPES } from '../../constants/types';
import { useDispatch } from 'react-redux';
import { fetchEntities } from '../../features/entities/entitiesSlice';

const TypeSelect = ({onTypeChange}) => {
  const [type, setType] = React.useState('');
  const dispatch = useDispatch()

  const handleChange = (event) => {
    const selectedType = event.target.value;
    setType(selectedType);
    onTypeChange(selectedType)
    // call entities/search api
    dispatch(fetchEntities(selectedType));
  };

  return (
    <FormControl  sx={{ width: '100%', minWidth: 120, maxWidth: 240 }} size="small">
      <InputLabel id="type-select-label">Application Type</InputLabel>
      <Select
        labelId="type-select-label"
        id="type-select"
        value={type}
        label="Application Type"
        onChange={handleChange}
      >
        <MenuItem value={APP_TYPES.FCI}>{APP_TYPES.FCI}</MenuItem>
        <MenuItem value={APP_TYPES.FCNA}>{APP_TYPES.FCNA}</MenuItem>
      </Select>
    </FormControl>
  );
};

export default TypeSelect;
