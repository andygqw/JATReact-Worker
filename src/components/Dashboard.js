import React, { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import axios from '../utils/api';
import { useNavigate } from 'react-router-dom';
import { Box, Typography, Alert } from '@mui/material';


function Dashboard() {

    const [applications, setApplications] = useState([]);
    const [error, setError] = useState(null);
    const navigate = useNavigate();


    useEffect(() => {

        const fetchApplications = async () => {

            try {

                const response = await axios.get('/applications');
                setApplications(response.data.results);
            } 
            catch (error) {
                if (error.response) {
                    
                    if (error.response.status === 401) {

                        setError('Unauthorized access. Please log in.');
                        navigate('/login');
                    } 
                    else if (error.response.status === 403) {

                        setError('Forbidden. You do not have permission to view this resource.');
                    } 
                    else if (error.response.status === 404) {

                        setError('Applications not found.');
                    }
                    else if (error.response.status === 500) {

                        setError(error.response);
                    } 
                    else {

                        setError('An unexpected error occurred.');
                    }
                } 
                else if (error.request) {
                
                    setError('No response from the server. Please try again later.');
                } 
                else {
                
                    setError('An error occurred while setting up the request.');
                }
            }
        };

        fetchApplications();
    }, [navigate]);

    const columns = [

        { field: 'jobTitle', headerName: 'Job Title', width: 150 },
        { field: 'company', headerName: 'Company', width: 150 },
        { field: 'location', headerName: 'Location', width: 150 },
        { field: 'status', headerName: 'Status', width: 110 },
        { field: 'appliedDate', headerName: 'Applied Date', width: 160 },
        { field: 'job_url', headerName: 'Job Link', width: 100, 
            renderCell: (params) => 
            <a href={params.value} target="_blank" rel="noopener noreferrer">
                Click here
            </a>
        },
        {
          field: 'edit',
          headerName: 'Edit',
          sortable: false,
          renderCell: (params) => (
            <button
              onClick={() => navigate(`/edit/${params.id}`)}
              style={{ cursor: 'pointer', color: 'blue', textDecoration: 'underline' }}
            >
              Edit
            </button>
          ),
          width: 100,
        },
    ];
    
    return (
        <Box sx={{ height: 400, width: '100%' }}>
            <Typography variant="h4" gutterBottom>
            Dashboard
            </Typography>
                {error && <Alert severity="error">{error}</Alert>}
            <DataGrid
                rows={applications}
                columns={columns}
                pageSize={5}
                rowsPerPageOptions={[5]}
                disableSelectionOnClick
            />
        </Box>
    );
}
    
export default Dashboard;