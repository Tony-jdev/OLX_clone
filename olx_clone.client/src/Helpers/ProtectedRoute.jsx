import React, {useEffect} from 'react';
import { useAuth } from '@/providers/AuthProvider';
import {useNavigate} from "react-router-dom";

const ProtectedRoute = ({ component: Component }) => {
    const { isAuthenticated, requireAuth } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (isAuthenticated === false) {
            requireAuth(() => {
            });
        }
    }, [isAuthenticated, requireAuth, navigate]);

    if (isAuthenticated === false) {
        return null; 
    }

    return <Component />;
};

export default ProtectedRoute;
