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
    } catch (e) {
        throw e;
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
    } catch (e) {
        const errorMessage = e.response.data.Message;
        console.log(errorMessage);
        throw Error(errorMessage);
    }
};
