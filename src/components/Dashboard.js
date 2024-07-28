import React, { useEffect, useState } from 'react';
import axios from '../utils/api';
import { useNavigate } from 'react-router-dom';


function Dashboard() {

    const [applications, setApplications] = useState([]);

    useEffect(() => {

        const fetchApplications = async () => {
            try {

                const response = await axios.get('/applications');
                setApplications(response.data.results);
            } 
            catch (error) {
                alert('Fetching applications failed:', error);
            }
        };

        fetchApplications();
    }, []);

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