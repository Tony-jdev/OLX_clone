import { createSlice } from '@reduxjs/toolkit';
import {
    markChatAsRead,
    getChatsByUserId,
    getChatById,
    getChats,
    createChat
} from '@/Api/chatApi.js';

const initialState = {
    chats: [],
    selectedChatId: null,
    selectedChat: null,
    customer: null,
    seller: null,
    post: null,
    message: '',
    loading: false,
    error: null,
};

export const chatSlice = createSlice({
    name: 'chat',
    initialState,
    reducers: {
        setChats: (state, action) => {
            state.chats = action.payload;
        },
        setSelectedChatId: (state, action) => {
            state.selectedChatId = action.payload;
        },
        setSelectedChat: (state, action) => {
            state.selectedChat = action.payload;
        },
        setCustomer: (state, action) => {
            state.customer = action.payload;
        },
        setSeller: (state, action) => {
            state.seller = action.payload;
        },
        setPost: (state, action) => {
            state.post = action.payload;
        },
        setMessage: (state, action) => {
            state.message = action.payload;
        },
        setLoading: (state, action) => {
            state.loading = action.payload;
        },
        setError: (state, action) => {
            state.error = action.payload;
        },
        clearChatData: (state) => {
            state.chats = [];
            state.selectedChatId = null;
            state.selectedChat = null;
            state.customer = null;
            state.seller = null;
            state.post = null;
            state.message = '';
            state.loading = false;
            state.error = null;
        }
    },
});

export const {
    setChats,
    setSelectedChatId,
    setSelectedChat,
    setCustomer,
    setSeller,
    setPost,
    setMessage,
    setLoading,
    setError,
    clearChatData
} = chatSlice.actions;

export const fetchChatsAsync = (params) => async (dispatch) => {
    try {
        dispatch(setLoading(true));
        const response = await getChats(params);
        dispatch(setChats(response.data));
        return response.data;
    } catch (error) {
        dispatch(setError(error.message));
        return error.message;
    } finally {
        dispatch(setLoading(false));
    }
};

export const fetchChatsByUserIdAsync = (userId) => async (dispatch) => {
    try {
        dispatch(setLoading(true));
        const chats = await getChatsByUserId(userId);
        dispatch(setChats(chats));
    } catch (error) {
        dispatch(setError(error.message));
    } finally {
        dispatch(setLoading(false));
    }
};

export const fetchChatByIdAsync = (id) => async (dispatch) => {
    try {
        dispatch(setLoading(true));
        const chat = await getChatById(id);
        dispatch(setSelectedChat(chat));
    } catch (error) {
        dispatch(setError(error.message));
    } finally {
        dispatch(setLoading(false));
    }
};

export const markChatAsReadAsync = (chatIds) => async (dispatch) => {
    try {
        await markChatAsRead(chatIds);
        dispatch(fetchChatsByUserIdAsync());
    } catch (error) {
        dispatch(setError(error.message));
    }
};

export const createChatAsync = (chatData) => async (dispatch) => {
    try {
        dispatch(setLoading(true));
        const newChat = await createChat(chatData);
        dispatch(fetchChatsByUserIdAsync());
        return newChat;
    } catch (error) {
        dispatch(setError(error.message));
    } finally {
        dispatch(setLoading(false));
    }
};

export const selectChats = (state) => state.chat.chats;
export const selectSelectedChatId = (state) => state.chat.selectedChatId;
export const selectSelectedChat = (state) => state.chat.selectedChat;
export const selectCustomer = (state) => state.chat.customer;
export const selectSeller = (state) => state.chat.seller;
export const selectPost = (state) => state.chat.post;
export const selectMessage = (state) => state.chat.message;
export const selectLoading = (state) => state.chat.loading;
export const selectError = (state) => state.chat.error;

export default chatSlice.reducer;
