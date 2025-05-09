import React, { useEffect, useState } from 'react';
import { Grid, Paper, Typography, Box } from '@mui/material';
import SiteHeader from '../SiteHeader';
const Dashboard = () => {
    const [data,setData] = useState([{
        totalStudentCount: 0,
        totalStudentVaccinated: 0,
        totalVaccinatedPercentage : 0.0,
        drives: []
    }]);
    useEffect(()=>{
        loadData();
    });
    const loadData = ()=>{
        fetch('http://localhost:5285/api/Dashboard/dashboard',{
            method: 'GET',
          }) // adjust port if needed
          .then(response => response.json())
          .then(data => setData(data))
          .catch(error => console.error('Error fetching students:', error));
      };
   
      return (
        <div>
            <SiteHeader></SiteHeader>
            <Box sx={{ p: 4 }}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={4}>
              <Paper elevation={3} sx={{ p: 3 }}>
                <Typography variant="h6">No.of.Students</Typography>
                <Typography variant="h4">{data.totalStudentCount}</Typography>
              </Paper>
            </Grid>
            <Grid item xs={12} md={4}>
              <Paper elevation={3} sx={{ p: 3 }}>
                <Typography variant="h6">No.of.Vaccinated</Typography>
                <Typography variant="h4">{data.totalStudentVaccinated}</Typography>
              </Paper>
            </Grid>
            <Grid item xs={12} md={4}>
              <Paper elevation={3} sx={{ p: 3 }}>
                <Typography variant="h6">Total Vaccinated Percenatage(%)</Typography>
                <Typography variant="h4">{data.totalVaccinatedPercentage}</Typography>
              </Paper>
            </Grid>
            <Grid item xs={12} md={4}>
              <Paper elevation={3} sx={{ p: 3 }}>
                <Typography variant="h6">Upcoming Drives</Typography>
                <Typography variant="h4">{data.drives && data.drives.length}</Typography>
              </Paper>
            </Grid>
            <Grid item xs={12}>
              <Paper elevation={3} sx={{ p: 3 }}>
                <Typography variant="h6" gutterBottom>Upcoming Drives</Typography>
                {data.drives && data.drives.length === 0 ? (<div>No Upcoming Drive</div>):(
                     data.drives && data.drives.map((drive, index) => (
                        <Typography key={index}>• {drive.name} – {drive.date}</Typography>
                      ))
                )}
               
              </Paper>
            </Grid>
          </Grid>
        </Box>
        </div>
        
      );
};
export default Dashboard;