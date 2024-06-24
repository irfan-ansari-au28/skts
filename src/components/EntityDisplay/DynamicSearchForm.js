import React, { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Grid, TextField, Button, Box, CircularProgress, Typography } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { fetchEntityData } from '../../features/entities/searchSlice';
import { setSearchFields } from '../../features/entities/entitiesSlice';
import { debounce } from '../../utils/debounce';


const DynamicSearchForm = ({onSubmit}) => {
  const dispatch = useDispatch();
  const { entities, selectedEntityId, loading, error } = useSelector(state => state.entities);
  const [formData, setFormData] = React.useState({});
  const [formErrors, setFormErrors] = React.useState({});

    // Custom debounce function
    const debounceDispatchFormData = useCallback(debounce((newFormData) => {
      dispatch(setSearchFields(newFormData));
    }, 300), [dispatch]); // 300ms debounce time

  const validate = (data) => {
    let errors = {};
    // Example validation for required fields and data types
    searchFields.forEach(field => {
      if (field.isMandatory && !data[field.fieldId]) {
        errors[field.fieldId] = 'This field is required';
      } else if (field.dataType === 'number' && data[field.fieldId]) {
        if (isNaN(data[field.fieldId])) {
          errors[field.fieldId] = 'Must be a number';
        } else if (data[field.fieldId] < field.minValue || data[field.fieldId] > field.maxValue) {
          errors[field.fieldId] = `Must be between ${field.minValue} and ${field.maxValue}`;
        }
      }
    });
    return errors;
  };

  // Extract searchFields for the selected entityId
  const searchFields = entities?.resultData?.find(entity => entity.entityId === selectedEntityId)?.searchFields || [];

  const handleChange = (fieldId, value) => {
    // Update the local form data state
    setFormData(prev => {
      const newFormData = { ...prev, [fieldId]: value };
      
     // Use debounced function to update Redux state
     debounceDispatchFormData(newFormData);
      
      // Optionally clear errors as the user types
      setFormErrors(prevErrors => ({ ...prevErrors, [fieldId]: null }));

      return newFormData;
  });
  };

  const handleSubmit = () => {
    console.log('Submitting form data:', formData);
     // Dispatch action to store formData in Redux
     const errors = validate(formData);
     if (Object.keys(errors).length === 0) {
      onSubmit(true)
       dispatch(fetchEntityData({ entityId: selectedEntityId, body: formData }));
     } else {
       setFormErrors(errors);
     }
  };

  if (loading) return <CircularProgress />;
  if (error) return <Typography color="error">{error}</Typography>;

  return (
    <Box sx={{  }}>
      <Grid container spacing={2} alignItems="center" >
        {searchFields.map((field) => (
          <Grid item xs key={field.fieldId}>
            <TextField
              fullWidth
              sx={{
                minWidth: {
                  xs: '120px',
                  sm: '240px'
                },
                marginTop: '10px', 
              }}
              size="small"
              label={field.displayName}
              variant="outlined"
              value={formData[field.fieldId] || ''}
              onChange={(e) => handleChange(field.fieldId, e.target.value)}
              // type={field.dataType === 'string' ? 'text' : 'number'}
              type={field.dataType.toLowerCase()  === 'string' ? 'text' : 'number'}
              required={field.isMandatory}
              error={!!formErrors[field.fieldId]}
              helperText={formErrors[field.fieldId]}
            />
          </Grid>
        ))}
        {searchFields.length > 0 && (
          <Grid item sx={{marginTop: '10px'}}>
            <Button variant="contained" color="primary" onClick={handleSubmit} startIcon={<SearchIcon fontSize='12px'/>}>
              Search
            </Button>
          </Grid>
        )}
      </Grid>
    </Box>
  );
};

export default DynamicSearchForm;

