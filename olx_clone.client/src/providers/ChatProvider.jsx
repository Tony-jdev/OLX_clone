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
import ChatComponent from '@/components/Tools/ChatComponent/ChatСontainer.jsx'; 
import {Box, Dialog, Modal} from '@mui/material';
import {fetchUserDataAsync, selectUser} from "@/Storage/Redux/Slices/userInfoSlice.js";

const ChatContext = createContext();

export const useChat = () => useContext(ChatContext);

export const ChatProvider = ({ children }) => {
    const dispatch = useDispatch();
    const chats = useSelector(selectChats);
    const selectedChat = useSelector(selectSelectedChat);
    const [isOpen, setIsOpen] = useState(false);
    const [post, setPost] = useState(null);
    
    const openChat = () => {
        setIsOpen(true);
    };

    const closeChat = () => {
        setIsOpen(false);
        dispatch(setSelectedChatId(null));
    };

    const fetchChats = () => {
        //dispatch(fetchChatsAsync());
    };
    
    
    
    return (
        <ChatContext.Provider value={{ openChat, closeChat, fetchChats, isOpen, chats, selectedChat, setPost }}>
            {children}
            <Modal
                open={isOpen}
                onClose={closeChat}
                aria-labelledby="chat-modal-title"
                aria-describedby="chat-modal-description"
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'flex-end',
                }}
            >
                <Box
                    sx={{
                        width: '100%',
                        maxWidth: '400px',
                        height: '100%',
                        bgcolor: 'background.paper',
                        boxShadow: 24,
                        overflow: 'auto',
                        borderRadius: '30px 0px 0px 30px',
                        transform: isOpen ? 'translateX(0)' : 'translateX(100%)',
                        transition: 'transform 1s ease-in-out',
                        position: 'absolute',
                        top: 0,
                        right: 0,
                    }}
                >
                    {isOpen && (
                        <ChatComponent prod={post} open={isOpen} onClose={closeChat} />
                    )}
                </Box>
            </Modal>
        </ChatContext.Provider>
    );
};
