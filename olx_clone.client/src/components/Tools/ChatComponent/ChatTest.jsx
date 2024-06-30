import React, { useEffect, useState } from 'react';
import * as signalR from '@microsoft/signalr';
import { Button, TextField, List, ListItem, ListItemText } from '@mui/material';
import {getChatById} from "@/Api/chatApi.js";

const Chat = () => {
    const [connection, setConnection] = useState(null);
    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState('');

    useEffect(() => {
        const newConnection = new signalR.HubConnectionBuilder()
            .withUrl("https://localhost:5173/chathub", { transport: signalR.HttpTransportType.WebSockets })
            .withAutomaticReconnect()
            .build();

        setConnection(newConnection);
    }, []);

    useEffect(() => {
        console.log(connection);
        if (connection) {
            connection.start()
                .then(result => {
                    console.log('Connected!', result);

                    connection.on('ReceiveMessage', message => {
                        setMessages(messages => [...messages, message]);
                    });

                    connection.invoke('JoinChatGroup', 1)
                        .then(() => console.log('Joined group'))
                        .catch(e => console.log('Failed to join group', e));
                })
                .catch(e => console.log('Connection failed: ', e));
        }
    }, [connection]);

    useEffect(() => {
        const fetchMessages = async () => {
            try {
                const response = await getChatById(1);
                setMessages(response.messages);
            } catch (error) {
                console.error('Failed to fetch messages:', error);
            }
        };

        fetchMessages();
    }, []);
    
    const sendMessage = async () => {
        console.log(connection);
        if (connection && connection._connectionState === "Connected") {
            try {
                const messageDto = {
                    chatId: 1,
                    senderId: "a1e753b9-f5fd-4394-ad5e-69dd00fe0614",
                    receiverId: "3d5bd40d-71ae-43fa-9543-e2fd981ffad3",
                    text: message
                };
                await connection.invoke("SendMessage", messageDto);
                setMessage('');
            } catch (e) {
                console.error(e);
            }
        } else {
            alert('No connection to server yet.');
        }
    };

    return (
        <div>
            <List>
                {messages && messages.map((msg, index) => (
                    <ListItem key={index}>
                        <ListItemText primary={msg.text} secondary={`From: ${msg.senderId}`} />
                    </ListItem>
                ))}
            </List>
            <TextField
                label="Message"
                value={message}
                onChange={e => setMessage(e.target.value)}
            />
            <Button onClick={sendMessage}>Send</Button>
        </div>
    );
};

export default Chat;
