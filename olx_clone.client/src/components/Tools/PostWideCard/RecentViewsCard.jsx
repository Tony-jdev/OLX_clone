import React, { useEffect, useRef, useState } from 'react';
import { Avatar, Box, Grid } from '@mui/material';
import { Visibility } from '@mui/icons-material';
import {
    AvatarStyle,
    CardContainer,
    ContentContainer,
    PriceStyle,
    StatIconStyle,
    StatsContainer,
    TextContainer,
} from "@/components/Tools/PostWideCard/Styles.js";
import Text from "@/components/Tools/TextContainer/Text.jsx";
import { IndicatorGridStyle } from "@/components/Tools/ShortProduct/Styles.js";
import IndicatorBox from "@/components/Tools/IndicatorBox/IndicatorBox.jsx";
import { useTheme } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {fetchUserDataAsync, isUserLoggedIn, selectToken} from "@/Storage/Redux/Slices/userInfoSlice.js";
import SButton from "@/components/Tools/Button/SButton.jsx";
import {LikedIcon, LikeIcon, MessageMailIcon} from "@/assets/Icons/Icons.jsx";
import Icon from "@/components/Tools/IconContainer/Icon.jsx";
import {formatLocationAndDate} from "@/Helpers/DateHelper.js";
import {CategoryChainComponent} from "@/Helpers/CategoryChain.jsx";
import {BodyMedium, HeadlineMedium, TitleMedium} from "@/components/Tools/TextContainer/Styles.js";
import {useAuth} from "@/providers/AuthProvider.jsx";
import {addFavorite, deleteFavorite, getFavoritesByUserId} from "@/Api/favouritesApi.js";

const RecentViewsCard = ({ ad, container, onFavoriteChange }) => {
    const theme = useTheme();
    const { colors } = theme.palette;

    const navigate = useNavigate();

    const token = useSelector(selectToken);

    const [opacity, setOpacity] = useState(1);
    const [scale, setScale] = useState(1);
    const cardRef = useRef(null);

    const vip = ad.vip;
    const isUsed = ad.type !== 'New';

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                const ratio = entry.intersectionRatio;

                if (ratio > 0.99) {
                    setOpacity(1);
                    setScale(1);
                } else {
                    setOpacity(ratio);
                    setScale(ratio);
                }
            },
            {
                root: container.current,
                threshold: Array.from(Array(101).keys(), (v) => v * 0.01),
            }
        );

        if (cardRef.current) {
            observer.observe(cardRef.current);
        }

        return () => {
            if (cardRef.current) {
                observer.unobserve(cardRef.current);
            }
        };
    }, [container]);

    useEffect(() => {
        console.log(ad);
    }, [ad]);


    const dispatch = useDispatch();
    const isUserLogined = useSelector(isUserLoggedIn);
    const {openAuth} = useAuth();

    const [isProcessing, setIsProcessing] = useState(false);
    const [ isFavourite, setIsFavourite] = useState(false);

    const getIsFav = () =>{
        const checkFav = async () => {
            const user = await dispatch(fetchUserDataAsync());
            const favs = await getFavoritesByUserId(user.userId);
            console.log(favs);
            const posts = favs.data.map(fav => fav.post);
            console.log(posts);
            console.log(ad.id);
            const exist = posts.some(post => post.id === ad.id);
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
                    postId: ad.id,
                    applicationUserId: user.userId
                };
                console.log(favoriteData);
                const res = await addFavorite(favoriteData);
                console.log(res);
                setIsFavourite(true);
                onFavoriteChange(ad.id, true);
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
                const num = findExternalIdByPostId(favs.data, ad.id);
                console.log(num);
                const res = await deleteFavorite(num);
                console.log(res);
                setIsFavourite(false);
                onFavoriteChange(ad.id, false);
                setIsProcessing(false);
            }
            delFavourite();
        }
    }

    useEffect(() => {
        console.log(ad);
        getIsFav();
    }, [isUserLogined, dispatch, ad]);
    
    const handleCardClick = () => {
        navigate(`/post/${ad.sku}`);
    };

    return (
        <Box
            ref={cardRef}
            sx={{
                ...CardContainer,
                opacity: opacity,
                transform: `scale(${scale})`,
                transition: 'opacity 0.05s, transform 0.125s',
                boxShadow: colors.boxShadow,
            }}
            onClick={handleCardClick}
        >
            <Avatar src={ad?.photos[0]?.photoUrl} variant="rounded" style={AvatarStyle} />
            <Grid container style={IndicatorGridStyle}>
                {vip && <IndicatorBox text="Top" style='d' />}
                {isUsed && <IndicatorBox text="Б/У" />}
            </Grid>
            <Box style={{ ...ContentContainer }}>
                <Box style={TextContainer}>
                    <Box>
                        <Text type="Title" >{ad.title}</Text>
                        <Text textSt={TitleMedium} color={colors.text.secondary} ><CategoryChainComponent category={ad.category}/></Text>
                    </Box>
                    <Box style={{display: 'flex', flexDirection: 'row', height: 'max-content', alignItems: 'center'}}>
                        <Text textSt={HeadlineMedium} style={{ ...PriceStyle }} sr={{marginRight: '14px'}} text={`${ad.price}`} />
                        <Text textSt={BodyMedium} style={{ ...PriceStyle }} sr={{marginRight: '14px'}} text={` ₴`} />
                    </Box>
                </Box>
                <Grid container alignItems='flex-end' justifyContent='space-between' style={{ maxHeight: 70, height: '100%' }}>
                    <Box style={StatsContainer}>
                        <Text textSt={TitleMedium}  >{formatLocationAndDate(ad.location,  ad.createdAt)}</Text>
                    </Box>
                    <Box style={StatsContainer}>
                        <SButton
                            isIconButton={true}
                            disabled={isProcessing}
                            icon={
                            <Icon
                                icon={isFavourite ? LikedIcon : LikeIcon}
                                color={colors.text.revers}
                                step={1}
                                width={36}
                                height={36}
                            />}
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
                        <SButton
                            isIconButton={true}
                            
                            icon={
                                <Icon
                                    icon={MessageMailIcon}
                                    color={colors.text.revers}
                                    step={1}
                                    width={36}
                                    height={36}
                                />
                            }
                        />
                    </Box>
                </Grid>
            </Box>
        </Box>
    );
};

export default RecentViewsCard;
