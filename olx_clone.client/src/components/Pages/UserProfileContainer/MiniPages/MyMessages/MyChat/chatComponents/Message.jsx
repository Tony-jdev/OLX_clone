import React from 'react';
import {Box, Typography} from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import {CheckIcon} from "@/assets/Icons/Icons.jsx";
import Icon from "@/components/Tools/IconContainer/Icon.jsx";

const Message = ({ message, isSentByUser}) => {
    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: isSentByUser ? 'flex-end' : 'flex-start', marginBottom: '16px' }}>
            <Box sx={{
                backgroundColor: isSentByUser ? 'orange' : '#f5e5d5',
                color: isSentByUser ? '#fff' : '#000',
                padding: '12px',
                borderRadius: '16px',
                maxWidth: '867px',
                position: 'relative',
                wordWrap: 'break-word',
                display: 'flex',
                flexDirection: 'column',
            }}>
                <Box style={{display: 'flex'}}>
                    <Typography variant="body1" sx={{ wordWrap: 'break-word' }}>{message.text}</Typography>
                    {isSentByUser &&
                        <Icon
                            icon={CheckIcon}
                            sr={{marginLeft: '10px'}}
                            step={1}
                            width={24}
                            height={24}
                        />
                    }
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'end', alignItems: 'center', }}>
                    <Typography variant="body2" sx={{ color: '#fff', fontSize: '0.75rem' }}>{message.createdAt}</Typography>
                </Box>
            </Box>
        </Box>
    );
};

export default Message;
