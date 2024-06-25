import React from 'react';
import {Box, Container, Typography} from '@mui/material';
import { ProductInfoContainer, TitleStyle, DescriptionStyle, PriceStyle } from './Styles.js';
import Carousel from "@/components/Tools/Carousel/Carousel.jsx";
import {useTheme} from "@mui/material/styles";

const ProductInfo = ({post}) => {
    const theme = useTheme();
    const { colors } = theme.palette;
    
    const title = post.title;
    const description = post.description;
    const price = post.price;
    const createdAt = post.createdAt;
    const type = post.type;
    const viewsCount = post.viewsCount;
    
    
    
    return (
        <Box 
            style={{...ProductInfoContainer, maxWidth: '953px'}} 
            sx={{background: colors.background.secondary, boxShadow: colors.boxShadow}}>
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
        </Box>
    );
};

export default ProductInfo;
