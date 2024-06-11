import {createSlice} from '@reduxjs/toolkit';
import {LogUser, RegUser} from "@/Api/authApi.js";
import {logIn} from "@/Storage/Redux/Slices/UserInfoSlice.js";

const initialState = {
    name: "",
    surname: "",
    email: "",
    password: "",
    loading: false,
    success: false,
    message: '',
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
        setMessage: (state, action) => {
            state.message = action.payload;
        },
        setError: (state, action) => {
            state.error = action.payload;
        },
        clearInput: (state) => {
            state.name = "";
            state.surname = "";
            state.email = "";
            state.password = "";
        },
        clearData: (state) => {
            state.name = "";
            state.surname = "";
            state.email = "";
            state.password = "";
            state.loading = false;
            state.success = false;
            state.message = false;
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
    setMessage,
    setError,
    clearInput,
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
        const response = await RegUser(user);
        dispatch(setSuccess(response.success??false));
        dispatch(setMessage(response.message));
        return response.success??false;
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
        dispatch(setSuccess(response.success ?? false));

        if(response.success)
        {
            const { token } = response.data;
            dispatch(logIn(token));
            dispatch(setMessage(response.message));
        }
        else {
            dispatch(setMessage("Error password or email"));
        }
        return response.success ?? false;
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
export const selectMessage = (state) => state.userAuth.message;
export const selectError = (state) => state.userAuth.error;

export default userAuthSlice.reducer;