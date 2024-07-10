import { useState, useEffect, useRef, useCallback } from 'react';
import * as signalR from '@microsoft/signalr';
import {getChats} from "@/Api/chatApi.js";

export const useSignalR = (initialChatId, createChat) => {
    const [messages, setMessages] = useState([]);
    const [chatId, setChatId] = useState(initialChatId);
    const connectionRef = useRef(null);
    const [isConnected, setIsConnected] = useState(false);
    const [hasJoinedGroup, setHasJoinedGroup] = useState(false);

    const startConnection = useCallback(async () => {
        if (connectionRef.current) {
            return; // Запобігаємо створенню нового з'єднання, якщо вже існує
        }

        const newConnection = new signalR.HubConnectionBuilder()
            .withUrl('https://localhost:5173/chathub', { transport: signalR.HttpTransportType.WebSockets })
            .withAutomaticReconnect()
            .build();

        connectionRef.current = newConnection;

        newConnection.on('ReceiveMessage', (message) => {
            setMessages((prevMessages) => [...prevMessages, message]);
        });

        newConnection.onclose(() => {
            setIsConnected(false);
            setHasJoinedGroup(false);
            console.log('Disconnected');
            connectionRef.current = null; // Очищення з'єднання при закритті
        });

        try {
            await newConnection.start();
            console.log('Connected!');
            setIsConnected(true);
        } catch (e) {
            console.log('Connection failed: ', e);
        }
    }, []);

    const joinGroup = useCallback(async (newChatId) => {
        if (connectionRef.current && isConnected && newChatId && !hasJoinedGroup) {
            try {
                await connectionRef.current.invoke('JoinChatGroup', newChatId);
                console.log('Joined group:', newChatId);
                setHasJoinedGroup(true);
            } catch (e) {
                console.log('Failed to join group', e);
            }
        }
    }, [isConnected, hasJoinedGroup]);

    useEffect(() => {
        if (chatId) {
            startConnection();
        }

        return () => {
            if (connectionRef.current) {
                connectionRef.current.stop();
                connectionRef.current = null;
                console.log('Disconnected');
                setIsConnected(false);
                setHasJoinedGroup(false);
            }
        };
    }, [chatId, startConnection]);

    useEffect(() => {
        if (chatId && isConnected && !hasJoinedGroup) {
            joinGroup(chatId);
        }
    }, [chatId, isConnected, joinGroup, hasJoinedGroup]);

    const sendMessage = async (messageDto, setChatIdCallback) => {
        let currentChatId = chatId;

        if (!currentChatId) {
            const newChatDto = {
                postId: messageDto.postId,
                customerId: messageDto.senderId,
                sellerId: messageDto.receiverId
            };
            
            let existChat = null;
            try{
                const params={
                    customerId: messageDto.senderId,
                    sellerId: messageDto.receiverId,
                    postId: messageDto.postId,
                }
                existChat = await getChats(params);
            }
            catch (e)
            {
                existChat = null;
            }
            if(existChat)
            {
                currentChatId = existChat.data.id;
                messageDto.chatId = currentChatId;
                setChatId(currentChatId);
                setChatIdCallback(currentChatId);
            }
            else {
                const newChatId = await createChat(newChatDto);
                currentChatId = newChatId.data.id;
                messageDto.chatId = currentChatId;
                setChatId(currentChatId);
                setChatIdCallback(currentChatId);
            }
            
            await startConnection();
            await joinGroup(currentChatId);
        } else {
            messageDto.chatId = currentChatId;
        }

        // Встановлюємо затримку для забезпечення завершення з'єднання перед приєднанням до групи
        const waitForConnection = new Promise((resolve) => {
            const interval = setInterval(() => {
                if (connectionRef.current && connectionRef.current.state === signalR.HubConnectionState.Connected) {
                    clearInterval(interval);
                    resolve();
                }
            }, 100);
        });

        await waitForConnection;
        await joinGroup(currentChatId);

        if (connectionRef.current && connectionRef.current.state === 'Connected') {
            try {
                await connectionRef.current.invoke('SendMessage', messageDto);
                console.log('Message sent:', messageDto);
            } catch (e) {
                console.error('Failed to send message:', e);
            }
        } else {
            alert('No connection to server yet.');
        }
    };

    return {
        connection: connectionRef.current,
        messages,
        setMessages,
        sendMessage,
    };
};
