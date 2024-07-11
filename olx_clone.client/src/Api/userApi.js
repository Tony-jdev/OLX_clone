import axios from 'axios';
import baseUrl from "@/Helpers/baseUrlHelper.js";

export const fetchUserById = async (userId) => {
    try {
        const response = await axios.get(`${baseUrl}/api/users/${userId}`, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
        });
        return response.data;
    } catch (error) {
        throw new Error('Failed to fetch');
    }
};
export const fetchUserByIdShort = async (userId) => {
    try {
        const response = await axios.get(`${baseUrl}/api/users/short-info/${userId}`, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
        });
        return response.data;
    } catch (error) {
        throw new Error('Failed to fetch');
    }
};

export const updateUserById = async (userId, userData) => {
    try {
        const response = await axios.put(`${baseUrl}/api/users/${userId}`, userData, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
        });
        return response.data;
    } catch (error) {
        throw new Error('Failed to update user');
    }
};

export const updateOnlineStatus = async (userId) => {
    try {
        const response = await axios.post(`${baseUrl}/api/users/update-online-status`, null, {
            params: {
                userId: userId
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error updating online status:', error);
        throw new Error('Failed to update online status');
    }
};

export const uploadUserPhoto = async (userId, file) => {
    try {
        const formData = new FormData();
        formData.append('file', file);

        const response = await axios.post(`${baseUrl}/api/users/${userId}/upload-photo`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error uploading photo:', error);
        throw new Error('Failed to upload photo');
    }
};