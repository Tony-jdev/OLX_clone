import React from 'react';
import { Container, Typography } from '@mui/material';
import { LocationInfoContainer, LocationInfoTitle, LocationInfoTextStyle} from './Styles.js';
import {useTheme} from "@mui/material/styles";

const LocationInfo = ({ city }) => {
    const theme = useTheme();
    const { colors } = theme.palette;
    
    return (
        <Container style={LocationInfoContainer} sx={{background: colors.background.secondary, boxShadow: colors.boxShadow}}>
            <Typography variant="h2" style={LocationInfoTitle} sx={{color: colors.text.revers }}>
                Location Information
            </Typography>
            <Typography variant="body1" style={LocationInfoTextStyle} sx={{color: colors.text.revers }}>
                City: {city??'non'}
            </Typography>
        </Container>
    );
};

export default LocationInfo;
