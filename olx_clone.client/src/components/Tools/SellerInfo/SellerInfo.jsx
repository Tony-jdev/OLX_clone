import React from 'react';
import { Container, Typography } from '@mui/material';
import { SellerInfoContainer, SellerInfoTitle, SellerInfoTextStyle } from './Styles.js';
import {useTheme} from "@mui/material/styles";

const SellerInfo = ({ userName, email, phoneNumber }) => {
    const theme = useTheme();
    const { colors } = theme.palette;
    
    return (
        <Container style={SellerInfoContainer} sx={{background: colors.background.secondary, boxShadow: colors.boxShadow}}>
            <Typography variant="h2" style={SellerInfoTitle} sx={{color: colors.text.revers }}>
                Seller Information
            </Typography>
            <Typography variant="body1" style={SellerInfoTextStyle} sx={{color: colors.text.revers }}>
                Name: {userName??'non'}
            </Typography>
            <Typography variant="body1" style={SellerInfoTextStyle} sx={{color: colors.text.revers }}>
                Email: {email??'non'}
            </Typography>
            <Typography variant="body1" style={SellerInfoTextStyle} sx={{color: colors.text.revers }}>
                Phone Number: {phoneNumber??'non'}
            </Typography>
        </Container>
    );
};

export default SellerInfo;
