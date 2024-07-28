import React, { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import axios from '../utils/api';
import { useNavigate } from 'react-router-dom';
import { Box, Typography, Alert, Button, Dialog, 
    DialogActions, DialogContent, DialogTitle, 
    TextField, Select, MenuItem, FormControl, 
    InputLabel, Checkbox, FormControlLabel  } from '@mui/material';



const STATUS_OPTIONS = ['Applied', 'Viewed', 'Rejected', 'Gave up', 'Interviewing', 'Expired', 'Saved'];

function getFormattedDate() {
    const date = new Date();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}

function Dashboard() {

    const [applications, setApplications] = useState([]);
    const [open, setOpen] = useState(false);
    const [currentApplication, setCurrentApplication] = useState(null);
    const [isEditMode, setIsEditMode] = useState(false);
    const navigate = useNavigate();
    const [error, setError] = useState(null);
    const [validationError, setValidationError] = useState('');


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
                        navigate('/login');
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

    const handleOpen = (application) => {

        setCurrentApplication(application);
        setIsEditMode(true);
        setOpen(true);
    };
    
    const handleAddOpen = () => {

        setCurrentApplication({
            user_id: '',
            job_title: '',
            company_name: '',
            job_description: '',
            job_location: '',
            job_url: '',
            application_deadline_date: '',
            application_date: getFormattedDate(),
            resume_version: '',
            status: STATUS_OPTIONS[0],
            notes: '',
            is_marked: false,
        });
        setIsEditMode(false);
        setOpen(true);
    };
    
    const handleClose = () => {

        setOpen(false);
        setCurrentApplication(null);
    };
    
    const handleChange = (e) => {

        const { name, value } = e.target;
        setCurrentApplication((prevApplication) => ({ ...prevApplication, [name]: value }));
    };
    
    const handleSubmit = async () => {

        if (!currentApplication.job_title || !currentApplication.company_name || !currentApplication.status) {
            setValidationError('Job Title, Company Name, and Status are required.');
            return;
        }

        try {
            if (isEditMode) {
                await axios.post(`/applications/edit`, currentApplication);
                setApplications((prevApplications) =>
                    prevApplications.map((app) =>
                        app.id === currentApplication.id ? currentApplication : app
                    )
                );
            }
            else {

                const response = await axios.post('/applications/add', currentApplication);
                if (response.status === 200){

                    const newApplication = { ...currentApplication, id: response.data.id };
                    setApplications((prevApplications) => [newApplication, ...prevApplications]);
                    // To add at the end, use:
                    // setApplications((prevApplications) => [...prevApplications, newApplication]);
                    // To insert at a specific index (e.g., index 1), use:
                    // const index = 1;
                    // setApplications((prevApplications) => [
                    //   ...prevApplications.slice(0, index),
                    //   newApplication,
                    //   ...prevApplications.slice(index),
                    // ]);
                }
                else{

                    throw new Error('Failed to save job application.');
                }
            }
            handleClose();
        } 
        catch (error) {

            setError(error.response?.data?.message);
        }
    };

    const columns = [

        { field: 'job_title', headerName: 'Job Title', flex: 0.3},
        { field: 'company_name', headerName: 'Company', flex: 0.1 },
        { field: 'job_location', headerName: 'Location', flex: 0.2 },
        { field: 'status', headerName: 'Status', flex: 0.1 },
        { field: 'application_date', headerName: 'Applied Date', flex: 0.1 },
        {
            field: 'job_url',
            headerName: 'Job Link',
            flex: 0.1,
            renderCell: (params) => (
              params.value ? <a href={params.value} target="_blank" rel="noopener noreferrer">Click here</a> : ''
            ),
        },
        {
            field: 'edit',
            headerName: 'Edit',
            sortable: false,
            renderCell: (params) => (
                <Button
                    onClick={() => handleOpen(params.row)}
                    variant="contained"
                    color="primary"
                >
                Edit
                </Button>
            ),
                flex: 0.1,
            },
    ];
    
    return (
        <Box sx={{ height: '100vh', width: '100%' }}>
            <Typography variant="h4" gutterBottom>
            Dashboard
            </Typography>
            <Button
                onClick={handleAddOpen}
                variant="contained"
                color="secondary"
                style={{ marginBottom: '20px' }}
            >
                Add Job
            </Button>
            {error && <Alert severity="error">{error}</Alert>}
            <DataGrid
                rows={applications}
                columns={columns}
                pageSize={5}
                rowsPerPageOptions={[5]}
                autoHeight
                disableSelectionOnClick
                onRowClick={(params) => handleOpen(params.row)}
            />
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>{isEditMode ? 'Edit Job Application' : 'Add Job Application'}</DialogTitle>
                <DialogContent>
                {validationError && <Alert severity="error">{validationError}</Alert>}
                <TextField
                    label="Job Title"
                    name="job_title"
                    value={currentApplication?.job_title || ''}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                    required
                />
                <TextField
                    label="Company Name"
                    name="company_name"
                    value={currentApplication?.company_name || ''}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                    required
                />
                <TextField
                    label="Job Location"
                    name="job_location"
                    value={currentApplication?.job_location || ''}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                />
                <TextField
                    label="Job Description"
                    name="job_description"
                    value={currentApplication?.job_description || ''}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                    multiline
                    rows={4}
                />
                <TextField
                    label="Job URL"
                    name="job_url"
                    value={currentApplication?.job_url || ''}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                />
                <TextField
                    label="Application Date"
                    name="application_date"
                    type="date"
                    value={currentApplication?.application_date || ''}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                    InputLabelProps={{ shrink: true }}
                    required
                />
                <TextField
                    label="Application Deadline Date"
                    name="application_deadline_date"
                    type="date"
                    value={currentApplication?.application_deadline_date || ''}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                    InputLabelProps={{ shrink: true }}
                />
                <TextField
                    label="Resume Version"
                    name="resume_version"
                    value={currentApplication?.resume_version || ''}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                />
                <FormControl fullWidth margin="normal">
                    <InputLabel>Status</InputLabel>
                    <Select
                        name="status"
                        value={currentApplication?.status || ''}
                        onChange={handleChange}
                        required
                        >
                        {STATUS_OPTIONS.map((status) => (
                            <MenuItem key={status} value={status}>
                            {status}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <TextField
                    label="Notes"
                    name="notes"
                    value={currentApplication?.notes || ''}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                    multiline
                    rows={4}
                />
                <FormControlLabel
                    control={
                    <Checkbox
                        name="is_marked"
                        checked={currentApplication?.is_marked || false}
                        onChange={(e) => setCurrentApplication((prevApplication) => ({ ...prevApplication, is_marked: e.target.checked }))}
                    />
                    }
                    label="Is Marked"
                />
                </DialogContent>
                <DialogActions>
                <Button onClick={handleClose} color="secondary">
                    Cancel
                </Button>
                <Button onClick={handleSubmit} color="primary">
                    Submit
                </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
}
    
export default Dashboard;