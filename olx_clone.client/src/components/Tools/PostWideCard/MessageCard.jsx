import React, {useEffect, useState} from 'react';
import { Avatar, Box, } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import Text from "@/components/Tools/TextContainer/Text.jsx";
import {formatTimeFromISO} from "@/Helpers/DateHelper.js";
import {useDispatch} from "react-redux";
import {fetchUserById} from "@/Api/userApi.js";

const MessageCard = ({ ad, w, onChatSelect }) => {
    const theme = useTheme();
    const { colors } = theme.palette;
    
    const title = ad.name;
    const photo = ad.photoUrl;
    const message = ad.latestMessage?.text;
    const time = formatTimeFromISO(ad.latestMessage?.createdAt);
    
    const dispatch = useDispatch();
    const [sender, setSender] = useState(null);
    
    const getSender = async (userId) => {
        const res = await fetchUserById(userId);
        setSender(res.data);
        console.log(res.data);
    }
    
    useEffect(()=>{
        if(w === 'b')
        {
            getSender(ad.sellerId);
        }
        else if(w === 's')
        {
            getSender(ad.customerId);
        }
    },[ad, w]);

    const handleClick = () => {
        onChatSelect(ad.id);
    };
    
    return (
        <Box sx={{ display: 'flex', alignItems: 'center', maxWidth: '955px', marginLeft:'11px', padding: '0px', marginBottom: '20px', borderBottom: `1px solid ${colors.divider}`, cursor: 'pointer' }}
        onClick={handleClick}
        >
            <Avatar src={photo} variant="rounded" sx={{ marginRight: '10px', width: '85px', height: '92px' }} />
            <Box style={{width: '100%'}}>
                <Box style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
                    <Text type={'Body'} color={colors.text.orange} >{sender?.name}</Text>
                    <Text type={'Body'} color={colors.text.orange} >{time}</Text>
                </Box>
                <Text type={'Body'} color={colors.text.secondary}>{title}</Text>
                <Text type={'Body'}>{message}</Text>
            </Box>
        </Box>
    );
};

export default MessageCard;
