import React from 'react';
import {Navigate} from 'react-router-dom';
import {useSelector } from 'react-redux';
import {isUserLoggedIn} from '../Storage/Redux/Slices/UserInfoSlice.js';

const ProtectedRoute = ({ element, navPath }) => {
    const isLogged = useSelector(isUserLoggedIn);
    return isLogged ? element : <Navigate to={navPath ?? '/auth'}/>;
};

export default ProtectedRoute;
