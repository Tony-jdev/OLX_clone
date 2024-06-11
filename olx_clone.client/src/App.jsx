import './App.css';
import * as React from 'react';
import { Route, Routes } from 'react-router-dom';
import AppRoutes from './AppRoutes.jsx';
import Layout from './components/Layout/Layout';
import {Provider} from "react-redux";
import store, {persistor} from "@/Storage/Redux/store.js";
import {PersistGate} from "redux-persist/integration/react";
function App() {
    return (
            <Provider store={store}>
                    <PersistGate loading={null} persistor={persistor}>
                        <Layout>
                            <Routes>
                                {AppRoutes.map((route, index) => {
                                    const { element, path, ...rest } = route;
                                    return <Route key={index}  element={element} path={path} {...rest}/>;
                                })}
                            </Routes>
                        </Layout>
                    </PersistGate>
            </Provider>
    );
}

export default App;