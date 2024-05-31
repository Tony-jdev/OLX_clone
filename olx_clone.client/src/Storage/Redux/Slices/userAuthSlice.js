import {createSlice} from '@reduxjs/toolkit';
import {LogUser, RegUser} from "@/Api/authApi.js";

const initialState = {
    name: "",
    surname: "",
    email: "",
    password: "",
    loading: false,
    success: false,
    error: null,
};

export const userAuthSlice = createSlice({
    name: 'userAuth',
    initialState,
    reducers: {
        setName: (state, action)=>{
            state.name = action.payload;
        },
        setSurname: (state, action)=>{
            state.surname = action.payload;
        },
        setEmail: (state, action)=>{
            state.email = action.payload;
        },
        setPassword: (state, action)=>{
            state.password = action.payload;
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
            state.name = "";
            state.surname = "";
            state.email = "";
            state.password = "";
            state.loading = false;
            state.success = false;
            state.error = null;
        }
    },
});

export const {
    setName,
    setSurname,
    setEmail,
    setPassword,
    setLoading,
    setSuccess,
    setError,
    clearData } = userAuthSlice.actions;

export const fetchRegistrationAsync = () => async (dispatch, getState) => {
    const state = getState();
    const name = state.userAuth.name;
    const surname = state.userAuth.surname;
    const email = state.userAuth.email;
    const password = state.userAuth.password;

    const user = {
        name,
        surname,
        email,
        password
    };

    try {
        dispatch(setLoading(true));
        console.log('Registering user:', user);
        const response = await RegUser(user);
        dispatch(setSuccess(response.success));
        console.log('Success:', response);
    } catch (error) {
        dispatch(setError(error.message));
    } finally {
        dispatch(setLoading(false));
    }
};

export const fetchLogInAsync = () => async (dispatch, getState) => {
    const state = getState();
    const queryParams = {
        email: state.userAuth.email,
        password: state.userAuth.password
    };

    try {
        dispatch(setLoading(true));
        const response = await LogUser(queryParams);
        console.log('Success:', response.data, response.success);
    } catch (error) {
        dispatch(setError(error.message));
    } finally {
        dispatch(setLoading(false));
    }
};



export const selectName = (state) => state.userAuth.name;
export const selectSurname = (state) => state.userAuth.surname;
export const selectEmail = (state) => state.userAuth.email;
export const selectPassword = (state) => state.userAuth.password;
export const selectLoading = (state) => state.userAuth.loading;
export const selectSuccess = (state) => state.userAuth.success;
export const selectError = (state) => state.userAuth.error;

export default userAuthSlice.reducer;