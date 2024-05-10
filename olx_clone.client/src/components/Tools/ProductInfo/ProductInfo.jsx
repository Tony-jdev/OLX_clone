import React from 'react';
import { Container, Typography } from '@mui/material';
import { ProductInfoContainer, TitleStyle, DescriptionStyle, PriceStyle } from './Styles.js';

const ProductInfo = ({ title, description, price }) => {
    return (
        <Container style={ProductInfoContainer}>
            <Typography variant="h2" style={TitleStyle}>
                {title??'non'}
            </Typography>
            <Typography variant="body1" style={DescriptionStyle}>
                {description ?? 'non'}
            </Typography>
            <Typography variant="body1" style={PriceStyle}>
                Price: {price ?? 'non'} ₴
            </Typography>
        </Container>
    );
};

export default ProductInfo;
