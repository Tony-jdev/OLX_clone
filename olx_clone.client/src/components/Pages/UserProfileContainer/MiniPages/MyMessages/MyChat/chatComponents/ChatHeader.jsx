import React from 'react';
import { Box, Typography, Avatar, IconButton } from '@mui/material';
import { Delete, Bookmark } from '@mui/icons-material';

const ChatHeader = ({ user }) => {
    return (
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px', backgroundColor: '#fff', boxShadow: 1, borderRadius: '10px' }}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Avatar src={user.avatar} sx={{width: '60px', height: '60px'}}/>
                <Box sx={{ marginLeft: '16px' }}>
                    <Typography variant="h6" sx={{ color: 'orange' }}>{user.name}</Typography>
                    <Typography variant="body2">{`Онлайн в ${user.onlineTime}`}</Typography>
                </Box>
            </Box>
            <Box>
                <IconButton>
                    <Bookmark />
                </IconButton>
                <IconButton>
                    <Delete />
                </IconButton>
            </Box>
        </Box>
    );
};

export default ChatHeader;
