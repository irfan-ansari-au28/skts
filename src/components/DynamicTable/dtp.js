// import React, { useEffect, useState } from 'react';
// import {
//   Checkbox,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Paper,
//   Button,
//   TableSortLabel,
//   TablePagination,
//   Box,
// } from '@mui/material';
// import DownloadIcon from '../../assets/icons/DownloadIcon';
// import { useDispatch, useSelector } from 'react-redux';
// import { fetchEntityData } from '../../features/entities/searchSlice';

// const bodyData = { key1: "value1", key2: "value2" };

// function DynamicTable({ entityId, response }) {
//   // const [data, setData] = useState([]);
//   const [selected, setSelected] = useState([]);
//   const [page, setPage] = useState(0);
//   const [rowsPerPage, setRowsPerPage] = useState(2);
//   const [order, setOrder] = useState('asc');
//   const [orderBy, setOrderBy] = useState('name');

//   const dispatch = useDispatch();
//   const { formData } = useSelector(state => state.entities);
//   const { data, pageDetails, loading, error } = useSelector(state => state.entity);

//   // useEffect(() => {
//   //   const fetchData = async () => {
//   //     if(entities){
//   //       dispatch(fetchEntityData({ entityId:1, page: 0, size: 50 , body: entities.formData}));
//   //     }
//   //     console.log('API Call sorting');
//   //     setData(response.data);
//   //   };
//   //   fetchData();
//   // }, [entityId, dispatch]);

//   const handleRequestSort = (event, property) => {
//     console.log(property);
//     const isAsc = orderBy === property && order === 'asc';
//     setOrder(isAsc ? 'desc' : 'asc');
//     if(formData){

//       dispatch(fetchEntityData({ entityId, page, size: rowsPerPage, sortBy: property, sortOrder:isAsc ? 'desc' : 'asc', body:formData}));
//     }
//     setOrderBy(property);
//   };

//   const handleSelectAllClick = (event) => {
//     if (event.target.checked) {
//       const newSelecteds = data.map((n) => n.id);
//       setSelected(newSelecteds);
//       return;
//     }
//     setSelected([]);
//   };

//   const handleSelect = (event, id) => {
//     const selectedIndex = selected.indexOf(id);
//     let newSelected = [];

//     if (selectedIndex === -1) {
//       newSelected = newSelected.concat(selected, id);
//     } else if (selectedIndex === 0) {
//       newSelected = newSelected.concat(selected.slice(1));
//     } else if (selectedIndex === selected.length - 1) {
//       newSelected = newSelected.concat(selected.slice(0, -1));
//     } else if (selectedIndex > 0) {
//       newSelected = newSelected.concat(
//         selected.slice(0, selectedIndex),
//         selected.slice(selectedIndex + 1)
//       );
//     }

//     setSelected(newSelected);
//   };

//   const handleDownload = async () => {
//     // This is a placeholder function; you need to implement actual download logic
//     alert('Download initiated for selected documents.');
//   };

