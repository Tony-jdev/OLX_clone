import React from 'react';
import { Box, Avatar } from '@mui/material';
import SButton from "@/components/Tools/Button/SButton.jsx";
import Icon from "@/components/Tools/IconContainer/Icon.jsx";
import {DeleteIcon, SaveMarkIcon} from "@/assets/Icons/Icons.jsx";
import {useTheme} from "@mui/material/styles";
import Text from "@/components/Tools/TextContainer/Text.jsx"

const ChatHeader = ({ user }) => {
    const theme = useTheme();
    const { colors } = theme.palette;
    
    return (
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '28px 8px', backgroundColor: colors.transparent, boxShadow: colors.boxShadow, borderRadius: '10px' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', }}>
                <Avatar src={user?.profilePhotoUrl} sx={{width: '60px', height: '60px'}}/>
                <Box sx={{ marginLeft: '20px' }}>
                    <Text type={'Title'} color={colors.text.orange} >{user?.name}</Text>
                    <Text type={'Body'} color={colors.text.secondary} >{`Онлайн в ${user?.onlineTime}`}</Text>
                </Box>
            </Box>
            <Box>
                <SButton
                    isIconButton={true}
                    sl={{padding: '0px'}}
                    icon={<Icon
                        icon={SaveMarkIcon}
                        step={1}
                        width={36}
                        height={36}
                    />}
                />
                <SButton
                    isIconButton={true}
                    sl={{padding: '0px'}}
                    icon={<Icon
                        icon={DeleteIcon}
                        step={1}
                        width={36}
                        height={36}
                    />}
                />
            </Box>
        </Box>
    );
};

export default ChatHeader;
