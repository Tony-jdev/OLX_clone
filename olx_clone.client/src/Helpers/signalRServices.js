import * as signalR from "@microsoft/signalr";
import baseUrl from "@/Helpers/baseUrlHelper.js";

let connection = null;

export const startConnection = async () => {
    connection = new signalR.HubConnectionBuilder()
        .withUrl(baseUrl+"/hub")
        .withAutomaticReconnect()
        .build();

    try {
        await connection.start();
        console.log("SignalR Connected.");
    } catch (err) {
        console.log("Error while establishing connection: ", err);
        setTimeout(() => startConnection(), 5000);
    }
};

export const joinChatGroup = async (chatId) => {
    if (connection.state === signalR.HubConnectionState.Connected) {
        try {
            await connection.invoke("JoinChatGroup", chatId);
            console.log(`Joined chat group: ${chatId}`);
        } catch (err) {
            console.error("Error joining chat group: ", err);
        }
    } else {
        console.error("Connection is not established. Cannot join chat group.");
    }
};

export const sendMessage = async (messageDto) => {
    if (connection.state === signalR.HubConnectionState.Connected) {
        try {
            await connection.invoke("SendMessage", messageDto);
            console.log("Message sent:", messageDto);
        } catch (err) {
            console.error("Error sending message: ", err);
        }
    } else {
        console.error("Connection is not established. Cannot send message.");
    }
};

export const onReceiveMessage = (callback) => {
    if (connection) {
        connection.on("ReceiveMessage", (message) => {
            console.log("Message received:", message);
            callback(message);
        });
    }
};
