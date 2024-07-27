import React, { useEffect, useState } from 'react';
import axios from '../utils/api';

function Dashboard() {

    const [applications, setApplications] = useState([]);

    useEffect(() => {

        const fetchApplications = async () => {
            try {

                const response = await axios.get('/applications');
                setApplications(response.data.results);
            } 
            catch (error) {
                console.error('Fetching applications failed:', error);
            }
        };

        fetchApplications();
    }, []);

    return (

        <div>
            <h2>Dashboard</h2>
            <ul>
                {applications.map((app) => (
                    <li key={app.id}>{app.jobTitle}</li>
                ))}
            </ul>
        </div>
    );
}

export default Dashboard;