import React from 'react';
import { Box, Typography } from '@mui/material';
import Message from './Message';

const MessageWithDate = ({ message, showDate, isSentByUser }) => {
    return (
        <>
            {showDate && (
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '10px', margin: '10px 0' }}>
                    <Typography variant="body2" color="textSecondary">{message.createdAt}</Typography>
                </Box>
            )}
            <Message message={message} isSentByUser={isSentByUser}/>
        </>
    );
};

export default MessageWithDate;
