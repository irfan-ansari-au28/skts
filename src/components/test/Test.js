import React from 'react';
import { FormControl, InputLabel, Select, MenuItem, Box } from '@mui/material';

const DualSelectComponent = () => {
  const [applicationType, setApplicationType] = React.useState('');
  const [documentType, setDocumentType] = React.useState('');

  const handleApplicationTypeChange = (event) => {
    setApplicationType(event.target.value);
  };

  const handleDocumentTypeChange = (event) => {
    setDocumentType(event.target.value);
  };

  return (
    <Box sx={{ display: 'flex', gap: 2, p: 2 }}>
      <FormControl fullWidth>
        <InputLabel>Application Type</InputLabel>
        <Select
          value={applicationType}
          label="Application Type"
          onChange={handleApplicationTypeChange}
          sx={{ bgcolor: 'background.paper', borderColor: 'divider' }}
        >
          <MenuItem value="FNCA">FNCA</MenuItem>
          <MenuItem value="Type2">Type 2</MenuItem>
        </Select>
      </FormControl>

      <FormControl fullWidth>
        <InputLabel>Document Type</InputLabel>
        <Select
          value={documentType}
          label="Document Type"
          onChange={handleDocumentTypeChange}
          sx={{ bgcolor: 'background.paper', borderColor: 'divider' }}
        >
          <MenuItem value="EER Batches">EER Batches</MenuItem>
          <MenuItem value="Type2">Type 2</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
};

export default DualSelectComponent;
