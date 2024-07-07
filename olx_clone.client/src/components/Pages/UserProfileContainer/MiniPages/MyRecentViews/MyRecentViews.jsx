import React, { useEffect, useState } from 'react';
import { Box, Typography } from '@mui/material';
import Text from "@/components/Tools/TextContainer/Text.jsx";
import { useTheme } from "@mui/material/styles";
import PostWideList from "@/components/Tools/PostWideList/PostWideList.jsx";
import { getRecentViews } from "@/Helpers/recentViewsHelper.js";
import { GetPostById } from "@/Api/postApi.js";

const RecentViews = () => {
    const theme = useTheme();
    const { colors } = theme.palette;

    const [ads, setAds] = useState([]);

    useEffect(() => {
        const fetchAds = async () => {
            const recentSkus = getRecentViews();
            const fetchedAds = await Promise.all(recentSkus.map(async (sku) => {
                const ad = await GetPostById(sku);
                return { ...ad.data }; // Додаємо унікальний id, якщо його немає
            }));
            setAds(fetchedAds);
        };

        fetchAds();
    }, []);

    return (
        <Box style={{
            maxWidth: 980, maxHeight: 804, height: '100vh', width: '100vw', paddingTop: '20px', paddingLeft: '5px',
            borderRadius: '10px',
            boxShadow: colors.boxShadow,
            background: colors.background.secondary
        }}>
            <Typography variant="h6">Recent Views</Typography>
            <Box sx={{ marginTop: '20px' }}>
                <PostWideList ads={ads} t={'view'} />
            </Box>
            <Text type={'Body'} sl={{ textAlign: 'right', marginTop: '20px', marginBottom: '20px', marginRight: '20px' }}>
                Всього переглядів: {ads.length}
            </Text>
        </Box>
    );
};

export default RecentViews;
