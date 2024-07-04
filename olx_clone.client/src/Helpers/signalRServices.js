import { useState, useEffect } from 'react';
import * as signalR from '@microsoft/signalr';

export const useSignalR = (chatId) => {
    const [connection, setConnection] = useState(null);
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        console.log('signalR');
        const connectToHub = async () => {
            const newConnection = new signalR.HubConnectionBuilder()
                .withUrl('https://localhost:5173/chathub', { transport: signalR.HttpTransportType.WebSockets })
                .withAutomaticReconnect()
                .build();

            setConnection(newConnection);

            try {
                await newConnection.start()
                    .then(() => {
                        console.log('Connected!');
                    })
                    .catch((e) => console.log('Connection failed: ', e));

                newConnection.on('ReceiveMessage', (message) => {
                    setMessages((prevMessages) => [...prevMessages, message]);
                });

                await newConnection.invoke('JoinChatGroup', chatId)
                    .then(() => console.log('Joined group'))
                    .catch((e) => console.log('Failed to join group', e));
                
            } catch (e) {
                console.log('Connection failed: ', e);
            }
        };

        if (chatId) {
            connectToHub();
        }

        return () => {
            if (connection) {
                connection.stop();
            }
        };
    }, [chatId]);

    return {
        connection,
        messages,
        setMessages,
    };
};
