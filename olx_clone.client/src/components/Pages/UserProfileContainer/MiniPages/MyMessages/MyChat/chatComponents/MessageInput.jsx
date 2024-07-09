import React from 'react';
import { Box, TextField, IconButton } from '@mui/material';
import { Send, InsertEmoticon, Gif } from '@mui/icons-material';

const MessageInput = () => {
    return (
        <Box sx={{ display: 'flex', background: 'orange', alignItems: 'center', padding: '8px', borderTop: '1px solid #ddd' }}>
            
            <IconButton>
                <Gif />
            </IconButton>
            <IconButton>
                <InsertEmoticon />
            </IconButton>
            <TextField variant="outlined" placeholder="Введіть повідомлення" fullWidth sx={{ marginLeft: '8px', marginRight: '8px' }} />
            <IconButton>
                <Send />
            </IconButton>
        </Box>
    );
};

export default MessageInput;
