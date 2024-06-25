import {createSlice} from '@reduxjs/toolkit';
import {fetchUserById} from "@/Api/userApi.js";
import {fetchUserDataAsync} from "@/Storage/Redux/Slices/userInfoSlice.js";

const initialState = {
    userPosts: [],
    loading: false,
    success: false,
    error: null,
};

export const userDataSlice = createSlice({
    name: 'userData',
    initialState,
    reducers: {
        setUserPosts: (state, action)=>{
            state.userPosts = action.payload;
        },
        setLoading: (state, action) => {
            state.loading = action.payload;
        },
        setSuccess: (state, action) => {
            state.success = action.payload;
        },
        setError: (state, action) => {
            state.error = action.payload;
        },
        clearData: (state) => {
            state.userPosts = [];
            state.loading = false;
            state.success = false;
            state.error = null;
        }
    },
});

export const {
    setUserPosts,
    setLoading,
    setSuccess,
    setError,
    clearData
} = userDataSlice.actions;

export const selectUserPosts = (state) => state.userData.userPosts;
export const selectLoading = (state) => state.userData.loading;
export const selectSuccess = (state) => state.userData.success;
export const selectError = (state) => state.userData.error;

export const fetchUserPostsAsync = () => async (dispatch, getState) => {
    try {
        await dispatch(fetchUserDataAsync());
        const state = getState();
        const userData = state.userInfo.user;
        const posts = userData ? userData.posts : [];
        console.log(posts);
        dispatch(setUserPosts(posts));
    } catch (error) {
        console.error('Failed to decode token:', error);
        return null;
    }
};


export default userDataSlice.reducer;