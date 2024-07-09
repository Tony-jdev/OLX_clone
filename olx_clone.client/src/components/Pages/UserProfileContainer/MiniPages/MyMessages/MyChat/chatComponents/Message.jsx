import React from 'react';
import { Box, Typography } from '@mui/material';

const Message = ({ message }) => {
    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: message.isSentByUser ? 'flex-end' : 'flex-start', marginBottom: '16px' }}>
            <Box sx={{
                backgroundColor: message.isSentByUser ? 'orange' : '#f5e5d5',
                color: message.isSentByUser ? '#fff' : '#000',
                padding: '12px',
                borderRadius: '10px',
                maxWidth: '60%'
            }}>
                <Typography variant="body1">{message.text}</Typography>
            </Box>
            <Typography variant="body2" sx={{ marginTop: '4px', color: '#888' }}>{message.time}</Typography>
        </Box>
    );
};

export default Message;
