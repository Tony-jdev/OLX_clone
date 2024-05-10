import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import {getPostById} from "@/Api/postInfoApi.js";

const initialState = {
    post: null,
    loading: false,
    error: null,
};

const postByIdSlice = createSlice({
    name: 'postById',
    initialState,
    reducers: {
        fetchPostByIdStart(state) {
            state.loading = true;
            state.error = null;
        },
        fetchPostByIdSuccess(state, action) {
            state.loading = false;
            state.post = action.payload;
            state.error = null;
        },
        fetchPostByIdFailure(state, action) {
            state.loading = false;
            state.error = action.payload;
        },
    },
});

export const { fetchPostByIdStart, fetchPostByIdSuccess, fetchPostByIdFailure } = postByIdSlice.actions;

export const fetchPostById = (postId) => async (dispatch) => {
    dispatch(fetchPostByIdStart());
    try {
        const response = await getPostById(postId);
        dispatch(fetchPostByIdSuccess(response.data));
    } catch (error) {
        dispatch(fetchPostByIdFailure(error.response.data));
    }
};

export default postByIdSlice.reducer;
