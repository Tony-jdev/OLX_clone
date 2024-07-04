import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectPost, selectCustomer, selectSeller } from '@/Storage/Redux/Slices/chatSlice.js';
import Chat from "@/components/Tools/ChatComponent/Chat.jsx";
import {fetchUserDataAsync} from "@/Storage/Redux/Slices/userInfoSlice.js";

const ChatContainer = ({open, onClose }) => {
    const dispatch = useDispatch();
    const post = useSelector(selectPost);
    const sender = useSelector(selectCustomer);
    const receiver = useSelector(selectSeller);

    useEffect(() => {
        const updateData = async () => {
            try {
                await dispatch(fetchUserDataAsync());
                console.log(sender);
                console.log(receiver);
                console.log(post);
            } catch (error) {
                console.error('Failed to update data:', error);
            }
        };

        updateData();
    }, [post]);

    return (
        <div>
            <Chat post={post} sender={sender} receiver={receiver} open={open} onClose={onClose} isSeller={true}/>
        </div>
    );
}

export default ChatContainer;
