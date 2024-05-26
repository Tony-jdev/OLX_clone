import axios from 'axios';
import baseUrl from "@/Helpers/baseUrlHelper.js";

export const GetPosts = async (queryParams) => {
    try {
        const response = await axios.get(`${baseUrl}/api/posts`, {params: queryParams});
        return response.data;
    } catch (error) {
        console.error('Error fetching posts:', error);
        throw new Error('Failed to fetch posts');
    }
};
export const GetVIPPosts = async () => {
    try {
        const response = await axios.get(`${baseUrl}/api/posts/vip`);
        return response.data;
    } catch (error) {
        console.error('Error fetching posts:', error);
        throw new Error('Failed to fetch posts');
    }
};

export const GetPostById = async (id) => {
    try {
        const response = await axios.get(`${baseUrl}/api/posts/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching posts:', error);
        throw new Error('Failed to fetch posts');
    }
};

export const GetPostByCategoryId = async (queryParams, id) => {
    try {
        const response = await axios.get(`${baseUrl}/api/posts/category/${id}`, {params: queryParams});
        return response.data;
    } catch (error) {
        console.error('Error fetching posts:', error);
        throw new Error('Failed to fetch posts');
    }
};