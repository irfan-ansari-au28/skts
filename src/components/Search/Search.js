import { Box, Grid, Paper, Typography } from '@mui/material';
import React, { useState } from 'react';
import PaperLayout from '../PaperLayout/PaperLayout';
import EntitySelect from '../EntitySelect/EntitySelect';
import DynamicSearchForm from '../EntityDisplay/DynamicSearchForm';
import TypeSelect from '../TypeSelect/TypeSelect';

const Search = () => {
  const [selectedType, setSelectedType] = useState('');
  return (
    <>
      <Box sx={{ pb: 3 }}>
        <Typography variant="h2" component="h1" color={'#4A4A4A'}>
          Document Search
        </Typography>
      </Box>
      <Grid container spacing={3}>
        <Grid item xs={12} md={8} lg={12}>
          <PaperLayout>
          <TypeSelect onTypeChange={setSelectedType} />
          {selectedType && (
              <>
                <EntitySelect />
                <DynamicSearchForm />
              </>
            )}
            {/* <Typography variant="body1" component="p">
              Document Type
            </Typography>
            <EntitySelect />
            <DynamicSearchForm /> */}
          </PaperLayout>
        </Grid>
      </Grid>
    </>
  );
};

export default Search;
