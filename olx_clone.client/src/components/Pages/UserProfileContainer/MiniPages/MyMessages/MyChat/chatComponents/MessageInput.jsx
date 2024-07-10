import React, { useState } from 'react';
import { Box, TextField, IconButton } from '@mui/material';
import { Send, InsertEmoticon, Gif } from '@mui/icons-material';
import {useTheme} from "@mui/material/styles";

const MessageInput = ({ sendMessage, chatId, sender, receiver }) => {
    const theme = useTheme();
    const { colors } = theme.palette;
    
    const [message, setMessage] = useState('');

    const handleSendMessage = async () => {
        if (message.trim()) {
            const messageDto = {
                chatId,
                senderId: sender.id,
                receiverId: receiver.id,
                text: message,
            };
            await sendMessage(messageDto);
            setMessage('');
        }
    };

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column',  background: colors.background.secondary, alignItems: 'center', padding: '8px', borderTop: '1px solid #ddd' }}>
            <Box>
                <TextField variant="outlined" placeholder="Введіть повідомлення" fullWidth sx={{ marginLeft: '8px', marginRight: '8px' }} value={message} onChange={(e) => setMessage(e.target.value)} />
                <IconButton onClick={handleSendMessage}>
                    <Send />
                </IconButton>
            </Box>
            <Box>
                <IconButton>
                    <Gif />
                </IconButton>
                <IconButton>
                    <InsertEmoticon />
                </IconButton>
            </Box>
        </Box>
    );
};

export default MessageInput;
