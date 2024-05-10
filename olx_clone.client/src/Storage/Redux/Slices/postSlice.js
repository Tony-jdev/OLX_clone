import { createSlice } from '@reduxjs/toolkit';
import { GetPosts } from '@/Api/postApi.js';

const initialState = {
    searchText: "",
    posts: [],
    selectedPost: null,
    loading: false,
    error: null,
};

export const postsSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {
        setSearchText: (state, action)=>{
          state.searchText = action.payload;  
        },
        setPosts: (state, action) => {
            state.posts = action.payload;
        },
        setSelectedPost: (state, action) => {
            state.selectedPost = action.payload;
        },
        setLoading: (state, action) => {
            state.loading = action.payload;
        },
        setError: (state, action) => {
            state.error = action.payload;
        },
    },
});

export const {setSearchText, setPosts, setSelectedPost, setLoading, setError } = postsSlice.actions;

export const fetchPostsAsync = () => async (dispatch) => {
    try {
        dispatch(setLoading(true));
        const posts = await GetPosts();
        dispatch(setPosts(posts.data));
    } catch (error) {
        dispatch(setError(error.message));
    } finally {
        dispatch(setLoading(false));
    }
};

export const selectSearchText = (state) => state.posts.searchText;
export const selectPosts = (state) => state.posts.posts;
export const selectSelectedPost = (state) => state.posts.selectedPost;
export const selectLoading = (state) => state.posts.loading;
export const selectError = (state) => state.posts.error;

export default postsSlice.reducer;