import React, { useState } from 'react';
import { TextField, Button, Box } from '@mui/material';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

const DynamicForm = () => {
  const fields = [
    { name: "firstName", label: "First Name", type: "text" },
    { name: "lastName", label: "Last Name", type: "text" },
    { name: "email", label: "Email", type: "email" },
    { name: "startDate", label: "Start Date", type: "date" },
    { name: "endDate", label: "End Date", type: "date" }
  ];

  const [formValues, setFormValues] = useState({
    firstName: '',
    lastName: '',
    email: '',
    startDate: null,
    endDate: null
  });

  const handleInputChange = (name, value) => {
    setFormValues(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form Data:', formValues);
  };

  const renderField = (field) => {
    if (field.type === "date") {
      return (
        <LocalizationProvider dateAdapter={AdapterDateFns} key={field.name}>
          <DatePicker
            label={field.label}
            inputFormat="MM/dd/yyyy"
            value={formValues[field.name]}
            onChange={(newValue) => handleInputChange(field.name, newValue)}
            renderInput={(params) => <TextField {...params} fullWidth margin="normal" />}
          />
        </LocalizationProvider>
      );
    }
    return (
      <TextField
        key={field.name}
        label={field.label}
        name={field.name}
        value={formValues[field.name]}
        onChange={(e) => handleInputChange(field.name, e.target.value)}
        fullWidth
        margin="normal"
        type={field.type}
      />
    );
  };

  return (
    <Box component="form" noValidate autoComplete="off" onSubmit={handleSubmit}>
      {fields.map(field => renderField(field))}
      <Button type="submit" variant="contained" color="primary" sx={{ mt: 3 }}>
        Submit
      </Button>
    </Box>
  );
};

export default DynamicForm;
