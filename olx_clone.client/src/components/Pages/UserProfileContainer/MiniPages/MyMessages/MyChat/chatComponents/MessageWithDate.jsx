import React from 'react';
import { Box, Typography } from '@mui/material';
import Message from './Message';
import {formatDate} from "@/Helpers/DateHelper.js";
import Text from "@/components/Tools/TextContainer/Text.jsx";
import {LabelMedium} from "@/components/Tools/TextContainer/Styles.js";
import {useTheme} from "@mui/material/styles";

const MessageWithDate = ({ message, showDate, isSentByUser }) => {
    const theme = useTheme();
    const { colors } = theme.palette;
    return (
        <>
            {showDate && (
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '10px', margin: '10px 0px' }}>
                    <Text textSt={LabelMedium} color={colors.text.orange}>
                        {formatDate(message.createdAt)}
                    </Text>
                </Box>
            )}
            <Message message={message} isSentByUser={isSentByUser}/>
        </>
    );
};

export default MessageWithDate;
