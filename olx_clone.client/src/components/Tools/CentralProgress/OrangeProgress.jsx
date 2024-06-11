import React from 'react';
import {Box, CircularProgress } from "@mui/material";

const OrangeProgress = () => {
    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100vh',
            }}
        >
            <CircularProgress sx={{ color: 'orange'}} />
        </Box>
    )
}

export default OrangeProgress;