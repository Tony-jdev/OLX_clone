import React, { createContext, useContext, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    fetchChatsAsync,
    fetchChatByIdAsync,
    selectChats,
    selectSelectedChat,
    setSelectedChatId,
    setMessage
} from '@/Storage/Redux/Slices/chatSlice.js';
import ChatComponent from '@/components/Tools/ChatComponent/Chat.jsx'; 
import { Box, Dialog } from '@mui/material';

const ChatContext = createContext();

export const useChat = () => useContext(ChatContext);

export const ChatProvider = ({ children }) => {
    const dispatch = useDispatch();
    const chats = useSelector(selectChats);
    const selectedChat = useSelector(selectSelectedChat);
    const [isOpen, setIsOpen] = useState(false);

    const openChat = (chatId) => {
        setIsOpen(true);
        dispatch(setSelectedChatId(chatId));
        dispatch(fetchChatByIdAsync(chatId));
    };

    const closeChat = () => {
        setIsOpen(false);
        dispatch(setSelectedChatId(null));
    };

    const fetchChats = () => {
        //dispatch(fetchChatsAsync());
    };

    return (
        <ChatContext.Provider value={{ openChat, closeChat, fetchChats, chats, selectedChat }}>
            {children}
            <Dialog open={isOpen} onClose={closeChat} fullWidth maxWidth="md">
                <Box p={2}>
                    <ChatComponent chatId={1} />
                </Box>
            </Dialog>
        </ChatContext.Provider>
    );
};
