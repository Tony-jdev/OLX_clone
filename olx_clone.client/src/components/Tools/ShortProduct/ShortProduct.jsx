import React, {useEffect, useState} from 'react';
import {Grid, Box} from '@mui/material';
import IndicatorBox from "@/components/Tools/IndicatorBox/IndicatorBox.jsx";
import {
    CardContentStyle,
    CardImgStyle,
    CardStyle,
    IndicatorGridStyle,
} from "@/components/Tools/ShortProduct/Styles.js";
import {LikedIcon, LikeIcon} from "@/assets/Icons/Icons.jsx";
import SButton from "@/components/Tools/Button/SButton.jsx";
import {useTheme} from "@mui/material/styles";
import {Await, useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {selectSelectedPostId, setSelectedPostId} from "@/Storage/Redux/Slices/postSlice.js";
import Text from "@/components/Tools/TextContainer/Text.jsx";
import Icon from "@/components/Tools/IconContainer/Icon.jsx";
import {addFavorite, deleteFavorite, getFavoritesByUserId} from "@/Api/favouritesApi.js";
import {fetchUserDataAsync, isUserLoggedIn} from "@/Storage/Redux/Slices/userInfoSlice.js";

const ShortProduct = ({vip, type, photo, name, price, publicationDate, city, id, intId }) => {
    const theme = useTheme();
    const { colors } = theme.palette;
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const isUserLogined = useSelector(isUserLoggedIn);
    const selectedId = useSelector(selectSelectedPostId);
    const isVip = vip ?? false;
    const isUsed = type !== 'New';
    
    const [ isFavourite, setIsFavourite] = useState(false);
    
    const getIsFav = () =>{
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
    
    const setFavHandle = () => {
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
    const delFavHandle = () => {
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
        getIsFav();
    }, []);
    
    return (
        <Box
            style={{
                ...CardStyle,
                backgroundColor: colors.background.secondary,
                boxShadow: colors.boxShadow,
                transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
                maxWidth: 272,
                maxHeight: '450px',
                width: '100%',
                height: '100vh',
            }}
            sx={{
                '&:hover': { 
                    boxShadow: colors.types.shadows.boxShadowWarning + '!important',
                    transform: 'scale(1.05)', 
                },
            }}
            onClick={() => {
                navigate(`/../post/${id}`);
            }}
        >
            <Box style={{ position: 'relative', marginBottom: '10px' }}>
                <Grid container style={IndicatorGridStyle}>
                    {vip && <IndicatorBox text="Top" style="d" />}
                    {isUsed && <IndicatorBox text="Б/У" />}
                </Grid>
                <Box component="img" sx={CardImgStyle} src={photo} alt={name} />
            </Box>
            <Box style={{...CardContentStyle, display: 'flex', flexDirection: 'column', justifyContent: 'space-between'}}>
               <Box>
                   <Text type={'Body'} sr={{textAlign: 'start', marginBottom: '30px', textWrap: 'nowrap', whiteSpace: 'nowrap',
                       overflow: 'hidden',
                       textOverflow: 'ellipsis',}}>{name}</Text>
               </Box>
                <Box style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
                    <Text type={'Title'} sr={{alignSelf: 'center'}}>{price}₴</Text>
                    <SButton
                        isIconButton={true}
                        icon={<Icon icon={isFavourite ? LikedIcon : LikeIcon} color={colors.text.orange} step={3} height={28} width={28}/>}
                        action={(e)=>{ 
                            e.stopPropagation();
                            if(isFavourite) {
                                delFavHandle();
                            }
                            else {
                                setFavHandle();
                            }
                        }}
                    />
                </Box>
            </Box>
        </Box>
    );
};

export default ShortProduct;
