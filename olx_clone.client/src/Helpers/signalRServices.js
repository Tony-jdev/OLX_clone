import { useState, useEffect, useRef } from 'react';
import * as signalR from '@microsoft/signalr';

export const useSignalR = (chatId) => {
    const [messages, setMessages] = useState([]);
    const connectionRef = useRef(null);

    useEffect(() => {
        const connectToHub = async () => {
            const newConnection = new signalR.HubConnectionBuilder()
                .withUrl('https://localhost:5173/chathub', { transport: signalR.HttpTransportType.WebSockets })
                .withAutomaticReconnect()
                .build();

            connectionRef.current = newConnection;

            newConnection.on('ReceiveMessage', (message) => {
                setMessages((prevMessages) => [...prevMessages, message]);
            });

            try {
                await newConnection.start();
                console.log('Connected!');

                await newConnection.invoke('JoinChatGroup', chatId)
                    .then(() => console.log('Joined group'))
                    .catch((e) => console.log('Failed to join group', e));
            } catch (e) {
                console.log('Connection failed: ', e);
            }
        };

        if (chatId && !connectionRef.current) {
            connectToHub();
        }

        return () => {
            if (connectionRef.current) {
                connectionRef.current.stop();
                connectionRef.current = null;
                console.log('Disconnected');
            }
        };
    }, [chatId]);

    return {
        connection: connectionRef.current,
        messages,
        setMessages,
    };
};
