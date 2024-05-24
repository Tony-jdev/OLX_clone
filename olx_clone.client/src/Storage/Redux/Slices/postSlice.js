import { createSlice } from '@reduxjs/toolkit';
import {GetPostByCategoryId, GetPostById, GetPosts} from '@/Api/postApi.js';

const initialState = {
    categorySku: localStorage.getItem('categorySku') ?? "",
    searchText: localStorage.getItem('searchText') ?? "",
    orderBy: localStorage.getItem('orderBy') ?? "",
    page: parseInt(localStorage.getItem('page')) ?? 1,
    pageSize : parseInt(localStorage.getItem('pageSize')) ?? 1,
    pageCount : parseInt(localStorage.getItem('pageCount')) ?? 1,
    posts: [],
    selectedPostId: null,
    selectedPost: null,
    loading: false,
    error: null,
};

export const postsSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {
        setCategorySku: (state, action)=>{
            state.categorySku = action.payload;
            localStorage.setItem('categorySku', action.payload);
        },
        setSearchText: (state, action)=>{
            state.searchText = action.payload;
            localStorage.setItem('searchText', action.payload);
        },
        setOrderBy: (state, action)=>{
            state.orderBy = action.payload;
            localStorage.setItem('orderBy', action.payload);
        },
        setPage: (state, action)=>{
            state.page = action.payload;
            localStorage.setItem('page', action.payload);
        },
        setPageSize: (state, action) => {
            state.pageSize = action.payload;
            localStorage.setItem('pageSize', action.payload);
        },
        setPageCount: (state, action) => {
            state.pageCount = action.payload;
            localStorage.setItem('pageCount', action.payload);
        },
        setPosts: (state, action) => {
            state.posts = action.payload;
        },
        setSelectedPostId: (state, action) => {
            state.selectedPostId = action.payload;
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
        clearData: (state) => {
            state.categorySku = "";
            state.searchText = "";
            state.orderBy = "";
            state.page = 1;
            state.pageSize = 1;
            state.pageCount = 1;
            state.posts = [];
            state.selectedPostId = null;
            state.selectedPost = null;
            state.loading = false;
            state.error = null;

            localStorage.setItem('categorySku', '');
            localStorage.setItem('searchText', '');
            localStorage.getItem('orderBy', '');
            localStorage.setItem('page', 1);
            localStorage.setItem('pageSize', 1);
            localStorage.setItem('pageCount', 1);
        }
    },
});

export const {
    setCategorySku,
    setSearchText, 
    setOrderBy, 
    setPage, 
    setPageSize, 
    setPageCount, 
    setPosts,
    setSelectedPostId, 
    setSelectedPost, 
    setLoading, 
    setError, 
    clearData } = postsSlice.actions;

export const fetchPostsAsync = () => async (dispatch, getState) => {
    const state = getState();
    const queryParams = {
        searchTerm: state.posts.searchText, 
        orderBy: state.posts.orderBy, 
        page: state.posts.page 
    };
    
    try {
        dispatch(setLoading(true));
        const posts = await GetPosts(queryParams);
        console.log(posts.data);
        dispatch(setPosts(posts.data.items));
        dispatch(setPageSize(posts.data.pageSize));
        dispatch(setPageCount(posts.data.totalCount));
    } catch (error) {
        dispatch(setError(error.message));
    } finally {
        dispatch(setLoading(false));
    }
};

export const fetchPostsByCategoryAsync = () => async (dispatch, getState) => {
    const state = getState();
    const id = state.posts.categorySku;
    const queryParams = {
        searchTerm: state.posts.searchText,
        orderBy: state.posts.orderBy,
        page: state.posts.page
    };

    try {
        dispatch(setLoading(true));
        const posts = await GetPostByCategoryId(queryParams, id);
        console.log(posts.data);
        dispatch(setPosts(posts.data.items));
        dispatch(setPageSize(posts.data.pageSize));
        dispatch(setPageCount(posts.data.totalCount));
    } catch (error) {
        dispatch(setError(error.message));
    } finally {
        dispatch(setLoading(false));
    }
};

export const fetchPostByIdAsync = () => async (dispatch, getState) => {
    const state = getState();
    const id = state.posts.selectedPostId;

    try {
        dispatch(setLoading(true));
        const post = await GetPostById(id);
        console.log(post.data);
        dispatch(setSelectedPost(post.data));
    } catch (error) {
        dispatch(setError(error.message));
    } finally {
        dispatch(setLoading(false));
    }
};

export const selectCategorySku = (state) => state.posts.categorySku;
export const selectSearchText = (state) => state.posts.searchText;
export const selectOrderBy = (state) => state.posts.orderBy;
export const selectPage = (state) => state.posts.page;
export const selectPageSize = (state) => state.posts.pageSize;
export const selectPageCount = (state) => state.posts.pageCount;
export const selectPosts = (state) => state.posts.posts;
export const selectSelectedPostId = (state) => state.posts.selectedPostId;
export const selectSelectedPost = (state) => state.posts.selectedPost;
export const selectLoading = (state) => state.posts.loading;
export const selectError = (state) => state.posts.error;

export default postsSlice.reducer;