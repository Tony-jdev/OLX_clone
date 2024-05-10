import React from 'react';
import { Container, Typography } from '@mui/material';
import { LocationInfoContainer, LocationInfoTitle, LocationInfoTextStyle} from './Styles.js';

const LocationInfo = ({ city }) => {
    return (
        <Container style={LocationInfoContainer}>
            <Typography variant="h2" style={LocationInfoTitle}>
                Location Information
            </Typography>
            <Typography variant="body1" style={LocationInfoTextStyle}>
                City: {city??'non'}
            </Typography>
        </Container>
    );
};

export default LocationInfo;
