import axios from 'axios';
import baseUrl from "@/Helpers/baseUrlHelper.js";

export const GetPosts = async () => {
    try {
        const response = await axios.get(`${baseUrl}/api/posts`);
        return response.data;
    } catch (error) {
        console.error('Error fetching posts:', error);
        throw new Error('Failed to fetch posts');
    }
};