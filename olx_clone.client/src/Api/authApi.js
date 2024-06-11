import axios from 'axios';
import baseUrl from "@/Helpers/baseUrlHelper.js";

export const RegUser = async (user) => {
    try {
        const response = await axios.post(`${baseUrl}/api/auth/register`, user, {
                headers: {
                'Content-Type': 'application/json',
            }
        });
        return response.data;
    } catch (error) {
        throw new Error('Failed to fetch');
    }
};

export const LogUser = async (user) => {
    try {
        const response = await axios.post(`${baseUrl}/api/auth/login`, user, {
            headers: {
                'Content-Type': 'application/json',
            }
        });
        return response.data;
    } catch (error) {
        throw new Error('Failed to fetch');
    }
};
