import React, { useEffect, useState } from 'react';
import { Box, Typography } from '@mui/material';
import Text from "@/components/Tools/TextContainer/Text.jsx";
import { TabsContainerStyles } from "@/components/Pages/UserProfileContainer/MiniPages/MyPosts/Styles.js";
import { useTheme } from "@mui/material/styles";
import PostWideList from "@/components/Tools/PostWideList/PostWideList.jsx";
import { getRecentViews } from "@/Helpers/recentViewsHelper.js";
import { GetPostById } from "@/Api/postApi.js";
import SButton from "@/components/Tools/Button/SButton.jsx";
import {fetchUserDataAsync} from "@/Storage/Redux/Slices/userInfoSlice.js";
import {useDispatch} from "react-redux";
import {getFavoritesByUserId} from "@/Api/favouritesApi.js";

const MyFavourites = () => {
    const theme = useTheme();
    const { colors } = theme.palette;
    
    const dispatch = useDispatch();

    const [ads, setAds] = useState([]);

    useEffect(() => {
        const fetchFav = async () => {
            const user = await dispatch(fetchUserDataAsync());
            const favs = await getFavoritesByUserId(user.userId);

            const posts = favs.data.map(fav => fav.post);

            console.log(posts);
            setAds(posts);
        }
        fetchFav();
    }, [dispatch]);

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
                <PostWideList ads={ads} t={'fav'} />
            </Box>
        </Box>
    );
};

export default MyFavourites;
