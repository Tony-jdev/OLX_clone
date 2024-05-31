import axios from 'axios';
import baseUrl from "@/Helpers/baseUrlHelper.js";

export const RegUser = async (user) => {
    try {
        console.log('Sending user data:', user); // Додано логування
        const response = await axios.post(`${baseUrl}/register`, user, {
            headers: {
                'Content-Type': 'application/json',
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching:', error.response ? error.response.data : error.message);
        throw new Error('Failed to fetch');
    }
};

export const LogUser = async (queryParams) => {
    try {
        const response = await axios.post(`${baseUrl}/login`, {params: queryParams});
        return response.data;
    } catch (error) {
        console.error('Error fetching:', error);
        throw new Error('Failed to fetch');
    }
};
