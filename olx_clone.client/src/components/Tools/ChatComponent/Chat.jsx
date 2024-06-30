import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, TextField, Button, Typography, List, ListItem, ListItemText } from '@mui/material';
import { fetchChatByIdAsync, selectSelectedChat, selectMessage, setMessage } from '@/Storage/Redux/Slices/chatSlice.js';
import {joinChatGroup, onReceiveMessage, sendMessage, startConnection} from "@/Helpers/signalRServices.js";
import ChatTest from "@/components/Tools/ChatComponent/ChatTest.jsx";

const Chat = ({ chatId }) => {
    const dispatch = useDispatch();
    const selectedChat = useSelector(selectSelectedChat);
    const message = useSelector(selectMessage);
    const [inputValue, setInputValue] = useState('');
    const [messages, setMessages] = useState([]);

  

    return (
       <>
           <ChatTest/>
       </>
    );
};

export default Chat;
