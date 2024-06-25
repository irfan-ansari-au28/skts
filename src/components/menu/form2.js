import React, { useState } from 'react';
import { Box, TextField, Button, FormControl, InputLabel, Select, MenuItem, RadioGroup, FormControlLabel, Radio, Checkbox, Typography, Slider } from '@mui/material';

const Form = () => {
  const [formValues, setFormValues] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    age: '',
    startDate: '',
    startTime: '',
    appointment: '',
    department: '',
    employmentStatus: '',
    terms: false,
    resume: null,
    bio: '',
    salaryRange: 30,
    active: false,
    colorPreference: '',
    hiddenData: 'some hidden data'
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleCheckboxChange = (event) => {
    setFormValues({ ...formValues, [event.target.name]: event.target.checked });
  };

  const handleFileChange = (event) => {
    setFormValues({ ...formValues, [event.target.name]: event.target.files[0] });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('Form Data:', formValues);
  };

  return (
    <Box component="form" noValidate autoComplete="off" onSubmit={handleSubmit} sx={{ maxWidth: 400, mx: 'auto' }}>
      <TextField fullWidth label="First Name" name="firstName" value={formValues.firstName} onChange={handleInputChange} margin="normal" />
      <TextField fullWidth label="Last Name" name="lastName" value={formValues.lastName} onChange={handleInputChange} margin="normal" />
      <TextField fullWidth label="Email" name="email" type="email" value={formValues.email} onChange={handleInputChange} margin="normal" />
      <TextField fullWidth label="Password" name="password" type="password" value={formValues.password} onChange={handleInputChange} margin="normal" />
      <TextField fullWidth label="Age" name="age" type="number" value={formValues.age} onChange={handleInputChange} margin="normal" />
      <TextField fullWidth label="Start Date" name="startDate" type="date" value={formValues.startDate} onChange={handleInputChange} margin="normal" InputLabelProps={{ shrink: true }} />
      <TextField fullWidth label="Start Time" name="startTime" type="time" value={formValues.startTime} onChange={handleInputChange} margin="normal" InputLabelProps={{ shrink: true }} />
      <TextField fullWidth label="Appointment Date and Time" name="appointment" type="datetime-local" value={formValues.appointment} onChange={handleInputChange} margin="normal" InputLabelProps={{ shrink: true }} />
      <FormControl fullWidth margin="normal">
        <InputLabel>Department</InputLabel>
        <Select name="department" value={formValues.department} onChange={handleInputChange}>
          <MenuItem value="HR">HR</MenuItem>
          <MenuItem value="Engineering">Engineering</MenuItem>
          <MenuItem value="Marketing">Marketing</MenuItem>
        </Select>
      </FormControl>
      <FormControl component="fieldset" margin="normal">
        <RadioGroup row name="employmentStatus" value={formValues.employmentStatus} onChange={handleInputChange}>
          <FormControlLabel value="employed" control={<Radio />} label="Employed" />
          <FormControlLabel value="unemployed" control={<Radio />} label="Unemployed" />
        </RadioGroup>
      </FormControl>
      <FormControlLabel control={<Checkbox checked={formValues.terms} onChange={handleCheckboxChange} name="terms" />} label="Agree to Terms" margin="normal" />
      <TextField fullWidth label="Upload Resume" name="resume" type="file" onChange={handleFileChange} margin="normal" />
      <TextField fullWidth label="Biography" name="bio" multiline rows={4} value={formValues.bio} onChange={handleInputChange} margin="normal" />
      <Typography gutterBottom>Salary Range</Typography>
      <Slider name="salaryRange" value={formValues.salaryRange} onChange={(event, newValue) => setFormValues({ ...formValues, salaryRange: newValue })} step={10} marks min={10} max={100} valueLabelDisplay="auto" />
      <FormControlLabel control={<Checkbox checked={formValues.active} onChange={handleCheckboxChange} name="active" />} label="Active" margin="normal" />
      <TextField fullWidth label="Color Preference" name="colorPreference" type="color" value={formValues.colorPreference} onChange={handleInputChange} margin="normal" />
      <input type="hidden" name="hiddenData" value={formValues.hiddenData} />
      <Button type="submit" variant="contained" color="primary" sx={{ mt: 3 }}>
        Submit
      </Button>
    </Box>
  );
};

export default Form;
