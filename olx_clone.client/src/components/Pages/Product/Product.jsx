import React, {useEffect, useState} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import ProductInfo from "@/components/Tools/ProductInfo/ProductInfo.jsx";
import SellerInfo from "@/components/Tools/SellerInfo/SellerInfo.jsx";
import LocationInfo from "@/components/Tools/LocationInfo/LocationInfo.jsx";
import SButton from "@/components/Tools/Button/SButton.jsx"; 
import {Box, Container, Grid} from "@mui/material";
import {ContainerStyle} from "@/components/Pages/Product/Styles.js";
import {useNavigate, useParams} from "react-router-dom";
import {FormattedMessage} from "react-intl";
import {
    fetchPostByIdAsync,
    selectError,
    selectLoading,
    selectSelectedPost,
    selectSelectedPostId, setSelectedPostId
} from "@/Storage/Redux/Slices/postSlice.js";
import Carousel from "@/components/Tools/Carousel/Carousel.jsx";
import {useTheme} from "@mui/material/styles";
import {useChat} from "@/providers/ChatProvider.jsx";

const ProductPage = () => {
    const theme = useTheme();
    const { colors } = theme.palette;
    
    const { id } = useParams();
    const dispatch = useDispatch();
    const postId = useSelector(selectSelectedPostId);
    const post = useSelector(selectSelectedPost);
    const loading = useSelector(selectLoading);
    const error = useSelector(selectError);
    const navigate = useNavigate();

    const [urls,setUrls] = useState([]);

    const { openChat, fetchChats } = useChat();

    React.useEffect(() => {
        fetchChats();
    }, [fetchChats]);

    const handleOpenChat = () => {
        openChat(1);
    };


    useEffect(() => {
        dispatch(setSelectedPostId(id));
        dispatch(fetchPostByIdAsync(id));
        window.scrollTo(0, 0);
    }, [dispatch, id]);

    useEffect(() => {
        if (post && post.photos) {
            setUrls(post.photos.map(photo => photo.photoUrl));
        }
    }, [post]);
    
    if (post === null) {
        return <Container>
            
            no such Product Found!
            
            <SButton
            type="whiteOutlined"
            text="Go back"
            action={()=>{ navigate(-1) }}
        /></Container>
    }

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <Container>

            Error: {error}

            <SButton
                type="whiteOutlined"
                text="Go back"
                action={()=>{ navigate(-1) }}
            /></Container>
    }


    return (
        <Container style={{marginTop: 60, marginBottom: 60, maxWidth: '1440px', width: '100%', padding: 0}}>
            <Grid container direction={'row'} justifyContent={'space-between'} style={{marginBottom: '20px'}}>
                <Box sx={{background: colors.background.secondary, boxShadow: colors.boxShadow, 
                    borderRadius: '20px', maxHeight: '630px', height: '100vh',
                    alignContent: 'center',
                }}>
                    {urls && <Carousel items={urls} isWide={false} isOnlyImg={true} width={'953px'} withoutNBtns={true} stopAutoplay={true}/>}
                </Box>
                <Box style={{maxWidth:'466px', width: '100%'}}>
                    <SellerInfo seller={'product'} OpenChat={handleOpenChat}/>
                    <LocationInfo location={post.location} />
                </Box>
            </Grid>
            <ProductInfo post={post}/>
        </Container>
    );
};

export default ProductPage;
