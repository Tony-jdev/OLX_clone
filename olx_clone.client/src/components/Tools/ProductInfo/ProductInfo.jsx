import React from 'react';
import { Container, Typography } from '@mui/material';
import { ProductInfoContainer, TitleStyle, DescriptionStyle, PriceStyle } from './Styles.js';
import Carousel from "@/components/Tools/Carousel/Carousel.jsx";
import {useTheme} from "@mui/material/styles";

const ProductInfo = ({post}) => {
    const theme = useTheme();
    const { colors } = theme.palette;
    
    const urls = post.photos.map(photo => photo.photoUrl);
    const title = post.title;
    const description = post.description;
    const price = post.price;
    const createdAt = post.createdAt;
    const type = post.type;
    const viewsCount = post.viewsCount;
    
    
    
    return (
        <Container 
            style={ProductInfoContainer} 
            sx={{background: colors.background.secondary, boxShadow: colors.boxShadow}}>
            
            {urls && <Carousel items={urls} isWide={false} isOnlyImg={true}/>}
            
            <Typography variant="h2" style={TitleStyle} sx={{color: colors.text.revers }}>
                {title??'non'}
            </Typography>
            <Typography variant="body1" style={DescriptionStyle} sx={{color: colors.text.revers }}>
                Description: {description ?? 'non'}
            </Typography>
            <Typography variant="body1" style={PriceStyle} sx={{color: colors.text.revers }}>
                Price: {price ?? 'non'} ₴
            </Typography>
            <Typography variant="body1" style={PriceStyle} sx={{color: colors.text.revers }}>
                createdAt: {createdAt ?? 'non'} 
            </Typography>
            <Typography variant="body1" style={PriceStyle} sx={{color: colors.text.revers }}>
                Type: {type ?? 'non'} 
            </Typography>
            <Typography variant="body1" style={PriceStyle} sx={{color: colors.text.revers }}>
                views count: {viewsCount ?? 'non'}
            </Typography>
        </Container>
    );
};

export default ProductInfo;
