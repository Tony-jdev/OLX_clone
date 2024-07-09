import React, {useEffect, useState} from 'react';
import { Box, Typography, Avatar } from '@mui/material';
import ChatHeader from './chatComponents/ChatHeader';
import MessageWithDate from './chatComponents/MessageWithDate';
import MessageInput from './chatComponents/MessageInput';
import {fetchUserDataAsync} from "@/Storage/Redux/Slices/userInfoSlice.js";
import {getChats, getChatsByUserId} from "@/Api/chatApi.js";
import {useTheme} from "@mui/material/styles";
import {useDispatch} from "react-redux";
import {fetchUserById} from "@/Api/userApi.js";
import {fetchChatsAsync} from "@/Storage/Redux/Slices/chatSlice.js";

const ChatPage = ({ chatId, onClose}) => {
    const theme = useTheme();
    const { colors } = theme.palette;
    
    const dispatch = useDispatch();
    
    const [chat, setChat] = useState(null);
    const [sender, setSender] = useState(null);
    const [user, setUser] = useState(null);
    const [chatData, setChatData] = useState(null);

    const shouldShowDate = (index) => {
        if (index === 0) return true;
        const currentMessage = chatData.messages[index];
        const previousMessage = chatData.messages[index - 1];
        return currentMessage.createdAt !== previousMessage.createdAt;
    };
    const getChatById = async (id)=> {
        console.log(id);
        
        const user = await dispatch(fetchUserDataAsync());
        const chats = await getChatsByUserId(user.userId);
        const chat = chats.data.find((chat) => String(chat.id) === id);
        console.log(chat);
        console.log(chats);

        const senderId = chat.sellerId === user.userId ? chat.customerId : chat.sellerId;
        const sender = await fetchUserById(senderId);
        console.log(sender);

        
        const params = {
            customerId: chat.customerId,
            sellerId: chat.sellerId,
            postId: chat.postId,
        };
        const chatD = await getChats(params);
        console.log(chatD);

        setUser(user);
        setSender(sender.data);
        setChat(chat);
        setChatData(chatD.data);
    }
    
    useEffect(()=>{
        getChatById(chatId);
    },[chatId]);

   return (
       <Box sx={{ maxWidth: '982px', margin: '0 auto', padding: '0px', backgroundColor: 'inherit' }}>
           <ChatHeader user={user} />
           <Box sx={{ padding: '8px', backgroundColor: '#fff', borderRadius: '10px 10px 0px 0px', boxShadow: 1, marginTop: '16px' }}>
               <Box sx={{ display: 'flex', alignItems: 'center', padding: '28px 8px 10px 8px' }}>
                   <Box sx={{ display: 'flex', cursor: 'pointer'}} onClick={onClose}>
                       <Avatar src={chat?.photoUrl} variant="rounded" sx={{ width: '60px', height: '60px', marginRight: '16px' }} />
                       <Box>
                           <Typography variant="h6">{chat?.name}</Typography>
                           <Typography variant="body2">{chat?.price}</Typography>
                       </Box>
                   </Box>
               </Box>
               {chatData && chatData?.messages.map((message, index) => (
                   <MessageWithDate key={index} message={message.text} showDate={shouldShowDate(index)} />
               ))}
           </Box>
           <MessageInput />
       </Box>
   );
};

export default ChatPage;
