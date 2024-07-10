import {createSlice} from '@reduxjs/toolkit';
import { jwtDecode } from 'jwt-decode';
import { createSelector } from 'reselect';
import {fetchUserById, fetchUserByIdShort} from "@/Api/userApi.js";

const initialState = {
    token: localStorage.getItem('userToken') ?? '',
    user: null,
    loading: false,
    success: false,
    error: null,
};

export const userInfoSlice = createSlice({
    name: 'userInfo',
    initialState,
    reducers: {
        setToken: (state, action)=>{
            state.token = action.payload;
        },
        setUser: (state, action)=>{
            state.user = action.payload;
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
        logIn: (state, action) => {
            state.token = action.payload;
            localStorage.setItem('userToken', action.payload);
        },
        logOut: (state) => {
            state.token = '';
            state.user = null;
            localStorage.removeItem('userToken');
        },
        clearData: (state) => {
            state.token = "";
            state.user = null
            state.loading = false;
            state.success = false;
            state.error = null;
        }
    },
});

export const {
    setToken,
    setUser,
    setLoading,
    setSuccess,
    setError,
    logIn,
    logOut,
    clearData 
} = userInfoSlice.actions;

export const selectToken = (state) => state.userInfo.token;
export const selectUser = (state) => state.userInfo.user;
export const selectLoading = (state) => state.userInfo.loading;
export const selectSuccess = (state) => state.userInfo.success;
export const selectError = (state) => state.userInfo.error;

export const fetchUserDataAsync = () => async (dispatch, getState) => {
    const state = await getState();
    const token = state.userInfo.token; 
    try {
        const data = jwtDecode(token);
        console.log(data);
        const user = await fetchUserById(data.uid);
        console.log(user);
        dispatch(setUser(user.data));
        return user.data;
    } catch (error) {
        console.error('Failed to decode token:', error);
        return null;
    }
};
export const fetchUserDataShortAsync = () => async (dispatch, getState) => {
    const state = await getState();
    const token = state.userInfo.token;
    try {
        const data = jwtDecode(token);
        console.log(data);
        const user = await fetchUserByIdShort(data.uid);
        console.log(user);
        return user.data;
    } catch (error) {
        console.error('Failed to decode token:', error);
        return null;
    }
};

export const isUserLoggedIn = createSelector(
    [selectToken],
    (token) => !!token
);

export default userInfoSlice.reducer;