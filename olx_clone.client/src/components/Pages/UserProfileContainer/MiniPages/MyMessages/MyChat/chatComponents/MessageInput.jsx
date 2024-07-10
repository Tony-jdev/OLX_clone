import React, { useState } from 'react';
import { Box, TextField } from '@mui/material';
import { useTheme } from "@mui/material/styles";
import SButton from "@/components/Tools/Button/SButton.jsx";
import { SendIcon, AddFileIcon, SVGIcon, LikeCollectionIcon, SmileIcon } from "@/assets/Icons/Icons.jsx";
import Icon from "@/components/Tools/IconContainer/Icon.jsx";

const MessageInput = ({ sendMessage, setChatId, chatId, postId, sender, receiver }) => {
    const theme = useTheme();
    const { colors } = theme.palette;

    const [message, setMessage] = useState('');

    const handleSendMessage = async () => {
        if (message.trim()) {
            const messageDto = {
                chatId,
                senderId: sender.id,
                receiverId: receiver.id,
                text: message,
                postId,
            };
            console.log(messageDto);
            await sendMessage(messageDto, setChatId);
            setMessage('');
        }
    };

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', background: colors.background.secondary, alignItems: 'center', padding: '0px 0px 16px 16px', borderTop: '0.5px solid #ddd' }}>
            <Box sx={{ display: 'flex', width: '100%', flexDirection: 'row', alignItems: 'center', }}>
                <TextField
                    variant="outlined"
                    placeholder="Введіть повідомлення"
                    fullWidth
                    autoComplete="off"
                    sx={{
                        marginRight: '8px',
                        '& .MuiOutlinedInput-root': {
                            padding: 0,
                            borderRadius: 0,
                            border: 'none',
                            '& fieldset': {
                                border: 'none',
                            },
                        },
                        '& .MuiInputBase-input': {
                            padding: '8px 0',
                            paddingLeft: '0px',
                        },
                    }}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                />
                <SButton
                    isIconButton={true}
                    sl={{padding: 0, marginRight: 8, alignSelf: 'center'}}
                    icon={
                        <Icon
                            icon={SendIcon}
                            color={colors.text.orange}
                            step={1}
                            width={24}
                            height={24}
                        />
                    }
                    action={handleSendMessage}
                />
            </Box>
            <Box sx={{ display: 'flex', width: '100%', flexDirection: 'row', alignItems: 'start', }}>
                <SButton
                    isIconButton={true}
                    sl={{padding: 0, marginRight: 8, alignSelf: 'center'}}
                    icon={
                        <Icon
                            icon={AddFileIcon}
                            color={colors.text.orange}
                            step={1}
                            width={16}
                            height={16}
                        />
                    }
                />
                <SButton
                    isIconButton={true}
                    sl={{padding: 0, marginRight: 8, alignSelf: 'center'}}
                    icon={
                        <Icon
                            icon={SVGIcon}
                            color={colors.text.orange}
                            step={1}
                            width={23.5}
                            height={16}
                        />
                    }
                />
                <SButton
                    isIconButton={true}
                    sl={{padding: 0, marginRight: 8, alignSelf: 'center'}}
                    icon={
                        <Icon
                            icon={LikeCollectionIcon}
                            color={colors.text.orange}
                            step={1}
                            width={16}
                            height={16}
                        />
                    }
                />
                <SButton
                    isIconButton={true}
                    sl={{padding: 0, marginRight: 8, alignSelf: 'center'}}
                    icon={
                        <Icon
                            icon={SmileIcon}
                            color={colors.text.orange}
                            step={1}
                            width={16}
                            height={16}
                        />
                    }
                />
            </Box>
        </Box>
    );
};

export default MessageInput;
