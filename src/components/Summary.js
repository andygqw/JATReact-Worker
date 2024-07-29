import React from 'react';
import { Box, Typography } from '@mui/material';

function Summary({ applications }) {
    const total = applications.length;
    const rejectedCount = applications.filter(app => app.status === 'Rejected').length;
    const rejectedRate = total > 0 ? ((rejectedCount / total) * 100).toFixed(2) : 0;

    return (
        <Box sx={{ display: 'flex', alignItems: 'center', padding: 2 }}>
            <Typography variant="body1" component="div" sx={{ marginRight: 2 }}>
                Total: {total} applications
            </Typography>
            <Typography variant="body1" component="div" sx={{ marginRight: 2 }}>
                Rejected: {rejectedCount}
            </Typography>
            <Typography variant="body1" component="div">
                Rejection Rate: {rejectedRate}%
            </Typography>
        </Box>
    );
}

export default Summary;