import React from 'react';
import {Box, Typography} from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import {CheckIcon} from "@/assets/Icons/Icons.jsx";
import Icon from "@/components/Tools/IconContainer/Icon.jsx";
import {formatTimeFromISO} from "@/Helpers/DateHelper.js";
import {useTheme} from "@mui/material/styles";
import Text from "@/components/Tools/TextContainer/Text.jsx";

const Message = ({ message, isSentByUser}) => {
    const theme = useTheme();
    const { colors } = theme.palette;
    
    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: isSentByUser ? 'flex-end' : 'flex-start', marginBottom: '16px', marginRight: '8px' }}>
            <Box sx={{
                backgroundColor: isSentByUser ? colors.background.orange : '#f5e5d5',
                padding: '12px',
                borderRadius: isSentByUser ? '20px 20px 0px 20px' : '20px 20px 20px 0px',
                maxWidth: '867px',
                position: 'relative',
                wordWrap: 'break-word',
                display: 'flex',
                flexDirection: 'column',
            }}>
                <Box style={{display: 'flex'}}>
                    <Text type={'Body'}>
                        {message.text}
                    </Text>
                    {isSentByUser && message.isRead &&
                        <Icon
                            icon={CheckIcon}
                            sr={{marginLeft: '10px'}}
                            step={1}
                            width={24}
                            height={24}
                        />
                    }
                </Box>
                <Box sx={{ display: 'flex', justifyContent: isSentByUser ? 'end' : 'start', alignItems: 'center', }}>
                    <Text type={'Body'} color={'#838383'}>
                        {formatTimeFromISO(message.createdAt)}
                    </Text>
                </Box>
            </Box>
        </Box>
    );
};

export default Message;