//   if (response?.data?.length === 0) return <p>No content to preview</p>;
//   return (
//     <TableContainer component={Paper}>
//       <Box display="flex" justifyContent="flex-end">
//         <Button
//           startIcon={<DownloadIcon color={'white'} width={'12px'} />}
//           variant="contained"
//           color="primary"
//           onClick={handleDownload}
//           disabled={selected.length === 0}
//           sx={{ m: 2 }}
//         >
//           Download
//         </Button>
//       </Box>
//       <Table>
//         <TableHead>
//           <TableRow sx={{ backgroundColor: '#F8F8F8' }}>
//             <TableCell padding="checkbox">
//               <Checkbox
//                 indeterminate={
//                   selected.length > 0 && selected.length < data.length
//                 }
//                 checked={data.length > 0 && selected.length === data.length}
//                 onChange={handleSelectAllClick}
//               />
//             </TableCell>
//             {['id', 'name', 'date', 'status'].map((headCell) => (
//               <TableCell
//                 key={headCell}
//                 align="left"
//                 sortDirection={orderBy === headCell ? order : false}
//                 sx={{
//                   fontWeight: 'bold',
//                   fontSize: '1rem',
//                 }}
//               >
//                 <TableSortLabel
//                   active={orderBy === headCell}
//                   direction={orderBy === headCell ? order : 'asc'}
//                   onClick={(event) => handleRequestSort(event, headCell)}
//                 >
//                   {headCell.charAt(0).toUpperCase() + headCell.slice(1)}
//                 </TableSortLabel>
//               </TableCell>
//             ))}
//           </TableRow>
//         </TableHead>
//         <TableBody>
//           {data.map((row) => (
//             <TableRow
//               key={row.id}
//               hover
//               onClick={(event) => handleSelect(event, row.id)}
//               role="checkbox"
//               aria-checked={selected.indexOf(row.id) !== -1}
//               selected={selected.indexOf(row.id) !== -1}
//             >
//               <TableCell padding="checkbox">
//                 <Checkbox
//                   sx={{
//                     color: 'grey',
//                     '&.Mui-checked': {
//                       color: '#4a4a4a',
//                     },
//                     '&:hover': {
//                       backgroundColor: 'rgba(74, 74, 74, 0.04)',
//                     },
//                   }}
//                   checked={selected.indexOf(row.id) !== -1}
//                 />
//               </TableCell>
//               {Object.entries(row).map(([key, value]) => {
//                 // Exclude certain keys if necessary
//                 if (['id', 'name', 'date', 'status'].includes(key)) {
//                   return (
//                     <TableCell key={key} align="left">
//                       {value}
//                     </TableCell>
//                   );
//                 }
//                 return null;
//               })}
//             </TableRow>
//           ))}
//         </TableBody>
//       </Table>
//       <TablePagination
//         rowsPerPageOptions={[2, 4, 6]}
//         component="div"
//         count={-1} // You might need to adjust this based on total records from the API
//         rowsPerPage={rowsPerPage}
//         page={page}
//         onPageChange={(event, newPage) => setPage(newPage)}
//         onRowsPerPageChange={(event) =>
//           setRowsPerPage(parseInt(event.target.value, 10))
//         }
//       />
//     </TableContainer>
//   );
// }

// export default DynamicTable;





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

const bodyData = { key1: 'value1', key2: 'value2' };

function DynamicTable({ entityId, response }) {
  // const [data, setData] = useState([]);
  const [selected, setSelected] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(2);
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('name');

  const dispatch = useDispatch();
  const { formData } = useSelector((state) => state.entities);
  const { data, pageDetails, loading, error } = useSelector(
    (state) => state.entity
  );

  // Determine column headers from the data dynamically
  const headers = data.length > 0 ? Object.keys(data[0]) : [];

  const handleRequestSort = (event, property) => {
    console.log(property);
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    if (formData) {
      dispatch(
        fetchEntityData({
          entityId,
          page,
          size: rowsPerPage,
          sortBy: property,
          sortOrder: isAsc ? 'desc' : 'asc',
          body: formData,
        })
      );
    }
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = data.map((n) => n.id);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleSelect = (event, id) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    setSelected(newSelected);
  };

  const handleDownload = async () => {
    // This is a placeholder function; you need to implement actual download logic
    alert('Download initiated for selected documents.');
  };

  if (response?.data?.length === 0) return <p>No content to preview</p>;
  return (
    <TableContainer component={Paper}>
      <Box display="flex" justifyContent="flex-end">
        <Button
          startIcon={<DownloadIcon color={'white'} width={'12px'} />}
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
          <TableRow>
            <TableCell padding="checkbox">
              <Checkbox
                indeterminate={selected.length > 0 && selected.length < data.length}
                checked={data.length > 0 && selected.length === data.length}
                onChange={handleSelectAllClick}
              />
            </TableCell>
            {headers.map((header) => (
              <TableCell
                key={header}
                align="left"
                sortDirection={orderBy === header ? order : false}
                sx={{ fontWeight: 'bold', fontSize: '1rem' }}
              >
                <TableSortLabel
                  active={orderBy === header}
                  direction={orderBy === header ? order : 'asc'}
                  onClick={(event) => handleRequestSort(event, header)}
                >
                  {header.charAt(0).toUpperCase() + header.slice(1)}
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
              onClick={(event) => handleSelect(event, row.id)}
              role="checkbox"
              aria-checked={selected.indexOf(row.id) !== -1}
              selected={selected.indexOf(row.id) !== -1}
            >
              <TableCell padding="checkbox">
                <Checkbox checked={selected.indexOf(row.id) !== -1} />
              </TableCell>
              {headers.map((header) => (
                <TableCell key={`${header}-${index}`} align="left">
                  {row[header]}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <TablePagination
        rowsPerPageOptions={[2, 4, 6]}
        component="div"
        count={-1} // You might need to adjust this based on total records from the API
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={(event, newPage) => setPage(newPage)}
        onRowsPerPageChange={(event) =>
          setRowsPerPage(parseInt(event.target.value, 10))
        }
      />
    </TableContainer>
  );
}

export default DynamicTable;
