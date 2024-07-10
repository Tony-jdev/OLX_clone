import React from 'react';
import {Route, Navigate, useNavigate} from 'react-router-dom';
import { useSelector } from 'react-redux';
import { isAdmin } from '@/Storage/Redux/Slices/userInfoSlice.js';

const RestrictAdminRoute = ({ component: Component, ...rest }) => {
    const admin = useSelector(isAdmin);
    const navigate = useNavigate();

    return (
        <Route
            {...rest}
            render={props =>
                !admin ? (
                    <Component {...props} />
                ) : (
                    <Navigate to="/admin" />
                )
            }
        />
    );
};

export default RestrictAdminRoute;
