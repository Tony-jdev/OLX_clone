import React from 'react';
import { Box, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import Text from "@/components/Tools/TextContainer/Text.jsx";

const Message = ({ message, isUserMessage }) => {
    const theme = useTheme();
    const { colors } = theme.palette;

    return (
        <Box
            sx={{
                display: 'flex', 
                justifyContent: isUserMessage ? 'flex-end' : 'flex-start',
                marginBottom: '10px',
            }}
        >
            <Box
                sx={{
                    maxWidth: '70%',
                    padding: '10px',
                    borderRadius: isUserMessage ? '10px 10px 0 10px' : '10px 10px 10px 0',
                    backgroundColor: isUserMessage ? colors.background.orange : colors.background.secondary,
                }}
            >
                <Text type={'body'} color={isUserMessage ? colors.text.primary : colors.text.secondary}>{message.text}</Text>
            </Box>
        </Box>
    );
};

export default Message;
