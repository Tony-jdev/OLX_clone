import React, {useEffect, useState} from 'react';
import { Box, Typography, Avatar } from '@mui/material';
import ChatHeader from './chatComponents/ChatHeader';
import MessageWithDate from './chatComponents/MessageWithDate';
import MessageInput from './chatComponents/MessageInput';
import {fetchUserDataAsync, fetchUserDataShortAsync} from "@/Storage/Redux/Slices/userInfoSlice.js";
import {getChatById} from "@/Api/chatApi.js";
import {useTheme} from "@mui/material/styles";
import {useDispatch} from "react-redux";
import {fetchUserByIdShort} from "@/Api/userApi.js";
import {formatDate} from "@/Helpers/DateHelper.js";

const ChatPage = ({ chatId, onClose}) => {
    const theme = useTheme();
    const { colors } = theme.palette;
    
    const dispatch = useDispatch();
    
    const [sender, setSender] = useState(null);
    const [user, setUser] = useState(null);
    const [chatData, setChatData] = useState(null);

    const shouldShowDate = (index) => {
        if (index === 0) return true;
        const currentMessage = chatData.messages[index];
        const previousMessage = chatData.messages[index - 1];
        return formatDate(currentMessage.createdAt) !== formatDate(previousMessage.createdAt);
    };
    const getChat = async (id)=> {
        console.log(id);
        
        const user = await dispatch(fetchUserDataShortAsync());
        const chatD = await getChatById(id);

        console.log(chatD);
        console.log(user);
        
        const senderId = chatD.data.sellerId === user.id ? chatD.data.customerId : chatD.data.sellerId;
        console.log(senderId);
        const sender = await fetchUserByIdShort(senderId);
        console.log(sender);
        
        setUser(user);
        setSender(sender.data);
        setChatData(chatD.data);
    }
    
    useEffect(()=>{
        getChat(chatId);
    },[chatId]);

   return (
       <Box sx={{ maxWidth: '982px', margin: '0 auto', padding: '0px', backgroundColor: 'inherit' }}>
           <ChatHeader user={sender} />
           <Box sx={{ padding: '8px', backgroundColor: colors.transparent, borderRadius: '10px 10px 0px 0px', boxShadow: colors.boxShadow, marginTop: '16px' }}>
               <Box sx={{ display: 'flex', alignItems: 'center', padding: '28px 8px 10px 8px' }}>
                   <Box sx={{ display: 'flex', cursor: 'pointer'}} onClick={onClose}>
                       <Avatar src={chatData?.photoUrl} variant="rounded" sx={{ width: '60px', height: '60px', marginRight: '16px' }} />
                       <Box>
                           <Typography variant="h6">{chatData?.name}</Typography>
                           <Typography variant="body2">{chatData?.postPrice} грн</Typography>
                       </Box>
                   </Box>
               </Box>
               {chatData && chatData?.messages.map((message, index) => (
                   <MessageWithDate key={index} message={message} showDate={shouldShowDate(index)} isSentByUser={message.senderId === sender.id} />
               ))}
           </Box>
           <MessageInput />
       </Box>
   );
};

export default ChatPage;
