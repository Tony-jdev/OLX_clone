import React, { createContext, useContext, useState } from 'react';
import AddPostModal from '@/components/Tools/AddPostModal/AddPostModal.jsx';
import {useAuth} from "@/providers/AuthProvider.jsx";

const AddPostContext = createContext();

export const AddPostProvider = ({ children }) => {
    const [isAddPostModalOpen, setAddPostModalOpen] = useState(false);
    const { isAuthenticated, openAuth} = useAuth();

    const showAddPostModal = () => {
        if(isAuthenticated)
        setAddPostModalOpen(true);
        else openAuth();
    };

    const hideAddPostModal = () => {
        setAddPostModalOpen(false);
    };

    return (
        <AddPostContext.Provider value={{ showAddPostModal, hideAddPostModal }}>
            {children}
            <AddPostModal open={isAddPostModalOpen} handleClose={hideAddPostModal} />
        </AddPostContext.Provider>
    );
};

export const useAddPost = () => {
    return useContext(AddPostContext);
};
