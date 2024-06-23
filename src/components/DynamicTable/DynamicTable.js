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
} from '@mui/material';
import DownloadIcon from '../../assets/icons/DownloadIcon';
import { useDispatch, useSelector } from 'react-redux';
import { fetchEntityData } from '../../features/entities/searchSlice';

function DynamicTable({ entityId }) {
  const dispatch = useDispatch();
  const { data, pageDetails, loading, error } = useSelector((state) => state.entity);
  const [selected, setSelected] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(2);
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('');

  // useEffect(() => {
  //   dispatch(fetchEntityData({ entityId, page, size: rowsPerPage, sortBy: orderBy, sortOrder: order }));
  // }, [dispatch, entityId, page, rowsPerPage, orderBy, order]);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
    console.log(`Sorting ${property} by ${isAsc ? 'desc' : 'asc'} order`);
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

  const handleDownload = () => {
    alert('Download initiated for selected documents.');
    console.log('Downloading documents with IDs:', selected);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <TableContainer component={Paper}>
      <Box display="flex" justifyContent="flex-end" width="100%">
        <Button
          startIcon={<DownloadIcon color={"white"} width={"12px"}  />}
          variant="contained"
          color="primary"
          onClick={handleDownload}
          disabled={selected.length === 0}
          sx={{ m: 2 }}
        >
          Download
        </Button>
      </Box>
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
                sx={{ fontWeight: 'bold', fontSize: '1rem', textTransform:'lowercase' }}
              >
                <TableSortLabel
                  active={orderBy === key}
                  direction={orderBy === key ? order : 'asc'}
                  onClick={(event) => handleRequestSort(event, key)}
                >
                  {key.toUpperCase()}
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
                <Checkbox checked={selected.includes(row.fieldId)} />
              </TableCell>
              {Object.entries(row).map(([key, value]) => (
                <TableCell key={`${key}-${index}`} align="left">{value}</TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <TablePagination
        rowsPerPageOptions={[2, 4, 6]}
        component="div"
        count={data.length} // Adjust based on total records
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={(event, newPage) => setPage(newPage)}
        onRowsPerPageChange={(event) => setRowsPerPage(parseInt(event.target.value, 10))}
      />
    </TableContainer>
  );
}

export default DynamicTable;
