import React, { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Grid, TextField, Button, Box, Typography } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { fetchEntityData } from '../../features/entities/searchSlice';
import { setSearchFields } from '../../features/entities/entitiesSlice';
import { debounce } from '../../utils/debounce';

import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import {
  deserializeDate,
  serializeDate,
} from '../../utils/helper';

const DynamicSearchForm = ({ onSubmit }) => {
  const dispatch = useDispatch();
  const red = useSelector((state) => state.entities);
  console.log(red);
  const searchFields = useSelector(
    (state) => state.entities.selectedEntity.searchFields
  );
  const { selectedEntity } = useSelector((state) => state.entities);
  const [formData, setFormData] = React.useState({});
  const [formErrors, setFormErrors] = React.useState({});

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debounceDispatchFormData = useCallback(
    debounce((newFormData) => {
      dispatch(setSearchFields(newFormData));
    }, 300),
    [dispatch]
  );

  const validate = (data) => {
    let errors = {};

    searchFields.forEach((field) => {
      const value = data[field.fieldName]; // Use fieldName instead of fieldId

      if (field.isMandatory) {
        if (field.dataType.toLowerCase() === 'date') {
          const isEmptyDate = !value || value === '';
          if (isEmptyDate) {
            errors[field.fieldName] = 'This field is required'; // Use fieldName
          }
        } else {
          if (!value) {
            errors[field.fieldName] = 'This field is required'; // Use fieldName
          }
        }
      }

      if (field.dataType === 'number' && value) {
        if (isNaN(value)) {
          errors[field.fieldName] = 'Must be a number'; // Use fieldName
        } else if (value < field.minValue || value > field.maxValue) {
          errors[field.fieldName] =
            `Must be between ${field.minValue} and ${field.maxValue}`; // Use fieldName
        }
      }
    });

    return errors;
  };

  const handleChange = (fieldName, value) => {
    // Use fieldName instead of fieldId
    const field = searchFields.find((field) => field.fieldName === fieldName); // Use fieldName
    const formattedValue =
      field.dataType === 'date' ? serializeDate(value) : value;

    setFormData((prev) => ({
      ...prev,
      [fieldName]: formattedValue, // Use fieldName
    }));

    const newErrors = { ...formErrors };
    if (field.isMandatory && !value) {
      newErrors[field.fieldName] = 'This field is required'; // Use fieldName
    } else {
      delete newErrors[field.fieldName]; // Use fieldName
    }
    setFormErrors(newErrors);

    debounceDispatchFormData({
      ...formData,
      [field.fieldName]: formattedValue, // Use fieldName
    });
  };

  const handleSubmit = () => {
    console.log('Submitting form data:', formData);
    const errors = validate(formData);
    if (Object.keys(errors).length === 0) {
      onSubmit(true);
      // **Modified: Create an object for searchCriteria**
      // const searchCriteria = {};
      // Object.keys(formData).forEach((key) => {
      //   searchCriteria[key] = formData[key];
      // });
      // dispatch(
      //   fetchEntityData({
      //     entityName: selectedEntity.entityName,
      //     body: { searchCriteria },
      //   })
      // );
      dispatch(
        fetchEntityData({
          entityName: selectedEntity.entityName,
          body: formData,
        })
      );
    } else {
      setFormErrors(errors);
    }
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Box>
        <Grid container spacing={2} alignItems="center">
          {searchFields.map((field) => (
            <Grid
              item
              xs
              key={field.fieldName} // Use fieldName instead of fieldId
              sx={{
                minWidth: {
                  xs: '120px',
                  sm: '240px',
                },
                marginTop: '10px',
                maxWidth: '240px',
              }}
            >
              <Typography variant="body1" sx={{ fontWeight: 'medium' }}>
                {field.displayName}
                {field.isMandatory && <span style={{ color: 'red' }}>*</span>}
              </Typography>
              {field.dataType.toLowerCase() === 'date' ? (
                <DatePicker
                  value={deserializeDate(formData[field.fieldName]) || null} // Use fieldName
                  onChange={(newValue) =>
                    handleChange(field.fieldName, newValue)
                  } // Use fieldName
                  slotProps={{
                    textField: {
                      size: 'small',
                      error: !!formErrors[field.fieldName], // Use fieldName
                      helperText: formErrors[field.fieldName] || ' ', // Use fieldName
                      fullWidth: true,
                    },
                  }}
                />
              ) : (
                <TextField
                  value={formData[field.fieldName] || ''} // Use fieldName
                  onChange={(e) =>
                    handleChange(field.fieldName, e.target.value)
                  } // Use fieldName
                  type={field.dataType === 'string' ? 'text' : 'number'}
                  required={field.isMandatory}
                  error={!!formErrors[field.fieldName]} // Use fieldName
                  helperText={formErrors[field.fieldName] || ' '} // Use fieldName
                  InputProps={{
                    placeholder: `${field.displayName}`,
                    style: { color: '#555770' },
                  }}
                />
              )}
            </Grid>
          ))}
          <Grid item>
            <Button
              variant="contained"
              color="primary"
              onClick={handleSubmit}
              startIcon={<SearchIcon />}
            >
              Search
            </Button>
          </Grid>
        </Grid>
      </Box>
    </LocalizationProvider>
  );
};

export default DynamicSearchForm;
