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
