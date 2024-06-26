import { Box, Grid, Paper, Typography, Alert, Container } from '@mui/material';
import React, { useState } from 'react';
import PaperLayout from '../PaperLayout/PaperLayout';
import EntitySelect from '../EntitySelect/EntitySelect';
import DynamicSearchForm from '../EntityDisplay/DynamicSearchForm';
import TypeSelect from '../TypeSelect/TypeSelect';
import DynamicTable from '../DynamicTable/DynamicTable';
import { useSelector } from 'react-redux';
import NestedDropdown from '../menu/menu3';

const Search = () => {
  const [selectedType, setSelectedType] = useState('');
  const [showTable, setShowTable] = useState(false);
  const [alertOpen, setAlertOpen] = React.useState(true); // State to manage Alert visibility

  const handleClose = () => {
    setAlertOpen(false); // Hide the Alert when the close button is clicked
  };
  // const { data, pageDetails, loading, error } = useSelector((state) => state.entity);
  return (
    <>
      {alertOpen && (
        <Alert
          onClose={handleClose}
          severity="success"
          sx={{
            width: '100%',
            backgroundColor: '#E6F3E5',
            color: 'black',
            border: '1px solid #4EAF51',
          }}
        >
          Your documents are being downloaded. Please check the download page
          for status updates.
        </Alert>
      )}
      <Container maxWidth="lg" sx={{ mt: 1, mb: 1 }}>
        <Box sx={{ pb: 3 }}>
          <Typography variant="h2" component="h1" color={'#4A4A4A'}>
            Document Search
          </Typography>
        </Box>
        {/* <PaperLayout>
          <NestedDropdown />
        </PaperLayout> */}
        <Grid container spacing={3}>
          <Grid item xs={12} md={12} lg={12}>
            <PaperLayout>
              <Grid container spacing={3}>
                <Grid item xs={12} md={4} lg={3}>
                  {/* <TypeSelect onTypeChange={setSelectedType} /> */}
                  {/* // Option 1 Menu */}
                  <NestedDropdown />
                </Grid>
                <Grid item xs={12} md={6}>
                  {selectedType && <EntitySelect type={selectedType} />}
                </Grid>
              </Grid>
              {<DynamicSearchForm onSubmit={setShowTable} />}
            </PaperLayout>
          </Grid>
        </Grid>

        <Grid container spacing={3} sx={{ marginTop: '16px' }}>
          <Grid item xs={12} md={12} lg={12}>
            {showTable && <DynamicTable />}
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default Search;
