import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    theme: 'light',
    locale: 'ua',
};

const themeAndLocaleSlice = createSlice({
    name: 'themeAndLocale',
    initialState,
    reducers: {
        changeTheme(state, action) {
            state.theme = action.payload;
        },
        changeLocale(state, action) {
            state.locale = action.payload;
        },
    },
});

export const { changeTheme, changeLocale } = themeAndLocaleSlice.actions;

export const selectTheme = (state) => state.themeAndLocale.theme;
export const selectLocale = (state) => state.themeAndLocale.locale;


export default themeAndLocaleSlice.reducer;
