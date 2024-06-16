import { Box, Grid, Paper, Typography } from '@mui/material';
import React from 'react';
import PaperLayout from '../PaperLayout/PaperLayout';
import EntitySelect from '../EntitySelect/EntitySelect';

const Search = () => {
  const handleEntitySelect = (entityId) => {
    // Call the API to get form fields for the selected entity
    console.log(entityId, 'call api to fetch fields')
  };
  return (
    <>
      <Box sx={{ pb: 3 }}>
        <Typography variant="h1" component="h1" color={'#4A4A4A'}>
          Document Search
        </Typography>
      </Box>
      <Grid container spacing={3}>
        <Grid item xs={12} md={8} lg={12}>
          <PaperLayout>
          <Typography variant="body1" component="p" >
          Document Type
        </Typography>
            <EntitySelect onEntitySelect={handleEntitySelect} />
          </PaperLayout>
        </Grid>
      </Grid>
    </>
  );
};

export default Search;
