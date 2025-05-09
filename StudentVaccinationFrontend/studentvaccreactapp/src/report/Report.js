import React, { useEffect, useState } from 'react';
import { DataGrid, GridToolbarFilterButton, GridToolbarQuickFilter, GridToolbarExport } from '@mui/x-data-grid';
import { Box, Typography } from '@mui/material';
import { utils, writeFile } from 'xlsx';
import { type } from '@testing-library/user-event/dist/type';
import SiteHeader from '../SiteHeader';

export default function Report() {
const [rows,setRows] = useState([{
    id : 0,
    studentName : '',
    vaccinationName : '',
    isVaccinated : '',
    dateVaccinated : ''
}]);
const columns = [
 { field: 'id', headerName: 'Id', type : 'number', width: 90 },
  { field: 'studentName', headerName: 'Student Name', width: 200 },
  { field: 'vaccinationName', headerName: 'Vaccination Name', width: 200, filterable: true },
  { field: 'isVaccinated', headerName: 'Status', width: 110 },
  { field: 'vaccinatedDate', headerName: 'Date Vaccinated', width: 150 },
];


function exportToCSV() {
    const worksheet = utils.json_to_sheet(rows);
    const workbook = utils.book_new();
    utils.book_append_sheet(workbook, worksheet, 'Data');
    writeFile(workbook, 'Report_Export.csv');
  }
  const loadData = ()=>{
    fetch('http://localhost:5285/api/Student/Report',{
        method: 'GET',
      }) // adjust port if needed
      .then(response => response.json())
      .then(data => setRows(data))
      .catch(error => console.error('Error fetching students:', error));
  };

useEffect(() => {
    loadData();
  }, []);


  
  return (
    <div>
        <SiteHeader></SiteHeader>
          <button onClick={exportToCSV} style={{ width:'100px',marginLeft: '0.5rem', float:'right' }}>Export</button>
    <Box sx={{ height: 450, width: '100%', p: 2 }}>
  
      <Typography variant="h5" gutterBottom>
        Report Management
      </Typography>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        checkboxSelection
        disableSelectionOnClick
      />
    </Box>
    </div>
  );
}
