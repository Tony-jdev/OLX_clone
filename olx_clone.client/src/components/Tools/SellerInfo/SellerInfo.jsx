import React from 'react';
import { Container, Typography } from '@mui/material';
import { SellerInfoContainer, SellerInfoTitle, SellerInfoTextStyle } from './Styles.js';

const SellerInfo = ({ userName, email, phoneNumber }) => {
    return (
        <Container style={SellerInfoContainer}>
            <Typography variant="h2" style={SellerInfoTitle}>
                Seller Information
            </Typography>
            <Typography variant="body1" style={SellerInfoTextStyle}>
                Name: {userName??'non'}
            </Typography>
            <Typography variant="body1" style={SellerInfoTextStyle}>
                Email: {email??'non'}
            </Typography>
            <Typography variant="body1" style={SellerInfoTextStyle}>
                Phone Number: {phoneNumber??'non'}
            </Typography>
        </Container>
    );
};

export default SellerInfo;
