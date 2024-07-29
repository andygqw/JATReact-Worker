import React, { useEffect, useState } from 'react';
import { DataGrid, GridToolbarContainer, GridToolbarExport, GridToolbarDensitySelector } from '@mui/x-data-grid';
import axios from '../utils/api';
import { useNavigate } from 'react-router-dom';
import { Box, Typography, Alert, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Select, MenuItem, FormControl, InputLabel, Checkbox, FormControlLabel } from '@mui/material';
import './Dashboard.css';

import { getFormattedDate } from '../utils/Helper.js';

const STATUS_OPTIONS = ['Applied', 'Viewed', 'Rejected', 'Gave up', 'Interviewing', 'Expired', 'Saved'];


function Dashboard() {
    const [applications, setApplications] = useState([]);
    const [open, setOpen] = useState(false);
    const [currentApplication, setCurrentApplication] = useState(null);
    const [isEditMode, setIsEditMode] = useState(false);
    const navigate = useNavigate();

    const [quickAddOpen, setQuickAddOpen] = useState(false);
    const [quickAddUrl, setQuickAddUrl] = useState('');

    const [error, setError] = useState(null);
    const [validationError, setValidationError] = useState('');
    const [deleteOpen, setDeleteOpen] = useState(false);
    const [applicationToDelete, setApplicationToDelete] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchApplications = async () => {
            setLoading(true);
            try {
                const response = await axios.get('/applications');
                if (response.status === 401 || response.status === 500) {
                    navigate('/login');
                } else {
                    setApplications(response.data.results);
                }
            } catch (error) {
                setError(error.message);
                navigate('/login');
            } finally {
                setLoading(false);
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
        setValidationError('');
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
            setLoading(true);
            if (isEditMode) {
                const response = await axios.post(`/applications/edit`, currentApplication,
                    {
                        validateStatus: function (status) {
                            return status >= 200 && status <= 500;
                        }
                    }
                );
                if (response.status === 200){

                    setApplications((prevApplications) =>
                        prevApplications.map((app) =>
                            app.id === currentApplication.id ? currentApplication : app
                        )
                    );
                }
                else {
                    throw new Error(response.data.error);
                }
            } else {
                const response = await axios.post('/applications/add', currentApplication,
                    {
                        validateStatus: function (status) {
                            return status >= 200 && status <= 500;
                        }
                    }
                );
                if (response.status === 200) {

                    const newApplication = { ...currentApplication, id: response.data.id };
                    setApplications((prevApplications) => [newApplication, ...prevApplications]);
                } else {

                    throw new Error(response.data.error);
                }
            }
        }
        catch (error) {
            setError(error.message);
        }
        finally {
            handleClose();
            setLoading(false);
        }
    };

    const handleQuickAddOpen = () => {
        setQuickAddUrl('');
        setQuickAddOpen(true);
    };

    const handleQuickAddClose = () => {
        setQuickAddOpen(false);
        setQuickAddUrl('');
    };

    const handleQuickAddChange = (e) => {
        setQuickAddUrl(e.target.value);
    };

    const handleQuickAddSubmit = async () => {

        if (!quickAddUrl) {
            setValidationError('URL is required.');
            return;
        }

        try {

            setLoading(true);
            const response = await axios.post('/applications/quickadd',
                { url: quickAddUrl, date: getFormattedDate() },
                {
                    validateStatus: function (status) {
                        return status >= 200 && status <= 500;
                    }
                });
            if (response.status === 200) {

                const newApplication = { ...response.data.application };
                setApplications((prevApplications) => [newApplication, ...prevApplications]);
            }
            else {
                throw new Error(response.data.error);
            }
        }
        catch (error) {

            setError(error.message);
        }
        finally {
            handleQuickAddClose();
            setLoading(false);
        }
    };

    const handleDeleteOpen = (id) => {
        setApplicationToDelete(id);
        setDeleteOpen(true);
    };

    const handleDeleteClose = () => {
        setDeleteOpen(false);
        setApplicationToDelete(null);
    };

    const handleDeleteConfirm = async () => {
        try {
            setLoading(true);
            await axios.post('/applications/delete', { application_id: [applicationToDelete] });
            setApplications((prevApplications) => prevApplications.filter((app) => app.id !== applicationToDelete));
            handleDeleteClose();
        } catch (error) {
            setError('Failed to delete job application.');
            handleDeleteClose();
        } finally {
            setLoading(false);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };

    const columns = [
        { field: 'job_title', headerName: 'Job Title', flex: 0.2, sortable: true, filterable: true, editable: false },
        { field: 'company_name', headerName: 'Company', flex: 0.2, sortable: true, filterable: true, editable: false },
        { field: 'job_location', headerName: 'Location', flex: 0.2, sortable: true, filterable: true, editable: false },
        { field: 'status', headerName: 'Status', flex: 0.1, sortable: true, filterable: true, editable: false },
        { field: 'application_date', headerName: 'Applied Date', flex: 0.1, sortable: true, filterable: true, editable: false },
        {
            field: 'job_url',
            headerName: 'Job Link',
            flex: 0.1,
            sortable: false,
            filterable: false,
            editable: false,
            disableColumnMenu: true,
            renderCell: (params) => (
                params.value ? <a href={params.value} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()}>Click here</a> : ''
            ),
        },
        {
            field: 'actions',
            headerName: 'Actions',
            flex: 0.1,
            sortable: false,
            filterable: false,
            editable: false,
            disableColumnMenu: true,
            renderCell: (params) => (
                <Button
                    onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteOpen(params.row.id);
                    }}
                    variant="contained"
                    color="primary"
                >
                    Delete
                </Button>
            ),
        },
    ];

    function CustomToolbar() {
        return (
            <GridToolbarContainer>
                <GridToolbarDensitySelector slotProps={{ tooltip: { title: 'Change density' } }} />
                <Box sx={{ flexGrow: 1 }} />
                <GridToolbarExport
                    printOptions={{ disableToolbarButton: true }}
                    slotProps={{
                        tooltip: { title: 'Export data' },
                        button: { variant: 'outlined' }
                    }}
                />
            </GridToolbarContainer>
        );
    }

    return (
        <Box sx={{ padding: 4 }}>
            <Box sx={{ height: '100vh', width: '100%' }}>
                <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                    <Typography variant="h4" component="h1" fontWeight="bold">
                        Dashboard
                    </Typography>
                    <Button
                        onClick={handleLogout}
                        variant="contained"
                        sx={{ backgroundColor: '#6c757d', color: '#fff', '&:hover': { backgroundColor: '#5a6268' } }}
                    >
                        Logout
                    </Button>
                </Box>
                <Box display="flex" gap={2} mb={2}>
                    <Button
                        onClick={handleAddOpen}
                        variant="contained"
                        color="secondary"
                    >
                        Add Job
                    </Button>
                    <Button
                        onClick={handleQuickAddOpen}
                        variant="contained"
                        color="primary"
                    >
                        Quick Add
                    </Button>
                </Box>
                {error && <Alert severity="error" sx={{ marginBottom: 2 }}>{error}</Alert>}
                <DataGrid
                    rows={applications}
                    columns={columns}
                    pageSize={50}
                    rowsPerPageOptions={[50]}
                    autoHeight
                    disableSelectionOnClick
                    onRowClick={(params) => handleOpen(params.row)}
                    loading={loading}
                    slots={{
                        toolbar: CustomToolbar,
                    }}
                    hideFooterRowCount={true}
                    hideFooterSelectedRowCount={true}
                    getRowClassName={(params) => {
                        const job = params.row;
                        if (job.status === 'Rejected' || job.status === 'Gave up') {
                            return 'row-rejected';
                        } else if (job.is_marked === 1) {
                            return 'row-highlighted';
                        } else if (job.status === 'Viewed') {
                            return 'row-viewed';
                        } else if (job.status === 'Saved') {
                            return 'row-saved';
                        } else {
                            return '';
                        }
                    }}
                />
                <Dialog open={quickAddOpen} onClose={handleQuickAddClose}>
                    <DialogTitle>Quick Add</DialogTitle>
                    <DialogContent>
                        <Typography variant="body2" color="textSecondary" sx={{ marginBottom: 2 }}>
                            This feature currently supports LinkedIn jobs only.
                        </Typography>
                        {validationError && <Alert severity="error" sx={{ marginBottom: 2 }}>{validationError}</Alert>}
                        <TextField
                            label="Job URL"
                            name="url"
                            value={quickAddUrl}
                            onChange={handleQuickAddChange}
                            fullWidth
                            margin="normal"
                            required
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleQuickAddClose} color="secondary">
                            Cancel
                        </Button>
                        <Button onClick={handleQuickAddSubmit} color="primary">
                            Quick Add
                        </Button>
                    </DialogActions>
                </Dialog>
                <Dialog open={deleteOpen} onClose={handleDeleteClose}>
                    <DialogTitle>Confirm Delete</DialogTitle>
                    <DialogContent>
                        <Typography>Are you sure you want to delete this application?</Typography>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleDeleteClose} color="secondary">
                            Cancel
                        </Button>
                        <Button onClick={handleDeleteConfirm} color="primary">
                            Delete
                        </Button>
                    </DialogActions>
                </Dialog>
                <Dialog open={open} onClose={handleClose}>
                    <DialogTitle>{isEditMode ? 'Edit Job Application' : 'Add Job Application'}</DialogTitle>
                    <DialogContent>
                        {validationError && <Alert severity="error" sx={{ marginBottom: 2 }}>{validationError}</Alert>}
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
                                    onChange={(e) => setCurrentApplication((prevApplication) => ({ ...prevApplication, is_marked: Number(e.target.checked) }))}
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
        </Box>
    );
}

export default Dashboard;