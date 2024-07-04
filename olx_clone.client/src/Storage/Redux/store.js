import { configureStore } from "@reduxjs/toolkit";
import postsReducer from './Slices/postSlice.js';
import userAuthReducer from './Slices/userAuthSlice.js';
import userInfoReducer from './Slices/userInfoSlice.js';
import userDataReducer from './Slices/userDataSlice.js';
import themeAndLocaleReducer from "@/Storage/Redux/Slices/themeAndLocaleSlice.js";
import chatReducer from './Slices/chatSlice.js';
import {combineReducers} from "redux";
import persistConfig from "@/Storage/Redux/persistConfig.js";
import {persistReducer, persistStore} from "redux-persist";

const rootReducer = combineReducers({
    posts: postsReducer,
    userAuth: userAuthReducer,
    userInfo: userInfoReducer,
    userData: userDataReducer,
    themeAndLocale: themeAndLocaleReducer,
    chat: chatReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
});

export const persistor = persistStore(store);
export default store;