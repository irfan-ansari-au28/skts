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
} from '@mui/material';

const response = {
  isSuccess: true,
  data: [
    {
      id: 1,
      name: 'Document A',
      date: '2022-01-01',
      status: 'Available',
      documentId: 'doc1',
    },
    {
      id: 2,
      name: 'Document B',
      date: '2022-01-02',
      status: 'Unavailable',
      documentId: 'doc2',
    },
    {
      id: 3,
      name: 'Document C',
      date: '2022-01-03',
      status: 'Available',
      documentId: 'doc3',
    },
    {
      id: 4,
      name: 'Document D',
      date: '2022-01-04',
      status: 'Processing',
      documentId: 'doc4',
    },
  ],
  errorDetails: {
    errorCode: 0,
    errorMessage: '',
  },
};

function DynamicTable({ entityId }) {
  const [data, setData] = useState([]);
  const [selected, setSelected] = useState([]);

  // Fetching data
  useEffect(() => {
    const fetchData = async () => {
      // const response = await fetch(`${BaseURL}/api/v1/entity/${entityId}/search`);
    //   const jsonData = await response.json();
      setData(response.data);
    };
    fetchData();
  }, [entityId]);

  // Handling selection
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
    // API call to download files based on the `selected` array
    // Example for multiple files download
    //   const response = await fetch(`${BaseURL}/api/v1/document/download/bulk`, {
    //     method: 'POST',
    //     body: JSON.stringify({ documentIds: selected }),
    //     headers: {
    //       'Content-Type': 'application/json'
    //     }
    //   });
    // const response = {
    //   isSuccess: true,
    //   resultData: {
    //     processId: 12345,
    //     message: 'Bulk download initiated. Use processId to check status.',
    //   },
    //   errorDetails: {
    //     errorCode: 0,
    //     errorMessage: '',
    //   },
    // };

    // const blob = await response.blob();
    // const url = window.URL.createObjectURL(blob);
    // const a = document.createElement('a');
    // a.href = url;
    // a.download = 'download.zip'; // Assuming the API returns a zip
    // a.click();
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      // Select all ids from the data to mark as selected
      const newSelecteds = data.map((n) => n.id);
      setSelected(newSelecteds);
      return;
    }
    // If not checked, clear the selection
    setSelected([]);
  };

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell padding="checkbox">
              <Checkbox
                indeterminate={
                  selected.length > 0 && selected.length < data.length
                }
                checked={data.length > 0 && selected.length === data.length}
                onChange={handleSelectAllClick}
              />
            </TableCell>
            <TableCell>ID</TableCell>
            <TableCell align="right">Name</TableCell>
            <TableCell align="right">Date</TableCell>
            <TableCell align="right">Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row) => (
            <TableRow
              key={row.id}
              hover
              onClick={(event) => handleSelect(event, row.id)}
              role="checkbox"
              aria-checked={selected.indexOf(row.id) !== -1}
              selected={selected.indexOf(row.id) !== -1}
            >
              <TableCell padding="checkbox">
                <Checkbox
                  checked={selected.indexOf(row.id) !== -1}
                  inputProps={{
                    'aria-labelledby': `enhanced-table-checkbox-${row.id}`,
                  }}
                />
              </TableCell>
              <TableCell component="th" scope="row">
                {row.id}
              </TableCell>
              <TableCell align="right">{row.name}</TableCell>
              <TableCell align="right">{row.date}</TableCell>
              <TableCell align="right">{row.status}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Button onClick={handleDownload} disabled={selected.length === 0}>
        Download
      </Button>
    </TableContainer>

    // <TableContainer component={Paper}>
    //   <Table>
    //     <TableHead>
    //       <TableRow>
    //         <TableCell padding="checkbox">
    //           <Checkbox
    //             indeterminate={
    //               selected.length > 0 && selected.length < data.length
    //             }
    //             checked={data.length > 0 && selected.length === data.length}
    //             onChange={(event) => handleSelectAllClick(event, data)}
    //           />
    //         </TableCell>
    //         <TableCell>ID</TableCell>
    //         <TableCell align="right">Name</TableCell>
    //         <TableCell align="right">Date</TableCell>
    //         <TableCell align="right">Status</TableCell>
    //       </TableRow>
    //     </TableHead>
    //     <TableBody>
    //       {data.map((row) => (
    //         <TableRow key={row.id} selected={selected.indexOf(row.id) !== -1}>
    //           <TableCell padding="checkbox">
    //             <Checkbox
    //               checked={selected.indexOf(row.id) !== -1}
    //               onChange={(event) => handleSelect(event, row.id)}
    //             />
    //           </TableCell>
    //           <TableCell component="th" scope="row">
    //             {row.id}
    //           </TableCell>
    //           <TableCell align="right">{row.name}</TableCell>
    //           <TableCell align="right">{row.date}</TableCell>
    //           <TableCell align="right">{row.status}</TableCell>
    //         </TableRow>
    //       ))}
    //     </TableBody>
    //   </Table>
    //   <Button onClick={handleDownload} disabled={selected.length === 0}>
    //     Download
    //   </Button>
    // </TableContainer>
  );
}

export default DynamicTable
