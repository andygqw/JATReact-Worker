import React, { useEffect, useState } from 'react';
import axios from '../utils/api';
import { useNavigate } from 'react-router-dom';


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

    return (

        <div>
            <h2>Dashboard</h2>
            <ul>
                {applications.map((app) => (
                    <li key={app.id}>{app.job_title}</li>
                ))}
            </ul>
        </div>
    );
}

export default Dashboard;