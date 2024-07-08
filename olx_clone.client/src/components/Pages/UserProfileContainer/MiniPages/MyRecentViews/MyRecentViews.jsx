import React, { useEffect, useState } from 'react';
import { Box, Typography } from '@mui/material';
import Text from "@/components/Tools/TextContainer/Text.jsx";
import { useTheme } from "@mui/material/styles";
import PostWideList from "@/components/Tools/PostWideList/PostWideList.jsx";
import {clearRecentView, getRecentViews} from "@/Helpers/recentViewsHelper.js";
import { GetPostById } from "@/Api/postApi.js";
import {useDispatch, useSelector} from "react-redux";
import {fetchUserDataAsync, selectUser} from "@/Storage/Redux/Slices/userInfoSlice.js";
import SButton from "@/components/Tools/Button/SButton.jsx";

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
                return { ...ad.data, uid: sku }; 
            }));
            setAds(fetchedAds);
        };

        fetchAds();
    }, []);

    useEffect(() => {
        console.log('ads updated', ads);
    }, [ads]);

    const clearHistoryHandler = () => {
        const fetchAds = async () => {
            const user = await dispatch(fetchUserDataAsync());
            const recentSkus = getRecentViews(user.userId);
            const fetchedAds = await Promise.all(recentSkus.map(async (sku) => {
                const ad = await GetPostById(sku);
                return { ...ad.data, id: sku };
            }));
            setAds(fetchedAds);
        };
        const clear = async () => {
            const user = await dispatch(fetchUserDataAsync());
            console.log(user);
            clearRecentView(user.userId);
        };
        clear();
        fetchAds();
    }

    const handleFavoriteChange = (adId, isFavorite) => {
        setAds(prevAds => {
            return prevAds.map(ad => {
                if (ad.id === adId) {
                    return { ...ad, isFavorite };
                }
                return ad;
            });
        });
    };
    
    return (
        <Box style={{
            maxWidth: 985, maxHeight: 804, height: '100vh', width: '100vw', paddingTop: '20px', paddingLeft: '5px',
            borderRadius: '10px',
            boxShadow: colors.boxShadow,
            background: colors.background.secondary,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between'
        }}>
            <Box sx={{ marginTop: '0px' }}>
                <PostWideList ads={ads} t={'view'} withoutCount={true} onFavoriteChange={handleFavoriteChange}/>
            </Box>
            <Box style={{display: 'flex', width: '100%', justifyContent: 'end', paddingRight: 8, paddingBottom: 28}}>
                <SButton
                    text={"Видалити історію"}
                    sr={{height: 40, border: '1px solid #000'}}
                    action={clearHistoryHandler}
                />
            </Box>
        </Box>
    );
};

export default RecentViews;
