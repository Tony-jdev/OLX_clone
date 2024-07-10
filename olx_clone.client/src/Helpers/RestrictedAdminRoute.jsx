import React, { useEffect } from 'react';
import { useAuth } from '@/providers/AuthProvider';
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { isAdmin } from "@/Storage/Redux/Slices/userInfoSlice.js";

const RestrictedAdminRoute = ({ component: Component }) => {
    const admin = useSelector(isAdmin);
    const navigate = useNavigate();

    useEffect(() => {
        if (admin === true) {
            navigate('/admin');
        }
    }, [navigate, admin]);

    if (admin === true) {
        return null;
    }

    return <Component />;
};

export default RestrictedAdminRoute;
