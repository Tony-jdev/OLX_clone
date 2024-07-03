import React, { useEffect } from 'react';
import { Box, Typography, Tab, Tabs } from '@mui/material';
import Text from "@/components/Tools/TextContainer/Text.jsx";
import { TabsContainerStyles } from "@/components/Pages/UserProfileContainer/MiniPages/MyPosts/Styles.js";
import { useTheme } from "@mui/material/styles";
import PostWideList from "@/components/Tools/PostWideList/PostWideList.jsx";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserPostsAsync, selectUserPosts } from "@/Storage/Redux/Slices/userDataSlice.js";

const MyPosts = () => {
    const theme = useTheme();
    const { colors } = theme.palette;

    const [selectedTab, setSelectedTab] = React.useState(0);

    const dispatch = useDispatch();
    const ads = useSelector(selectUserPosts);

    const handleChange = (event, newValue) => {
        setSelectedTab(newValue);
    };

    useEffect(() => {
        dispatch(fetchUserPostsAsync());
    }, [dispatch]);

    const activeAds = ads.filter(ad => ad.status === 'Active');
    const inactiveAds = ads.filter(ad => ad.status !== 'Active');

    return (
        <Box style={{
            maxWidth: 980, maxHeight: 804, height: '100vh', width: '100vw', paddingTop: '20px', paddingLeft: '5px',
            borderRadius: '10px',
            boxShadow: colors.boxShadow,
            background: colors.background.secondary
        }}>
            <Tabs
                value={selectedTab}
                onChange={handleChange}
                aria-label="profile tabs"
                sx={{
                    ...TabsContainerStyles,
                    '& .MuiTabs-indicator': {
                        backgroundColor: colors.text.revers,
                    },
                }}
            >
                <Tab label={<Text type={'Body'}>Активні</Text>} />
                <Tab label={<Text type={'Body'}>Неактивні</Text>} />
            </Tabs>
            <Box sx={{ marginTop: '20px' }}>
                {selectedTab === 0 && <PostWideList ads={activeAds} />}
                {selectedTab === 1 && <PostWideList ads={inactiveAds} />}
            </Box>
        </Box>
    );
};

export default MyPosts;
