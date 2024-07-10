import React, { useEffect, useState, useRef } from 'react';
import { Box, Avatar } from '@mui/material';
import ChatHeader from './chatComponents/ChatHeader';
import MessageWithDate from './chatComponents/MessageWithDate';
import MessageInput from './chatComponents/MessageInput';
import { fetchUserDataShortAsync } from "@/Storage/Redux/Slices/userInfoSlice.js";
import {getChatById, createChat, markChatAsRead, getChats} from "@/Api/chatApi.js";
import { useTheme } from "@mui/material/styles";
import { useDispatch } from "react-redux";
import {fetchUserByIdShort, updateOnlineStatus} from "@/Api/userApi.js";
import { formatDate } from "@/Helpers/DateHelper.js";
import Text from "@/components/Tools/TextContainer/Text.jsx";
import { LabelMedium } from "@/components/Tools/TextContainer/Styles.js";
import { useSignalR } from "@/Helpers/signalRServices.js";
import {scrollableBox} from "@/components/Tools/PostWideList/Styles.js";
import {GetPostById} from "@/Api/postApi.js";

const ChatPage = ({ chat, setAdditionData, setSelectedChatId, alternative, onClose }) => {
    const theme = useTheme();
    const { colors } = theme.palette;
    const dispatch = useDispatch();
    const [chatId, setChatId] = useState(chat ?? null);
    const [sender, setSender] = useState(null);
    const [user, setUser] = useState(null);
    const [postData, setPostData] = useState(null);
    const [chatData, setChatData] = useState(null);
    const { connection, messages, setMessages, sendMessage } = useSignalR(chatId, createChat, setAdditionData);
    const messagesEndRef = useRef(null);
    const messagesContainerRef = useRef(null);

    const shouldShowDate = (index, messages) => {
        if (!messages || messages.length === 0) return false;
        if (index === 0) return true;
        if (index >= messages.length) return false; 
        const currentMessage = messages[index];
        const previousMessage = messages[index - 1];
        return formatDate(currentMessage.createdAt) !== formatDate(previousMessage.createdAt);
    };

    const getChat = async (id) => {
        console.log('Fetching chat data for chatId:', id);
       
        const user = await dispatch(fetchUserDataShortAsync());
        setUser(user);
        
        if(alternative)
        {
            const sender = await fetchUserByIdShort(alternative.senderId);
            setSender(sender.data);
            const post = await GetPostById(alternative.postSku);
            console.log(post);
            setPostData(post.data);
            try{
                const params = {
                    customerId: user.id,
                    sellerId: sender.data.id,
                    postId: post.data.id
                }
                console.log(params)
                const chatD = await getChats(params);
                setChatData(chatD.data);
                setMessages(chatD.data.messages);
            }
            catch (e)
            {
                
            }
        }
        else
        {
            const chatD = await getChatById(id);
            const senderId = chatD.data.sellerId === user.id ? chatD.data.customerId : chatD.data.sellerId;
            const sender = await fetchUserByIdShort(senderId);
            setSender(sender.data);
            setChatData(chatD.data);
            setMessages(chatD.data.messages);
            console.log('Chat data:', chatD.data);
            console.log('Sender data:', sender.data);
        }
    };

    useEffect(() => {
        getChat(chatId);
    }, [chatId]);
    
    useEffect(()=>{
        const updateStatus = async ()=>{
            if(user?.id){
                await updateOnlineStatus(user?.id);
            }
        }
        updateStatus();
    }, [user]);
    
    useEffect(()=>{
        const getMessagesByReceiverId = (messages, receiverId) => {
            return messages
                .filter(message => message.receiverId === receiverId)
                .map(message => message.id);
        };
        const updateMessageStatus = async ()=>{
            if(chatData?.messages && user?.id)
            {
                const arr = getMessagesByReceiverId(chatData.messages, user?.id);
                console.log(arr);
                await markChatAsRead(arr);
            }
        }
        updateMessageStatus();
    }, [chatData]);

    const scrollToBottom = () => {
        if (messagesContainerRef.current) {
            messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
        }
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    return (
        <Box sx={{ maxWidth: '982px', margin: '0 auto', padding: '0px', backgroundColor: 'inherit' }}>
            <ChatHeader user={sender} />
            <Box style={{boxShadow: colors.boxShadow, borderRadius: '10px 10px 0px 0px',}}>
                <Box sx={{ padding: '8px', backgroundColor: colors.transparent,  marginTop: '16px', borderRadius: '10px 10px 0px 0px', }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', padding: '28px 8px 10px 8px' }}>
                        <Box sx={{ display: 'flex', cursor: 'pointer' }} onClick={onClose}>
                            <Avatar src={chatData?.photoUrl ?? postData?.photos[0].photoUrl} variant="rounded" sx={{ width: '60px', height: '60px', marginRight: '16px' }} />
                            <Box>
                                <Text type={'Title'}>{chatData?.name ?? postData?.title}</Text>
                                <Text textSt={LabelMedium} sr={{ marginTop: '10px' }}>{chatData?.postPrice ?? postData?.price} грн</Text>
                            </Box>
                        </Box>
                    </Box>
                    <Box
                        ref={messagesContainerRef}
                        sx={{overflowY: 'auto',
                            overflowX: 'hidden',
                            scrollBehavior: 'smooth',
                            position: 'relative', scrollbarColor: `${colors.text.orange} ${colors.background.secondary}`, maxHeight: '357px', overflow: 'auto'}}>
                        {messages && messages.length > 0 && messages.map((message, index) => (
                            <MessageWithDate key={index} message={message} showDate={shouldShowDate(index, messages)} isSentByUser={message.senderId === user.id} />
                        ))}
                        <Box ref={messagesEndRef}></Box>
                    </Box>
                </Box>
                <MessageInput sendMessage={sendMessage} setChatId={setSelectedChatId} chatId={chatId} sender={user} receiver={sender} postId={postData?.id} />
            </Box>
        </Box>
    );
};

export default ChatPage;
