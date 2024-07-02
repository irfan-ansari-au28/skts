import React, { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  Grid,
  TextField,
  Button,
  Box,
  // CircularProgress,
  Typography,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { fetchEntityData } from '../../features/entities/searchSlice';
import { setSearchFields } from '../../features/entities/entitiesSlice';
import { debounce } from '../../utils/debounce';

import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { deserializeDate, formatFieldName, serializeDate } from '../../utils/helper';

const DynamicSearchForm = ({ onSubmit }) => {
  const dispatch = useDispatch();
  const red= useSelector((state) => state.entities);
  console.log(red)
  const searchFields = useSelector((state) => state.entities.selectedEntity.searchFields);
  const {selectedEntity} = useSelector((state) => state.entities);
  const [formData, setFormData] = React.useState({});
  const [formErrors, setFormErrors] = React.useState({});

  // Custom debounce function
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debounceDispatchFormData = useCallback(
    debounce((newFormData) => {
      dispatch(setSearchFields(newFormData));
    }, 300),
    [dispatch]
  ); // 300ms debounce time

  const validate = (data) => {
    let errors = {};

    // Iterate over each field to apply specific validation rules
    searchFields.forEach((field) => {
      const value = data[field.fieldId];

      // Check for mandatory fields first
      if (field.isMandatory) {
        // Handle empty checks for different data types
        if (field.dataType === 'date') {
          // Check if the date is not present or invalid (serialized date strings should not be empty)
          const isEmptyDate = !value || value === '';
          if (isEmptyDate) {
            errors[field.fieldId] = 'This field is required';
          }
        } else {
          // Generic check for empty values for other data types
          if (!value) {
            errors[field.fieldId] = 'This field is required';
          }
        }
      }

      // Additional validations for numeric fields
      if (field.dataType === 'number' && value) {
        if (isNaN(value)) {
          errors[field.fieldId] = 'Must be a number';
        } else if (value < field.minValue || value > field.maxValue) {
          errors[field.fieldId] =
            `Must be between ${field.minValue} and ${field.maxValue}`;
        }
      }
    });

    return errors;
  };

  // TODO : remove
  // const searchFields = [
  //   {
  //     minValue: 0,
  //     fieldName: 'IS Create Date From',
  //     displayName: 'IS Create Date From',
  //     maxValue: 0,
  //     defaultValue: '2022-04-17',
  //     dataType: 'date',
  //     isMandatory: true,
  //     fieldId: 1,
  //     status: 'ACTIVE',
  //   },
  //   {
  //     minValue: 0,
  //     fieldName: 'IS Create Date To',
  //     displayName: 'IS Create Date To ',
  //     maxValue: 0,
  //     defaultValue: '2024-06-04T18:30:00.000Z',
  //     dataType: 'date',
  //     isMandatory: true,
  //     fieldId: 2,
  //     status: 'ACTIVE',
  //   },
  //   {
  //     minValue: 0,
  //     fieldName: 'Scan Batch ID',
  //     displayName: 'Scan Batch ID',
  //     maxValue: 0,
  //     defaultValue: 'Boy',
  //     dataType: 'text',
  //     isMandatory: true,
  //     fieldId: 3,
  //     status: 'ACTIVE',
  //   },
  // ];

  const handleChange = (fieldId, value) => {
    const field = searchFields.find((field) => field.fieldId === fieldId);
    const formattedValue =
      field.dataType === 'date' ? serializeDate(value) : value;

    setFormData((prev) => ({
      ...prev,
      [fieldId]: formattedValue,
    }));

    // Validate immediately upon change
    const newErrors = { ...formErrors };
    if (field.isMandatory && !value) {
      newErrors[field.fieldId] = 'This field is required';
    } else {
      delete newErrors[field.fieldId]; // Clear the error if the value is valid
    }
    setFormErrors(newErrors);

    debounceDispatchFormData({
      ...formData,
      [field.fieldId]: formattedValue,
    });
  };

  const handleSubmit = () => {
    console.log('Submitting form data:', formData);
    // Dispatch action to store formData in Redux
    const errors = validate(formData);
    if (Object.keys(errors).length === 0) {
      onSubmit(true);

      // TODO: Remove hardcode entityID
      dispatch(fetchEntityData({ entityName: selectedEntity.entityName, body: formData }));
    } else {
      setFormErrors(errors);
    }
  };

  // if (loading) return <CircularProgress />;
  // if (error) return <Typography color="error">{error}</Typography>;

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      {/* // Debuger BOX
      <Box component="div" sx={{ marginTop: 2 }}>
        {Object.keys(formErrors).length > 0 && (
          <div>
            <Typography variant="h6" color="error">
              Form Errors:
            </Typography>
            {Object.entries(formErrors).map(([fieldId, message]) => (
              <p key={fieldId}>
                <strong>Field ID {fieldId}:</strong> {message}
              </p>
            ))}
          </div>
        )}
      </Box> */}
      <Box>
        <Grid container spacing={2} alignItems="center">
          {searchFields.map((field) => (
            <Grid
              item
              xs
              key={field.fieldId}
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
                {formatFieldName(field.displayName)}
                {field.isMandatory && <span style={{ color: 'red' }}>*</span>}
              </Typography>
              {field.dataType === 'date' ? (
                <DatePicker
                  // label={field.displayName}
                  value={deserializeDate(formData[field.fieldId]) || null}
                  onChange={(newValue) => handleChange(field.fieldId, newValue)}
                  slotProps={{
                    textField: {
                      size: 'small',
                      error: !!formErrors[field.fieldId],
                      helperText: formErrors[field.fieldId] || ' ',
                      fullWidth: true,
                    },
                  }}
                />
              ) : (
                <TextField
                  value={formData[field.fieldId] || ''}
                  onChange={(e) => handleChange(field.fieldId, e.target.value)}
                  type={field.dataType === 'string' ? 'text' : 'number'}
                  required={field.isMandatory}
                  error={!!formErrors[field.fieldId]}
                  helperText={formErrors[field.fieldId] || ' '}
                  // Generic placeholder for all fields
                  InputProps={{
                    placeholder: `${formatFieldName(field.displayName)}`,
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