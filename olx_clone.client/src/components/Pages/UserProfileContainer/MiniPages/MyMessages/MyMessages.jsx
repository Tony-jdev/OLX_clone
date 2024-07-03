import React, { useEffect, useState } from 'react';
import { Box, Typography } from '@mui/material';
import Text from "@/components/Tools/TextContainer/Text.jsx";
import { TabsContainerStyles } from "@/components/Pages/UserProfileContainer/MiniPages/MyPosts/Styles.js";
import { useTheme } from "@mui/material/styles";
import PostWideList from "@/components/Tools/PostWideList/PostWideList.jsx";
import { getRecentViews } from "@/Helpers/recentViewsHelper.js";
import { GetPostById } from "@/Api/postApi.js";

const MyMessages = () => {
    const theme = useTheme();
    const { colors } = theme.palette;

    const [ads, setAds] = useState([]);

    useEffect(() => {
       
    }, []);

    return (
        <Box style={{
            maxWidth: 980, maxHeight: 804, height: '100vh', width: '100vw', paddingTop: '20px', paddingLeft: '5px',
            borderRadius: '10px',
            boxShadow: colors.boxShadow,
            background: colors.background.secondary
        }}>
            <Typography variant="h6">My messages</Typography>
            <Box sx={{ marginTop: '20px' }}>
                <PostWideList ads={ads} />
            </Box>
            <Text type={'Body'} sl={{ textAlign: 'right', marginTop: '20px', marginBottom: '20px', marginRight: '20px' }}>
                Всього переглядів: {ads ? ads.length : 0}
            </Text>
        </Box>
    );
};

export default MyMessages;
