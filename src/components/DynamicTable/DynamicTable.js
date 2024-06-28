import React, { useEffect, useState } from 'react';
import {
  Checkbox,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  TableSortLabel,
  TablePagination,
  Box,
  CircularProgress,
  Typography,
  Snackbar,
  IconButton,
  Alert
} from '@mui/material';
import DownloadIcon from '../../assets/icons/DownloadIcon';
import { useDispatch, useSelector } from 'react-redux';
import { fetchEntityData } from '../../features/entities/searchSlice';
import PaperLayout from '../PaperLayout/PaperLayout';

import CloseIcon from '@mui/icons-material/Close'; // For closing the Snackbar
import { getPresignedUrl, processBulkDownload } from '../../api/apiService';
import { setDownloadNotification } from '../../features/entities/entitiesSlice';
import { formatFieldName } from '../../utils/helper';

// remove this sample data

const data = [
        {
            "minValue": 4,
            "fieldName": "COCD",
            "displayName": "ZAPGFFUP",
            "maxValue": 11,
            "defaultValue": 11,
            "entityName": "ZAPGFFUP",
            "dataType": "number",
            "entityId": 1,
            "type": "FCI",
            "isMandatory": true,
            "fieldId": 1,
            "status": "ACTIVE"
        },
        {
            "minValue": 2,
            "fieldName": "DOC_NUMBER",
            "displayName": "ZAPNPCRMEM",
            "maxValue": 5.5,
            "defaultValue": 2,
            "entityName": "ZAPNPCRMEM",
            "dataType": "number",
            "entityId": 3,
            "type": "FCI",
            "isMandatory": true,
            "fieldId": 2,
            "status": "ACTIVE"
        },
        {
            "minValue": 0,
            "fieldName": "YEAR",
            "displayName": "ZAPNPCRMEM",
            "maxValue": 0,
            "defaultValue": 2024,
            "entityName": "ZAPNPCRMEM",
            "dataType": "number",
            "entityId": 3,
            "type": "FNI",
            "isMandatory": true,
            "fieldId": 3,
            "status": "ACTIVE"
        },
        {
            "minValue": 0,
            "fieldName": "CREATION_DATE",
            "displayName": "ZAPNPCRMEM",
            "maxValue": 0,
            "defaultValue": "2024-06-24 12:00:00",
            "entityName": "ZAPNPCRMEM",
            "dataType": "date",
            "entityId": 4,
            "type": "FNCF",
            "isMandatory": false,
            "fieldId": 4,
            "status": "ACTIVE"
        },
        {
            "minValue": 0,
            "fieldName": "ARCHIVE_DOC_ID",
            "displayName": "ZAPNPCRMEM",
            "maxValue": 0,
            "defaultValue": 1,
            "entityName": "ZAPNPCRMEM",
            "dataType": "number",
            "entityId": 4,
            "type": "FNCF",
            "isMandatory": false,
            "fieldId": 5,
            "status": "ACTIVE"
        },
        {
            "minValue": 0,
            "fieldName": "FNCA_DOC_TYPE",
            "displayName": "ZAPEMPEXP",
            "maxValue": 0,
            "defaultValue": "Boy",
            "entityName": "ZAPEMPEXP",
            "dataType": "text",
            "entityId": 2,
            "type": "FNCF",
            "isMandatory": false,
            "fieldId": 6,
            "status": "ACTIVE"
        },
        {
            "minValue": 0,
            "fieldName": "COCD_DESCRIPTION",
            "displayName": "ZAPEMPEXP",
            "maxValue": 0,
            "defaultValue": "Boy",
            "entityName": "ZAPEMPEXP",
            "dataType": "text",
            "entityId": 2,
            "type": "FNCF",
            "isMandatory": false,
            "fieldId": 7,
            "status": "ACTIVE"
        },
        {
            "minValue": 0,
            "fieldName": "VENDOR_ID",
            "displayName": "ZAPEMPEXP",
            "maxValue": 0,
            "defaultValue": 7,
            "entityName": "ZAPEMPEXP",
            "dataType": "number",
            "entityId": 2,
            "type": "FNCF",
            "isMandatory": false,
            "fieldId": 8,
            "status": "ACTIVE"
        },
        {
            "minValue": 0,
            "fieldName": "VENDOR_NAME",
            "displayName": "ZAPEMPEXP",
            "maxValue": 0,
            "defaultValue": "name",
            "entityName": "ZAPEMPEXP",
            "dataType": "text",
            "entityId": 2,
            "type": "FNCF",
            "isMandatory": false,
            "fieldId": 9,
            "status": "ACTIVE"
        }
    ]

    const loading = false

