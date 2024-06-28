import React, { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Link,
  TablePagination,
} from '@mui/material';
import { useSelector } from 'react-redux';
import { getPresignedUrl } from '../../api/apiService';

const sampleData = [
  { date: '12/12/2001', status: 'Open', link: '#', id: 1 },
  { date: '12/12/2001', status: 'Open', link: '#', id: 2 },
  { date: '12/12/2001', status: 'Completed', link: '#', id: 3 },
  { date: '12/12/2001', status: 'Completed', link: '#', id: 4 },
  { date: '12/12/2001', status: 'Completed', link: '#', id: 5 },
  { date: '12/12/2001', status: 'Completed', link: '#', id: 6 },
  { date: '12/12/2001', status: 'Completed', link: '#', id: 7 },
  { date: '12/12/2001', status: 'Completed', link: '#', id: 8 },
  { date: '12/12/2001', status: 'Completed', link: '#', id: 9 },
  { date: '12/12/2001', status: 'Completed', link: '#', id: 10 },
];

const columns = [
  { id: 'date', label: 'Request Date', minWidth: 170 },
  { id: 'status', label: 'Status', minWidth: 100 },
  { id: 'link', label: 'Download Link', minWidth: 170 },
];

function formatDate(dateString) {
  const date = new Date(dateString);
  return `${date.getDate().toString().padStart(2, '0')}/${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getFullYear()}`;
}

function StatusTable() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const { statusData, status, error } = useSelector((state) => state.downloads);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleDownloadClick = async (url) => {
    console.log(url,'url')
    const id = 20
    if (url) {
      const presignedUrlData = await getPresignedUrl(url,id);
      console.log(presignedUrlData)
      window.open(presignedUrlData.data.downloadLink, '_blank');
    }
  };

  return (
    <>
      <TableContainer component={Paper}>
        <Table
          sx={{
            '& .MuiTableCell-root': {
              fontSize: '14px',
              fontWeight: 500,
              color: '#190134',
            },
          }}
        >
          <TableHead>
            <TableRow sx={{ backgroundColor: '#F8F8F8' }}>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{
                    minWidth: column.minWidth,
                    fontWeight: 'bold',
                    fontSize: '1rem',
                  }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {statusData
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => (
                <TableRow key={row.id}>
                  <TableCell>{formatDate(row.createdOn)}</TableCell>
                  <TableCell>{row.status}</TableCell>
                  <TableCell>
                    {/* <Link
                      href={row.link || '#'}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Link
                    </Link> */}
                    {row.status === 'Completed' ? (
                      <Link
                        component="button"
                        variant="body2"
                        onClick={() => handleDownloadClick(row.downlloadLink)}
                      >
                        Download
                      </Link>
                    ) : (
                      'Unavailable'
                    )}
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[]}
        component="div"
        count={sampleData.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        sx={{
          '& .MuiIconButton-root': {
            color: 'primary.main',
          },
        }}
      />
    </>
  );
}

export default StatusTable;
