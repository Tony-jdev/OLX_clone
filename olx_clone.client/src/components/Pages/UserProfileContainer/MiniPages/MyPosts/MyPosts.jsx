import React, { useEffect } from 'react';
import { Box, Tab, Tabs } from '@mui/material';
import Text from "@/components/Tools/TextContainer/Text.jsx";
import { TabsContainerStyles } from "@/components/Pages/UserProfileContainer/MiniPages/MyPosts/Styles.js";
import { useTheme } from "@mui/material/styles";
import PostWideList from "@/components/Tools/PostWideList/PostWideList.jsx";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserPostsAsync, selectUserPosts } from "@/Storage/Redux/Slices/userDataSlice.js";
import { FormattedMessage } from "react-intl";

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
    const inactiveAds = ads.filter(ad => ad.status === 'Inactive');
    const soldAds = ads.filter(ad => ad.status === 'Sold');
    const pendingApproval = ads.filter(ad => ad.status === 'PendingApproval');
    const rejected = ads.filter(ad => ad.status === 'Rejected');

    const refreshPosts = () => {
        dispatch(fetchUserPostsAsync());
    };

    return (
        <Box style={{
            maxWidth: 980, maxHeight: 804, height: '100vh', width: '100vw', paddingTop: '20px', paddingLeft: '8px',
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
                <Tab label={<Text type={'Body'}><FormattedMessage id="myPosts.active" /></Text>} />
                <Tab label={<Text type={'Body'}><FormattedMessage id="myPosts.inactive" /></Text>} />
                <Tab label={<Text type={'Body'}><FormattedMessage id="myPosts.sold" /></Text>} />
                <Tab label={<Text type={'Body'}><FormattedMessage id="myPosts.pendingApproval" /></Text>} />
                <Tab label={<Text type={'Body'}><FormattedMessage id="myPosts.rejected" /></Text>} />
            </Tabs>
            <Box sx={{ marginTop: '20px' }}>
                {selectedTab === 0 && <PostWideList ads={activeAds} onPostUpdate={refreshPosts} />}
                {selectedTab === 1 && <PostWideList ads={inactiveAds} onPostUpdate={refreshPosts} />}
                {selectedTab === 2 && <PostWideList ads={soldAds} onPostUpdate={refreshPosts} />}
                {selectedTab === 3 && <PostWideList ads={pendingApproval} onPostUpdate={refreshPosts} />}
                {selectedTab === 4 && <PostWideList ads={rejected} onPostUpdate={refreshPosts} />}
            </Box>
        </Box>
    );
};

export default MyPosts;
