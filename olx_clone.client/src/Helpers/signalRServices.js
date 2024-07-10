import { useState, useEffect, useRef } from 'react';
import * as signalR from '@microsoft/signalr';

export const useSignalR = (chatId) => {
    const [connection, setConnection] = useState(null);
    const [messages, setMessages] = useState([]);
    const connectionRef = useRef(null);

    useEffect(() => {
        const connectToHub = async () => {
            if (connectionRef.current) {
                console.log('Already connected');
                return;
            }

            const newConnection = new signalR.HubConnectionBuilder()
                .withUrl('https://localhost:5173/chathub', { transport: signalR.HttpTransportType.WebSockets })
                .withAutomaticReconnect()
                .build();

            connectionRef.current = newConnection;
            setConnection(newConnection);

            newConnection.on('ReceiveMessage', (message) => {
                setMessages((prevMessages) => [...prevMessages, message]);
            });

            try {
                await newConnection.start();
                console.log('Connected to SignalR hub');

                await newConnection.invoke('JoinChatGroup', chatId);
                console.log('Joined chat group:', chatId);
            } catch (e) {
                console.log('Connection failed: ', e);
                connectionRef.current = null;
                setConnection(null);
            }
        };

        if (chatId && !connectionRef.current) {
            connectToHub();
        }

        return () => {
            if (connectionRef.current) {
                connectionRef.current.stop().then(() => {
                    console.log('Disconnected from SignalR hub');
                    connectionRef.current = null;
                    setConnection(null);
                });
            }
        };
    }, [chatId]);

    return {
        connection: connectionRef.current,
        messages,
        setMessages,
    };
};
