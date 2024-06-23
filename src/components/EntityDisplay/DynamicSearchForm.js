import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Grid, TextField, Button, Box, CircularProgress, Typography } from '@mui/material';

const DynamicSearchForm = () => {
  const dispatch = useDispatch();
  const { entities, selectedEntityId, loading, error } = useSelector(state => state.entities);
  const [formData, setFormData] = React.useState({});

  // Extract searchFields for the selected entityId
  const searchFields = entities?.resultData?.find(entity => entity.entityId === selectedEntityId)?.searchFields || [];

  const handleChange = (fieldId, value) => {
    setFormData(prev => ({ ...prev, [fieldId]: value }));
  };

  const handleSubmit = () => {
    console.log('Submitting form data:', formData);
    // Here you can dispatch an action to handle form submission
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
              type={field.dataType.toLowerCase()}
              required={field.isMandatory}
            />
          </Grid>
        ))}
        {searchFields.length > 0 && (
          <Grid item sx={{marginTop: '10px'}}>
            <Button variant="contained" color="primary" onClick={handleSubmit}>
              Search
            </Button>
          </Grid>
        )}
      </Grid>
    </Box>
  );
};

export default DynamicSearchForm;

