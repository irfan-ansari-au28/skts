import React, { useState, useEffect } from 'react';
import { Box, TextField, Button, FormControl, InputLabel, Select, MenuItem, RadioGroup, FormControlLabel, Radio, Checkbox, Typography, Slider } from '@mui/material';
const fields = [
    { name: "firstName", label: "First Name", type: "text" },
    { name: "lastName", label: "Last Name", type: "text" },
    { name: "email", label: "Email", type: "email" },
    { name: "department", label: "Department", type: "select", options: [
      { value: "hr", label: "HR" },
      { value: "engineering", label: "Engineering" },
      { value: "marketing", label: "Marketing" }
    ]},
    { name: "employmentStatus", label: "Employment Status", type: "radio", options: [
      { value: "employed", label: "Employed" },
      { value: "unemployed", label: "Unemployed" }
    ]},
    { name: "resume", label: "Upload Resume", type: "file" },
    { name: "bio", label: "Biography", type: "textarea" },
    { name: "salaryRange", label: "Salary Range", type: "range", min: 20000, max: 100000, step: 5000 },
    { name: "terms", label: "Agree to Terms", type: "checkbox" },
    { name: "colorPreference", label: "Color Preference", type: "color" }
  ];
  
const SampleForm = () => {
  const [formValues, setFormValues] = useState({});

  // Set initial form values based on fields provided
  useEffect(() => {
    const initialValues = {};
    fields.forEach(field => {
      initialValues[field.name] = '';
    });
    setFormValues(initialValues);
  }, [fields]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormValues(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleCheckboxChange = (event) => {
    const { name, checked } = event.target;
    setFormValues(prev => ({
      ...prev,
      [name]: checked
    }));
  };

  const handleFileChange = (event) => {
    const { name, files } = event.target;
    setFormValues(prev => ({
      ...prev,
      [name]: files[0]
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('Form Data:', formValues);
  };

  const renderField = (field) => {
    switch (field.type) {
      case 'text':
      case 'password':
      case 'email':
      case 'number':
      case 'date':
      case 'time':
      case 'datetime-local':
        return <TextField key={field.name} fullWidth label={field.label} name={field.name} type={field.type} value={formValues[field.name] || ''} onChange={handleInputChange} margin="normal" />;
      case 'select':
        return (
          <FormControl fullWidth margin="normal" key={field.name}>
            <InputLabel>{field.label}</InputLabel>
            <Select name={field.name} value={formValues[field.name] || ''} onChange={handleInputChange}>
              {field.options.map(option => (
                <MenuItem key={option.value} value={option.value}>{option.label}</MenuItem>
              ))}
            </Select>
          </FormControl>
        );
      case 'radio':
        return (
          <FormControl component="fieldset" margin="normal" key={field.name}>
            <RadioGroup row name={field.name} value={formValues[field.name] || ''} onChange={handleInputChange}>
              {field.options.map(option => (
                <FormControlLabel key={option.value} value={option.value} control={<Radio />} label={option.label} />
              ))}
            </RadioGroup>
          </FormControl>
        );
      case 'checkbox':
        return <FormControlLabel key={field.name} control={<Checkbox checked={!!formValues[field.name]} onChange={handleCheckboxChange} name={field.name} />} label={field.label} margin="normal" />;
      case 'file':
        return <TextField key={field.name} fullWidth label={field.label} name={field.name} type="file" onChange={handleFileChange} margin="normal" />;
      case 'textarea':
        return <TextField key={field.name} fullWidth label={field.label} name={field.name} multiline rows={4} value={formValues[field.name] || ''} onChange={handleInputChange} margin="normal" />;
      case 'range':
        return (
          <Box key={field.name}>
            <Typography gutterBottom>{field.label}</Typography>
            <Slider name={field.name} value={formValues[field.name] || 0} onChange={(event, newValue) => setFormValues(prev => ({ ...prev, [field.name]: newValue }))} step={field.step} marks min={field.min} max={field.max} valueLabelDisplay="auto" />
          </Box>
        );
      default:
        return null;
    }
  };

  return (
    <Box component="form" noValidate autoComplete="off" onSubmit={handleSubmit} sx={{ maxWidth: 500, mx: 'auto' }}>
      {fields.map(field => renderField(field))}
      <Button type="submit" variant="contained" color="primary" sx={{ mt: 3 }}>
        Submit
      </Button>
    </Box>
  );
};

export default SampleForm