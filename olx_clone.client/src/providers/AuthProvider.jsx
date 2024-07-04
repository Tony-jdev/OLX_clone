import React, { createContext, useContext, useState, useEffect } from 'react';
import AuthModal from '@/components/Pages/Auth/Auth.jsx';
import {useSelector} from "react-redux";
import {isUserLoggedIn} from "@/Storage/Redux/Slices/userInfoSlice.js";
import {useNavigate} from "react-router-dom";
import {useAlert} from "@/providers/AlertsProvider.jsx"; 
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    
    const isLogedIn = useSelector(isUserLoggedIn);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [showAuthModal, setShowAuthModal] = useState(false);
    const navigate = useNavigate();
    
    const checkAuthentication = () => {
        if(isLogedIn)
        setIsAuthenticated(true);
        else setIsAuthenticated(false);
    };

    const requireAuth = (callback) => {
        if (!isAuthenticated) {
            if(showAuthModal === false)
            setShowAuthModal(true);
        } else {
            callback();
        }
    };
    
    const moveTo = (nav) => {
        if(isAuthenticated)
            navigate(nav);
    };

    const openAuth = () => {
        setShowAuthModal(true);
    };
    
    useEffect(() => {
        checkAuthentication();
        if(isLogedIn)
            setShowAuthModal(false);
    }, [isLogedIn]);

    return (
        <AuthContext.Provider value={{ isAuthenticated, requireAuth, moveTo, openAuth}}>
            {children}
            {showAuthModal && <AuthModal handleClose={() => setShowAuthModal(false)} open={showAuthModal} />}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
