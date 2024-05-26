import axios from "axios";
import baseUrl from "@/Helpers/baseUrlHelper.js";

export const GetCategories = async () => {
    try {
        const response = await axios.get(`${baseUrl}/api/categories`);
        return response.data;
    } catch (error) {
        console.error('Error fetching:', error);
        throw new Error('Failed to fetch');
    }
};