import React, {useEffect} from 'react';
import { useAuth } from '@/providers/AuthProvider';
import {useNavigate} from "react-router-dom";
import {useSelector} from "react-redux";
import {isAdmin} from "@/Storage/Redux/Slices/userInfoSlice.js";

const ProtectedRoute = ({ component: Component }) => {
    const { isAuthenticated, requireAuth } = useAuth();
    const admin = useSelector(isAdmin);

    const navigate = useNavigate();

    useEffect(() => {
        if (isAuthenticated === false) {
            requireAuth(() => {
            });
        }
    }, [isAuthenticated, requireAuth, navigate]);

    if (isAuthenticated === false || admin === true) {
        return null; 
    }

    return <Component />;
};

export default ProtectedRoute;
