import { Box, Grid, Paper, Typography } from '@mui/material';
import React, { useState } from 'react';
import PaperLayout from '../PaperLayout/PaperLayout';
import EntitySelect from '../EntitySelect/EntitySelect';
import DynamicSearchForm from '../EntityDisplay/DynamicSearchForm';
import TypeSelect from '../TypeSelect/TypeSelect';
import DynamicTable from '../DynamicTable/DynamicTable';
import { useSelector } from 'react-redux';


const Search = () => {
  const [selectedType, setSelectedType] = useState('');
  const [showTable, setShowTable] =  useState(false)
  // const { data, pageDetails, loading, error } = useSelector((state) => state.entity);
  return (
    <>
      <Box sx={{ pb: 3 }}>
        <Typography variant="h2" component="h1" color={'#4A4A4A'}>
          Document Search
        </Typography>
      </Box>
      <Grid container spacing={3}>
        <Grid item xs={12} md={12} lg={12}>
          <PaperLayout>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6} lg={3}>
                <TypeSelect onTypeChange={setSelectedType} />
              </Grid>
              <Grid item xs={12} md={6}>
                {selectedType && <EntitySelect type={selectedType} />}
              </Grid>
            </Grid>
            {selectedType && <DynamicSearchForm onSubmit={setShowTable} />}
          </PaperLayout>
        </Grid>
      </Grid>

      <Grid container spacing={3} sx={{marginTop:'16px'}}>
        <Grid item xs={12} md={12} lg={12}>
            {showTable && <DynamicTable  />} 
        </Grid>
      </Grid>
    </>
  );
};

export default Search;