function DynamicTable({ entityId }) {
  const dispatch = useDispatch();
  // const { data, pageDetails, loading, error } = useSelector((state) => state.entity);
  const [selected, setSelected] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(50);
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('');
// snackbar state
  const [open, setOpen] = useState(false);


  // useEffect(() => {
  //   dispatch(fetchEntityData({ entityId, page, size: rowsPerPage, sortBy: orderBy, sortOrder: order }));
  // }, [dispatch, entityId, page, rowsPerPage, orderBy, order]);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
    console.log(`Sorting ${property} by ${isAsc ? 'desc' : 'asc'} order`);
    dispatch(fetchEntityData({ entityId:1, page, size: rowsPerPage, sortBy: "minvalue", sortOrder: order, body:{key:"123"} }));
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = data.map((n) => n.fieldId);
      setSelected(newSelecteds);
      console.log('Selected all:', newSelecteds);
      return;
    }
    setSelected([]);
    console.log('Cleared all selections');
  };

  const handleSelect = (event, id) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
      console.log(`Added ${id} to selection`);
    } else {
      newSelected = selected.filter((itemId) => itemId !== id);
      console.log(`Removed ${id} from selection`);
    }

    setSelected(newSelected);
  };


  const handleDownload = async () => {
    console.log('Downloading documents with IDs:', selected);
    if (selected.length === 1) {
      // Single download case
      try {
        const documentId = selected[0];
        const response = await getPresignedUrl('20', documentId);  // Assuming '20' is a placeholder for `entityName`
        console.log('Presigned URL:', response);
        // window.open(response.data.downloadLink, '_blank');  // Assuming `url` is the key where the presigned URL is returned
                   // Creating an anchor element and triggering download
                   const link = document.createElement('a');
                   link.href = response.data.downloadLink;
                   // You can set a specific filename here
                   link.download = "download.zip"; 
                   document.body.appendChild(link);
                   link.click();
                   document.body.removeChild(link);
      } catch (error) {
        console.error('Error fetching presigned URL:', error);
        alert('Failed to fetch download link.');
      }
    } else if (selected.length > 1) {
      // open snackbar
      console.log("Download started");
      setOpen(true);
      // Bulk download case
      dispatch(setDownloadNotification(true))
      try {
        const selectedIds =  [2,3,4]
        const response = await processBulkDownload('20', selectedIds);  // Assuming '20' is a placeholder for `entityName`
        console.log('Bulk download initiated:', response);
        // alert('Bulk download initiated. Check your downloads for the file.');
        dispatch(setDownloadNotification(true))

      } catch (error) {
        console.error('Error initiating bulk download:', error);
        alert('Failed to initiate bulk download.');
      }
    } else {
      alert('No documents selected for download.');
    }
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  const action = (
    <React.Fragment>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  );

 
  if (loading) return <p>Loading...</p>;
  // if (error) return <p>Error: {error}</p>;

    // If no data, return a message or null to avoid rendering the table
    if (!data || data.length === 0) {
      return loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
          <CircularProgress />
        </Box>
      ) : (
        <Typography variant="h6" align="center" sx={{ mt: 4 }}>
          No data available.
        </Typography>
      );
    }
  

  return (
    <>
    <PaperLayout >
       <Box display="flex" justifyContent="space-between" alignItems="flex-start" width="100%" >
      <Typography variant="body1" component="p" sx={{ flexGrow: 1 }}>
      <span style={{ color: 'red' }}>*</span>Top <strong>500</strong> records will be displayed
      </Typography>
       <Button
          startIcon={<DownloadIcon color={"white"} width={"12px"}  />}
          variant="contained"
          color="primary"
          onClick={handleDownload}
          disabled={selected.length === 0}
          // size={'small'}
          sx={{ m: '6px' }}
        >
          Download
        </Button>
    </Box>
    
    <TableContainer >
      <Table>
        <TableHead>
          <TableRow sx={{ backgroundColor: '#F8F8F8' }}>
            <TableCell padding="checkbox">
              <Checkbox
                indeterminate={selected.length > 0 && selected.length < data.length}
                checked={data.length > 0 && selected.length === data.length}
                onChange={handleSelectAllClick}
              />
            </TableCell>
            {data.length > 0 && Object.keys(data[0]).map((key) => (
              <TableCell
                key={key}
                align="left"
                sortDirection={orderBy === key ? order : false}
                sx={{
                  textTransform: 'none',  // This overrides the CSS to ensure text is not transformed
                  '&.MuiTableCell-root': { // This ensures your style has higher specificity
                    textTransform: 'none'  // Repeat to enforce the override
                  },
                  fontSize: '15px',
                  fontWeight:'700',
                  whiteSpace: 'nowrap',       // Prevents text from wrapping
                  overflow: 'hidden',         // Keeps the text in a single line, hidden overflow
                  textOverflow: 'ellipsis',   // Adds ellipsis if the text overflows
                  maxWidth: 160,              // You might need to adjust this based on your layout
                }}
              >
                <TableSortLabel
                  active={orderBy === key}
                  direction={orderBy === key ? order : 'asc'}
                  onClick={(event) => handleRequestSort(event, key)}
                
                >
                  {formatFieldName(key)}
                </TableSortLabel>
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row, index) => (
            <TableRow
              key={index}
              hover
              onClick={(event) => handleSelect(event, row.fieldId)}
              role="checkbox"
              aria-checked={selected.includes(row.fieldId)}
              selected={selected.includes(row.fieldId)}
            >
              <TableCell padding="checkbox">
                <Checkbox 
                checked={selected.includes(row.fieldId)}           
                sx={{
                    color: 'grey',
                    '&.Mui-checked': {
                      color: '#4a4a4a',
                    },
                    '&:hover': {
                      backgroundColor: 'rgba(74, 74, 74, 0.04)',
                    },
                  }} />
              </TableCell>
              {Object.entries(row).map(([key, value]) => (
                <TableCell sx={{fontWeight:'500', color:'#190134'}} key={`${key}-${index}`} align="left">{value}</TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>

    </TableContainer>
    <TablePagination
        rowsPerPageOptions={[]}
        component="div"
        count={data.length} // Adjust based on total records
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={(event, newPage) => setPage(newPage)}
        onRowsPerPageChange={(event) => setRowsPerPage(parseInt(event.target.value, 10))}
        sx={{
          '& .MuiIconButton-root': {
            color: 'primary.main', 
          },
        }}
      />
    </PaperLayout>
    <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
      >
        <Alert onClose={handleClose} variant="filled" severity="success" sx={{ width: '100%' }}>
          Download initiated! Check download page for status
        </Alert>
      </Snackbar>
    </>
  );
}

export default DynamicTable;
