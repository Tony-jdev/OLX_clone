import React, {useEffect, useState} from 'react';
import {Box, Container, Typography} from '@mui/material';
import { ProductInfoContainer, TitleStyle, DescriptionStyle, PriceStyle } from './Styles.js';
import Carousel from "@/components/Tools/Carousel/Carousel.jsx";
import {useTheme} from "@mui/material/styles";
import Text from "@/components/Tools/TextContainer/Text.jsx";
import SButton from "@/components/Tools/Button/SButton.jsx";
import Icon from "@/components/Tools/IconContainer/Icon.jsx";
import {LikedIcon, LikeIcon} from "@/assets/Icons/Icons.jsx";
import {formatDateString} from "@/Helpers/DateHelper.js";
import {useDispatch, useSelector} from "react-redux";
import {fetchUserDataAsync, isUserLoggedIn} from "@/Storage/Redux/Slices/userInfoSlice.js";
import {useAuth} from "@/providers/AuthProvider.jsx";
import {addFavorite, deleteFavorite, getFavoritesByUserId} from "@/Api/favouritesApi.js";

const ProductInfo = ({post}) => {
    const theme = useTheme();
    const { colors } = theme.palette;
    
    const title = post.title;
    const description = post.description;
    const price = post.price;
    const createdAt = formatDateString(post.createdAt);
    const type = post.type;
    const viewsCount = post.viewsCount;

    const dispatch = useDispatch();
    const isUserLogined = useSelector(isUserLoggedIn);
    const {openAuth} = useAuth();

    const [isProcessing, setIsProcessing] = useState(false);
    const [ isFavourite, setIsFavourite] = useState(false);

    const getIsFav = () =>{
        const checkFav = async () => {
            const user = await dispatch(fetchUserDataAsync());
            const favs = await getFavoritesByUserId(user.userId);
            const posts = favs.data.map(fav => fav.post);
            const postId = post.id;
            console.log(post);
            console.log(posts);
            const exist = posts.some(post => post.id === postId);
            console.log(exist);
            setIsFavourite(exist);
        }
        checkFav();
    }

    const setFavHandle = () => {
        if(isUserLogined) {
            setIsProcessing(true); 
            const adFavourite = async ()=>{
                const user = await dispatch(fetchUserDataAsync());
                const favoriteData = {
                    postId: post.id,
                    applicationUserId: user.userId
                };
                console.log(favoriteData);
                const res = await addFavorite(favoriteData);
                console.log(res);
                setIsFavourite(true);
                setIsProcessing(false); 
            }
            adFavourite();
        }
    }
    const findExternalIdByPostId = (posts, postId) => {
        const post = posts.find(post => post.post.id === postId);
        return post ? post.id : null;
    };
    const delFavHandle = () => {
        if(isUserLogined) {
            setIsProcessing(true); 
            const delFavourite = async ()=>{
                const user = await dispatch(fetchUserDataAsync());
                const favs = await getFavoritesByUserId(user.userId);
                console.log(favs);
                const num = findExternalIdByPostId(favs.data, post.id);
                console.log(num);
                const res = await deleteFavorite(num);
                console.log(res);
                setIsFavourite(false);
                setIsProcessing(false); 
            }
            delFavourite();
            
        }
    }

    useEffect(() => {
        getIsFav();
    }, [isUserLogined]);


    return (
        <Box 
            style={{...ProductInfoContainer, maxWidth: '953px'}} 
            sx={{background: colors.background.secondary, boxShadow: colors.boxShadow}}>
            <Box>
                <Box style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
                    <Text type={'Headline'} sr={{fontWeight: '700'}}>
                        {title??'non'}
                    </Text>
                    <Text type={'Headline'} sr={{fontWeight: '700'}}>
                        {price??'non'}₴
                    </Text>
                </Box>
                <Text>{createdAt}</Text>
            </Box>
            
            <Box>
                <Box style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
                    <Text type={'Headline'}>Опис</Text>
                    <SButton
                        isIconButton={true}
                        icon={<Icon icon={isFavourite ? LikedIcon : LikeIcon} color={colors.text.orange} step={3} height={36} width={36}/>}
                        disabled={isProcessing}
                        action={(e)=>{
                            e.stopPropagation();
                            if(isUserLogined) {
                                if(isFavourite) {
                                    delFavHandle();
                                }
                                else {
                                    setFavHandle();
                                }
                            }
                            else {
                                openAuth();
                            }
                        }}
                    />
                </Box>
               <Box>
                   <Text type={'Body'}>
                       {description}
                   </Text>
               </Box>
                <Box>
                    
                </Box>
            </Box>
        </Box>
    );
};

export default ProductInfo;
