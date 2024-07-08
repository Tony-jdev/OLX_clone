import React, { useState, useEffect } from 'react';
import { Grid, Box, Paper } from '@mui/material';
import {styled, useTheme} from '@mui/material/styles';
import ContainerHeader from "@/components/Tools/ContainerHeader/ContainerHeader.jsx";
import Text from "@/components/Tools/TextContainer/Text.jsx";
import SButton from "@/components/Tools/Button/SButton.jsx";
import Icon from "@/components/Tools/IconContainer/Icon.jsx";
import {LikedIcon, LikeIcon} from "@/assets/Icons/Icons.jsx";
import {useNavigate} from "react-router-dom";
import NoDataFound from "@/components/NoDataFound/NoDataFound.jsx";
import {useAuth} from "@/providers/AuthProvider.jsx";
import {fetchUserDataAsync, isUserLoggedIn} from "@/Storage/Redux/Slices/userInfoSlice.js";
import {addFavorite, deleteFavorite, getFavoritesByUserId} from "@/Api/favouritesApi.js";
import {useDispatch, useSelector} from "react-redux";

const CarouselContainer = styled(Box)(({ theme }) => ({
    position: 'relative',
    width: '100%',
    maxWidth: '1440px',
    height: '500px',
    margin: '0 auto',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
}));

const Slide = styled(Paper)(({ theme, width }) => ({
    padding: '0px',
    background: 'transparent',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    transition: 'flex 0.3s ease-in-out, transform 0.3s ease-in-out',
    height: '100%',
    borderRadius: '30px',
    boxShadow: 'none',
    flex: width,
    position: 'relative',
    cursor: 'pointer',
}));

const CarouselImage = styled('img')({
    width: '100%',
    height: '450px',
    objectFit: 'cover',
    borderRadius: '30px',
    transition: 'transform 0.3s ease-in-out',
    backgroundColor: 'transparent',
});

const Footer = styled(Box)(({ theme }) => ({
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: '15px',
    borderRadius: '0 0 30px 30px',
    textAlign: 'center',
}));

const calculateFlex = (index, selectedIndex, numItems, leftScaleFactor, rightScaleFactor) => {
    const maxItemWidth = 558;
    const minItemWidth = 60;
    const distance = Math.abs(index - selectedIndex);
    const scaleFactor = index < selectedIndex ? leftScaleFactor : rightScaleFactor;
    return Math.pow(scaleFactor, distance);
};

const Carousel = ({headerBtn, headerText, loading, error, items = [] }) => {
    const theme = useTheme();
    const { colors } = theme.palette;
    const navigate = useNavigate();

    const [selectedIndex, setSelectedIndex] = useState(0);

    useEffect(() => {
        setSelectedIndex(0);
    }, []);

    const maxDistanceLeft = selectedIndex;
    const maxDistanceRight = items.length - selectedIndex - 1;

    const leftScaleFactor = Math.pow(60 / 558, 1 / maxDistanceLeft);
    const rightScaleFactor = Math.pow(60 / 558, 1 / maxDistanceRight);

    const totalFlex = items.reduce(
        (acc, _, index) => acc + calculateFlex(index, selectedIndex, items.length, leftScaleFactor, rightScaleFactor),
        0
    );

    const dispatch = useDispatch();
    const isUserLogined = useSelector(isUserLoggedIn);

    const {openAuth} = useAuth();

    const [ isFavourite, setIsFavourite] = useState(false);

    const getIsFav = (intId) =>{
        const checkFav = async () => {
            const user = await dispatch(fetchUserDataAsync());
            const favs = await getFavoritesByUserId(user.userId);
            const posts = favs.data.map(fav => fav.post);
            const exist = posts.some(post => post.id === intId);
            console.log(exist);
            setIsFavourite(exist);
        }
        checkFav();
    }

    const setFavHandle = (intId) => {
        if(isUserLogined) {
            const adFavourite = async ()=>{
                const user = await dispatch(fetchUserDataAsync());
                const favoriteData = {
                    postId: intId,
                    applicationUserId: user.userId
                };
                console.log(favoriteData);
                const res = await addFavorite(favoriteData);
                console.log(res);
                setIsFavourite(true);
            }
            adFavourite();
        }
    }
    const findExternalIdByPostId = (posts, postId) => {
        const post = posts.find(post => post.post.id === postId);
        return post ? post.id : null;
    };
    const delFavHandle = (intId) => {
        if(isUserLogined) {
            const delFavourite = async ()=>{
                const user = await dispatch(fetchUserDataAsync());
                const favs = await getFavoritesByUserId(user.userId);
                console.log(favs);
                const num = findExternalIdByPostId(favs.data, intId);
                console.log(num);
                const res = await deleteFavorite(num);
                console.log(res);
                setIsFavourite(false);
            }
            delFavourite();
        }
    }
    
    useEffect(() => {
        if( isUserLogined && items[selectedIndex]?.id)
        getIsFav(items[selectedIndex]?.id);
    }, [items, isUserLogined, selectedIndex, selectedIndex]);
    
    
    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }
    
    return (
        <>
            {headerBtn != null && headerText != null && <ContainerHeader text={headerText} btn={headerBtn}/>}
            <CarouselContainer>
                <Grid container spacing={2} justifyContent="center" alignItems="center" wrap="nowrap">
                    {items && items.length > 0 ? items.map((item, index) => (
                        <Grid
                            item
                            key={index}
                            onMouseEnter={() => setSelectedIndex(index)}
                            style={{
                                flex: `${calculateFlex(index, selectedIndex, items.length, leftScaleFactor, rightScaleFactor) / totalFlex}`,
                            }}
                        >
                            <Slide 
                                width={calculateFlex(index, selectedIndex, items.length, leftScaleFactor, rightScaleFactor) / totalFlex}
                                onClick={() => {
                                    navigate(`/../post/${item.sku}`);
                                }}
                            >
                                <CarouselImage src={item.photoUrl} alt={`slide-${index}`} />
                                {selectedIndex === index && (
                                    <Footer>
                                        <Box style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
                                            <Box>
                                                <Text type={'Title'} color={colors.text.primary}>{item.title}</Text>
                                            </Box>
                                            <Box style={{display: 'flex', flexDirection: 'column', justifyContent: 'space-between'}}>
                                                <Text type={'Title'} color={colors.text.primary} sr={{alignSelf: 'center'}}>{item.price}₴</Text>
                                                <SButton
                                                    isIconButton={true}
                                                    icon={<Icon icon={ isFavourite ? LikedIcon : LikeIcon} color={colors.text.orange} step={3} height={28} width={28}/>}
                                                    action={(e)=>{ 
                                                        e.stopPropagation(); 
                                                        if(isUserLogined) {
                                                            if(isFavourite) {
                                                                delFavHandle(item.id);
                                                            }
                                                            else {
                                                                setFavHandle(item.id);
                                                            }
                                                        }
                                                        else {
                                                           openAuth();
                                                        }
                                                    }}
                                                />
                                            </Box>
                                        </Box>
                                    </Footer>
                                )}
                            </Slide>
                        </Grid>
                    )) : <NoDataFound/>}
                </Grid>
            </CarouselContainer>
        </>
    );
};

export default Carousel;
