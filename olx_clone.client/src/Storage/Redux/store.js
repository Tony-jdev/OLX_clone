import { configureStore } from "@reduxjs/toolkit";
import postsReducer from './Slices/postSlice.js';
import postInfoReducer from './Slices/postInfoSlice.js';
import themeAndLocaleReducer from "@/Storage/Redux/Slices/themeAndLocaleSlice.js";
import {combineReducers} from "redux";
import persistConfig from "@/Storage/Redux/persistConfig.js";
import {persistReducer, persistStore} from "redux-persist";

const rootReducer = combineReducers({
    posts: postsReducer,
    postInfo: postInfoReducer,
    themeAndLocale: themeAndLocaleReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
    reducer: persistedReducer,
});

export const persistor = persistStore(store);
export default store;