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