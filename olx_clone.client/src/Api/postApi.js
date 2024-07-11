import axios from 'axios';
import baseUrl from "@/Helpers/baseUrlHelper.js";

export const GetPosts = async (queryParams) => {
    try {
        const response = await axios.get(`${baseUrl}/api/posts`, {params: queryParams});
        return response.data;
    } catch (error) {
        console.error('Error fetching:', error);
        throw new Error('Failed to fetch');
    }
};
export const getPostsByStatus = async (status) => {
    try {
        const response = await axios.get(`${baseUrl}/api/posts/by-status`, {
            params: {
                status: status
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching posts by status:', error);
        throw new Error('Failed to fetch posts by status');
    }
};
export const GetVIPPosts = async () => {
    try {
        const response = await axios.get(`${baseUrl}/api/posts/vip`);
        return response.data;
    } catch (error) {
        console.error('Error fetching:', error);
        throw new Error('Failed to fetch');
    }
};

export const GetPostById = async (id) => {
    try {
        const response = await axios.get(`${baseUrl}/api/posts/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching:', error);
        throw new Error('Failed to fetch');
    }
};

export const GetPostByCategoryId = async (queryParams, id) => {
    try {
        const response = await axios.get(`${baseUrl}/api/posts/category/${id}`, {params: queryParams});
        return response.data;
    } catch (error) {
        console.error('Error fetching:', error);
        throw new Error('Failed to fetch');
    }
};

export const CreatePost = async (post) => {
    const formData = new FormData();
    formData.append('Title', post.title);
    formData.append('Description', post.description);
    formData.append('Type', post.type);
    formData.append('Location', post.location);
    formData.append('Price', post.price);
    formData.append('CategoryId', post.categoryId);
    formData.append('ApplicationUserId', post.applicationUserId);

    post.files.forEach((file) => {
        formData.append('Files', file);
    });

    try {
        const response = await axios.post(`${baseUrl}/api/posts`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            }
        });
        return response.data;
    } catch (error) {
        throw new Error('Failed to create post');
    }
};

export const EditPost = async (id, post) => {
    const formData = new FormData();
    formData.append('Id', id);
    formData.append('Title', post.title);
    formData.append('Description', post.description);
    formData.append('Type', post.type);
    formData.append('Location', post.location);
    formData.append('Price', post.price);
    formData.append('CategoryId', post.categoryId);
    formData.append('ApplicationUserId', post.applicationUserId);
    formData.append('Status', post.status);

    post.files.forEach((file) => {
        formData.append('Files', file);
    });

    console.log(post);
    
    try {
        const response = await axios.put(`${baseUrl}/api/posts/${id}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            }
        });
        return response.data;
    } catch (error) {
        throw new Error('Failed to update post');
    }
};

export const DeletePostPhoto = async (photoId, token) => {
    try {
        const response = await axios.delete(`${baseUrl}/api/posts/photo/${photoId}`, {
            headers: {
                'Authorization': "Bearer " + token
            },
        });
        return response.data;
    } catch (error) {
        throw new Error('Failed to delete photo');
    }
};
export const DeletePost = async (id, token) => {
    try {
        const response = await axios.delete(`${baseUrl}/api/posts/${id}`, {
            headers: {
                'Authorization': "Bearer " + token
            },
        });
        return response.data;
    } catch (error) {
        throw new Error('Failed to delete post');
    }
};

export const updatePostStatus = async (postId, newStatus) => {
    try {
        const response = await axios.patch(`${baseUrl}/api/posts/${postId}/status`, {
            newStatus: newStatus
        }, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
        });
        return response.data;
    } catch (error) {
        console.error('Failed to update post status:', error);
        throw error;
    }
};
