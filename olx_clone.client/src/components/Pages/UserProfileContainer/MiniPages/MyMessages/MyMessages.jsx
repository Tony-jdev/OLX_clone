import React, {useEffect, useState} from 'react';
import { Box, Tab, Tabs, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import PostWideList from '@/components/Tools/PostWideList/PostWideList';
import {TabsContainerStyles} from "@/components/Pages/UserProfileContainer/MiniPages/MyPosts/Styles.js";
import {useDispatch} from "react-redux";
import {fetchUserDataAsync} from "@/Storage/Redux/Slices/userInfoSlice.js";
import {getChatsByUserId} from "@/Api/chatApi.js";
import ChatPage from "@/components/Pages/UserProfileContainer/MiniPages/MyMessages/MyChat/ChatPage.jsx"; 

const Messages = () => {
    const theme = useTheme();
    const { colors } = theme.palette;

    const [selectedTab, setSelectedTab] = useState(0);
    const [chats, setChats] = useState([]);
    const [unReadChatsSell, setUnReadChatsSell] = useState([]);
    const [ReadChatsSell, setReadChatsSell] = useState([]);
    const [unReadChatsBuy, setUnReadChatsBuy] = useState([]);
    const [ReadChatsBuy, setReadChatsBuy] = useState([]);
    
    const dispatch = useDispatch();

    const [selectedChatId, setSelectedChatId] = useState(null);
    const handleChatSelect = (chatId) => {
        setSelectedChatId(chatId);
    };

    const handleChatRemove = () => {
        setSelectedChatId(null);
    };
    
    const handleChange = (event, newValue) => {
        setSelectedTab(newValue);
    };
    
    const getChats = async ()=> {
        const user = await dispatch(fetchUserDataAsync());
        const chats = await getChatsByUserId(user.userId);
        
        const unReadChatsSell = chats.data.filter(chat => chat.latestMessage && !chat.latestMessage.isRead && chat.sellerId === user.userId);
        const readChatsSell = chats.data.filter(chat => chat.latestMessage && chat.latestMessage.isRead && chat.sellerId === user.userId);
        const unReadChatsBuy = chats.data.filter(chat => chat.latestMessage && !chat.latestMessage.isRead && chat.customerId === user.userId);
        const readChatsBuy = chats.data.filter(chat => chat.latestMessage && chat.latestMessage.isRead && chat.customerId === user.userId);

        setUnReadChatsSell(unReadChatsSell);
        setReadChatsSell(readChatsSell);
        setUnReadChatsBuy(unReadChatsBuy);
        setReadChatsBuy(readChatsBuy);
        
        console.log(chats);
        console.log(unReadChatsSell);
        console.log(readChatsSell);
        console.log(unReadChatsBuy);
        console.log(readChatsBuy);

        setChats(chats.data);
    }

    useEffect(() => {
        getChats();
    }, []);

    if (selectedChatId) {
        return <ChatPage chatId={selectedChatId}  onClose={handleChatRemove} />;
    }

    return (
        <Box sx={{ maxWidth: 985, maxHeight: 804, height: '100vh', width: '100vw', padding: '28px 8px', borderRadius: '10px', boxShadow: colors.boxShadow, background: colors.background.secondary }}>
            <Tabs value={selectedTab} onChange={handleChange} aria-label="profile tabs"
            sx={{ ...TabsContainerStyles,
                '& .MuiTabs-indicator': {
                    backgroundColor: colors.text.revers,
                },}}
            >
                <Tab label="Продаю" />
                <Tab label="Купую" />
            </Tabs>
            <Box sx={{ marginTop: '30px',}}>
                {selectedTab === 0 && (
                    <>
                        <PostWideList unr={unReadChatsSell} r={ReadChatsSell} w={'s'} t="message" onChatSelect={handleChatSelect}/>
                    </>
                )}
                {selectedTab === 1 && (
                    <>
                        <PostWideList unr={unReadChatsBuy} r={ReadChatsBuy} w={'b'} t="message" onChatSelect={handleChatSelect}/>
                    </>
                )}
            </Box>
        </Box>
    );
};

export default Messages;
