import axios from 'axios';

import baseUrl from "@/Helpers/baseUrlHelper.js";
// Function to get favorites by userId
export const getFavoritesByUserId = async (userId) => {
    try {
        const response = await axios.get(`${baseUrl}/api/favorites/user/${userId}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching favorites by userId:', error);
        throw error;
    }
};

// Function to add a favorite
export const addFavorite = async (favoriteData) => {
    try {
        const response = await axios.post(`${baseUrl}/api/favorites`, favoriteData);
        return response.data;
    } catch (error) {
        console.error('Error adding favorite:', error);
        throw error;
    }
};

// Function to delete a favorite by favoriteId
export const deleteFavorite = async (favoriteId) => {
    try {
        const response = await axios.delete(`${baseUrl}/api/favorites/${favoriteId}`);
        return response.data;
    } catch (error) {
        console.error('Error deleting favorite:', error);
        throw error;
    }
};
