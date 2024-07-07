import React, { useEffect, useState } from 'react';
import { Box, Typography } from '@mui/material';
import Text from "@/components/Tools/TextContainer/Text.jsx";
import { useTheme } from "@mui/material/styles";
import PostWideList from "@/components/Tools/PostWideList/PostWideList.jsx";
import { getRecentViews } from "@/Helpers/recentViewsHelper.js";
import { GetPostById } from "@/Api/postApi.js";
import {useDispatch, useSelector} from "react-redux";
import {fetchUserDataAsync, selectUser} from "@/Storage/Redux/Slices/userInfoSlice.js";

const RecentViews = () => {
    const theme = useTheme();
    const { colors } = theme.palette;
    
    const dispatch = useDispatch();

    const [ads, setAds] = useState([]);
    
    useEffect(() => {
        const fetchAds = async () => {
            const user = await dispatch(fetchUserDataAsync());
            const recentSkus = getRecentViews(user.userId);
            const fetchedAds = await Promise.all(recentSkus.map(async (sku) => {
                const ad = await GetPostById(sku);
                return { ...ad.data, id: sku }; // Додаємо унікальний id, якщо його немає
            }));
            setAds(fetchedAds);
        };

        fetchAds();
    }, []);

    useEffect(() => {
        console.log('ads updated', ads);
    }, [ads]);

    return (
        <Box style={{
            maxWidth: 985, maxHeight: 804, height: '100vh', width: '100vw', paddingTop: '20px', paddingLeft: '5px',
            borderRadius: '10px',
            boxShadow: colors.boxShadow,
            background: colors.background.secondary
        }}>
            <Box sx={{ marginTop: '0px' }}>
                <PostWideList ads={ads} t={'view'} />
            </Box>
        </Box>
    );
};

export default RecentViews;
