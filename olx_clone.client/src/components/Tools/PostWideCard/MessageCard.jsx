import React, {useEffect, useState} from 'react';
import { Avatar, Box, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import Text from "@/components/Tools/TextContainer/Text.jsx";
import {formatTimeFromISO} from "@/Helpers/DateHelper.js";

const MessageCard = ({ ad }) => {
    const theme = useTheme();
    const { colors } = theme.palette;
    
    const title = ad.name;
    const photo = ad.photoUrl;
    const message = ad.latestMessage?.text;
    const time = formatTimeFromISO(ad.latestMessage?.createdAt);
    
    const [sender, setSender] = useState(null);
    
    useEffect(()=>{
        
    },[]);
    
    
    return (
        <Box sx={{ display: 'flex', alignItems: 'center', maxWidth: '955px', marginLeft:'11px', padding: '0px', marginBottom: '20px', borderBottom: `1px solid ${colors.divider}` }}>
            <Avatar src={photo} variant="rounded" sx={{ marginRight: '10px', width: '85px', height: '92px' }} />
            <Box style={{width: '100%'}}>
                <Box style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
                    <Text type={'Body'} color={colors.text.orange} >{ad.sender}</Text>
                    <Text type={'Body'} color={colors.text.orange} >{time}</Text>
                </Box>
                <Text type={'Body'} color={colors.text.secondary}>{title}</Text>
                <Text type={'Body'}>{message}</Text>
            </Box>
        </Box>
    );
};

export default MessageCard;
