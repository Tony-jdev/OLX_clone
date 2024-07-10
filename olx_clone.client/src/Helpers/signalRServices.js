import { useState, useEffect, useRef, useCallback } from 'react';
import * as signalR from '@microsoft/signalr';

export const useSignalR = (chatId, createChat) => {
    const [messages, setMessages] = useState([]);
    const connectionRef = useRef(null);
    const [isConnected, setIsConnected] = useState(false);

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

    const joinGroup = useCallback(async () => {
        if (connectionRef.current && isConnected && chatId) {
            try {
                await connectionRef.current.invoke('JoinChatGroup', chatId);
                console.log('Joined group');
            } catch (e) {
                console.log('Failed to join group', e);
            }
        }
    }, [chatId, isConnected]);

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
            }
        };
    }, [chatId, startConnection]);

    useEffect(() => {
        joinGroup();
    }, [joinGroup]);

    const sendMessage = async (messageDto) => {
        if (!chatId) {
            // Створення нового чату, якщо chatId не існує
            const newChatId = await createChat(messageDto);
            messageDto.chatId = newChatId;
            chatId = newChatId;
            await startConnection();
            await joinGroup();
        }

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
