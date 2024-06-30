import axios from 'axios';
import baseUrl from "@/Helpers/baseUrlHelper.js";


const apiClient = axios.create({
    baseURL: baseUrl,
    headers: {
        'Content-Type': 'application/json',
    },
});

export const markChatAsRead = async (chatIds) => {
    try {
        const response = await apiClient.post('api/chats/mark-as-read', chatIds);
        return response.data;
    } catch (error) {
        console.error('Error marking chat as read:', error);
        throw error;
    }
};

export const getChatsByUserId = async (userId) => {
    try {
        const response = await apiClient.get(`api/chats/user/${userId}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching chats by user ID:', error);
        throw error;
    }
};

export const getChatById = async (id) => {
    try {
        const response = await apiClient.get(`api/chats/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching chat by ID:', error);
        throw error;
    }
};

export const getChats = async (params) => {
    try {
        const response = await apiClient.get('api/chats', { params });
        return response.data;
    } catch (error) {
        console.error('Error fetching chats:', error);
        throw error;
    }
};

export const createChat = async (chatData) => {
    try {
        const response = await apiClient.post('api/chats', chatData);
        return response.data;
    } catch (error) {
        console.error('Error creating chat:', error);
        throw error;
    }
};
