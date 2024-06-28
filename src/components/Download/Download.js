import React, { useEffect } from 'react';
import { Box, Button, Container, Typography, Grid } from '@mui/material';
import RefreshIcon from '@mui/icons-material/Refresh';
import StatusTable from '../Status/StatusTable';
import { fetchDownloadStatus } from '../../api/apiService';
import { fetchDownloadStatusAsync } from '../../features/entities/downloadSlice';
import { useDispatch, useSelector } from 'react-redux';

const DownloadStatus = () => {
  const dispatch = useDispatch()
  useEffect(()=>{
    dispatch(fetchDownloadStatusAsync())
  },[])

  const handleRefreshClick = () => {
    dispatch(fetchDownloadStatusAsync());
};

  return (
    <Container maxWidth="lg" sx={{ mt: 1, mb: 1 }}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Box
            sx={{
              p: 2,
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <Typography variant="h2" component="h1" color={'#4A4A4A'}>
              Download Status
            </Typography>
            <Button
              variant="contained"
              color="error"
              startIcon={<RefreshIcon />}
              onClick={handleRefreshClick}
            >
              Refresh
            </Button>
          </Box>
        </Grid>
      </Grid>
      <StatusTable />
    </Container>
  );
};

export default DownloadStatus;
