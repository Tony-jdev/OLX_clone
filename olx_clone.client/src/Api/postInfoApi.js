import axios from 'axios';
import baseUrl from "@/Helpers/baseUrlHelper.js";

const getPostById = async (productId) => {
    try {
        const response = await axios.get(`${baseUrl}/api/posts/${productId}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching product:', error);
        throw new Error('Failed to fetch product');
    }
};

export { getPostById };
