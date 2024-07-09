import React from 'react';
import { Box, Typography, Avatar } from '@mui/material';
import ChatHeader from './chatComponents/ChatHeader';
import Message from './chatComponents/Message';
import MessageInput from './chatComponents/MessageInput';

const ChatPage = () => {
    const user = {
        name: 'Іван',
        onlineTime: '13:25',
        avatar: 'https://example.com/avatar.jpg'
    };

    const product = {
        name: 'Хлопчик француз',
        price: '6000 грн',
        photoUrl: 'https://example.com/product.jpg'
    };

    const messages = [
        { id: 1, text: 'Многие думают, что Lorem Ipsum...', time: '18:22', isSentByUser: false },
        { id: 2, text: 'Многие думают, что Lorem Ipsum...', time: '13:20', isSentByUser: true },
        { id: 3, text: 'Многие думают, что Lorem Ipsum...', time: '13:25', isSentByUser: false },
        { id: 4, text: 'Многие думают, что Lorem Ipsum...', time: '14:20', isSentByUser: true }
    ];

    return (
        <Box sx={{ maxWidth: '982px', margin: '0 auto', padding: '0px', backgroundColor: 'inherit' }}>
            <ChatHeader user={user} />
            <Box sx={{ padding: '8px', backgroundColor: '#fff', borderRadius: '10px 10px 0px 0px', boxShadow: 1, marginTop: '16px' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: '16px' }}>
                    <Avatar src={product.photoUrl} variant="rounded" sx={{ width: '85px', height: '85px', marginRight: '16px' }} />
                    <Box>
                        <Typography variant="h6">{product.name}</Typography>
                        <Typography variant="body2">{product.price}</Typography>
                    </Box>
                </Box>
                {messages.map(message => (
                    <Message key={message.id} message={message} />
                ))}
            </Box>
            <MessageInput />
        </Box>
    );
};

export default ChatPage;
