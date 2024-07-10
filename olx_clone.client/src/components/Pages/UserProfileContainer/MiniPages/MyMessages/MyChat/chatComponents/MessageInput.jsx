import React, { useState } from 'react';
import { Box, TextField, IconButton } from '@mui/material';
import { Send, InsertEmoticon, Gif } from '@mui/icons-material';

const MessageInput = ({ connection, chatId, sender, receiver }) => {
    const [message, setMessage] = useState('');

    const sendMessage = async () => {
        if (connection && connection.state === 'Connected') {
            try {
                const messageDto = {
                    chatId,
                    senderId: sender.id,
                    receiverId: receiver.id,
                    text: message,
                };
                await connection.invoke('SendMessage', messageDto);
                console.log('Message sent:', messageDto);
                setMessage('');
            } catch (e) {
                console.error('Failed to send message:', e);
            }
        } else {
            alert('No connection to server yet.');
        }
    };

    return (
        <Box sx={{ display: 'flex', background: 'orange', alignItems: 'center', padding: '8px', borderTop: '1px solid #ddd' }}>
            <IconButton>
                <Gif />
            </IconButton>
            <IconButton>
                <InsertEmoticon />
            </IconButton>
            <TextField variant="outlined" placeholder="Введіть повідомлення" fullWidth sx={{ marginLeft: '8px', marginRight: '8px' }} value={message} onChange={(e) => setMessage(e.target.value)} />
            <IconButton onClick={sendMessage}>
                <Send />
            </IconButton>
        </Box>
    );
};

export default MessageInput;
