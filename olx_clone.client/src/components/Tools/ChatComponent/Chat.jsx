import React, { useEffect, useState, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { TextField, Box, Typography, IconButton, Avatar } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import { createChat, getChatById } from "@/Api/chatApi.js";
import { useTheme } from '@mui/material/styles';
import Message from '@/components/Tools/Message/Message.jsx';
import { useSignalR } from "@/Helpers/signalRServices.js";
import {
    fetchChatByIdAsync,
    fetchChatsAsync,
    setSelectedChatId
} from "@/Storage/Redux/Slices/chatSlice.js";
import { useChat } from "@/providers/ChatProvider.jsx";
import SButton from "@/components/Tools/Button/SButton.jsx";
import Text from "@/components/Tools/TextContainer/Text.jsx";

const Chat = ({ post, sender, receiver }) => {
    const theme = useTheme();
    const { colors } = theme.palette;
    const [message, setMessage] = useState('');
    const dispatch = useDispatch();
    const [chatId, setChatId] = useState(null);
    const { isOpen } = useChat();
    const { connection, messages, setMessages } = useSignalR(chatId);
    const [isLoading, setIsLoading] = useState(true);
    const messagesEndRef = useRef(null);

    useEffect(() => {
        const senderId = sender.userId;
        const receiverId = receiver.id;
        const postId = post.id;

        const updateData = async () => {
            try {
                const chatResponse = await dispatch(fetchChatsAsync({
                    customerId: senderId,
                    sellerId: receiverId,
                    postId: postId,
                }));

                if (chatResponse === 'Request failed with status code 404') {
                    const newChat = await createChat({
                        postId: postId,
                        customerId: senderId,
                        sellerId: receiverId,
                    });
                    setChatId(newChat.data.id);
                } else {
                    setChatId(chatResponse.id);
                }
            } catch (error) {
                console.error('Failed to update data:', error);
            } finally {
                setIsLoading(false);
            }
        };

        updateData();
    }, [post, sender, dispatch]);

    useEffect(() => {
        if (chatId) {
            dispatch(setSelectedChatId(chatId));
            dispatch(fetchChatByIdAsync(chatId));
        }
    }, [chatId, dispatch]);

    useEffect(() => {
        const fetchMessages = async () => {
            try {
                const response = await getChatById(chatId);
                setMessages(response.data.messages);
                scrollToBottom();
            } catch (error) {
                console.error('Failed to fetch messages:', error);
            }
        };

        if (chatId) {
            fetchMessages();
        }
    }, [chatId]);

    useEffect(() => {
        const handleReceiveMessage = (message) => {
            //setMessages((messages) => [...messages, message]);
            scrollToBottom();
        };

        if (connection) {
            connection.on('ReceiveMessage', handleReceiveMessage);
            if (chatId) {
                connection.invoke('JoinChatGroup', chatId)
                    .then(() => console.log('Joined group'))
                    .catch((e) => console.log('Failed to join group', e));
            }
        }

        return () => {
            if (connection) {
                connection.off('ReceiveMessage', handleReceiveMessage);
                connection.stop()
                    .then(() => console.log('Disconnected!'))
                    .catch((e) => console.log('Disconnection failed: ', e));
            }
        };
    }, [connection, chatId]);

    const sendMessage = async () => {
        if (connection && connection.state === 'Connected') {
            try {
                const messageDto = {
                    chatId,
                    senderId: sender.userId,
                    receiverId: receiver.id,
                    text: message,
                };
                await connection.invoke('SendMessage', messageDto);
                setMessage('');
                scrollToBottom();
            } catch (e) {
                console.error(e);
            }
        } else {
            alert('No connection to server yet.');
        }
    };

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        if (isOpen) {
            scrollToBottom();
        }
    }, [isOpen]);

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    if (isLoading) {
        return <Typography>Loading...</Typography>;
    }

    return (
        <Box
            sx={{
                width: '100%',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                backgroundColor: colors.background.secondary,
                borderRadius: '10px 10px 0 0',
                boxShadow: colors.types.shadows.boxShadowDefault,
            }}
        >
            <Box
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    backgroundColor: colors.background.primary,
                    color: colors.text.primary,
                    boxShadow: colors.boxShadow,
                    padding: '16px',
                    borderRadius: '10px 0px 0 0',
                    position: 'sticky',
                    top: 0,
                    zIndex: 1,
                }}
            >
                <Avatar alt={receiver.name} src={receiver.avatar} sx={{ marginRight: '16px' }} />
                <Box>
                    <Text type={'Title'} color={colors.text.primary}>{receiver.name}</Text>
                    <Text type={'Body'} color={colors.text.secondary}>Продавець</Text>
                </Box>
            </Box>
            <Box
                sx={{
                    flexGrow: 1,
                    overflowY: 'auto',
                    padding: '16px',
                    backgroundColor: colors.background.secondary,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: messages.length > 0 ? 'flex-start' : 'center',
                    height: 'calc(100vh - 170px)', // Adjust this value based on the height of the header and input
                    '&::-webkit-scrollbar': {
                        width: '10px',
                    },
                    '&::-webkit-scrollbar-thumb': {
                        backgroundColor: colors.background.orange,
                        borderRadius: '10px',
                    },
                    '&::-webkit-scrollbar-track': {
                        backgroundColor: 'transparent',
                    },
                }}
            >
                {messages && messages.map((msg, index) => (
                    <Message key={index} message={msg} isUserMessage={msg.senderId !== sender.id} />
                ))}
                <div ref={messagesEndRef} />
            </Box>
            <Box
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    padding: '16px',
                    borderTop: `1px solid ${colors.divider}`,
                    backgroundColor: colors.background.secondary,
                    borderRadius: '0 0 10px 10px',
                }}
            >
                <TextField
                    label="Message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    fullWidth
                    variant="outlined"
                    sx={{
                        marginRight: '8px',
                        backgroundColor: colors.background.secondary,
                        borderRadius: '10px',
                        '& .MuiOutlinedInput-root': {
                            borderRadius: '10px',
                        },
                    }}
                />
                <SButton
                    isIconButton={true}
                    icon={<SendIcon sx={{color: colors.text.orange}}/>}
                    action={sendMessage}
                />
            </Box>
        </Box>
    );
};

export default Chat;
