import React from 'react';
import { Card, CardHeader, CardMedia, CardContent, Typography, Button } from '@mui/material';

const ShortProduct = ({ photo, name, price, publicationDate, condition, city }) => {
    return (
        <Card>
            <CardMedia component="img" sx={{maxHeight: 200}} image={photo} alt={name} />
            <CardHeader title={name} />
            <CardContent>
                <Typography variant="body2" color="textSecondary" component="p">
                    Price: {price}
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                    Published: {publicationDate}
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                    Condition: {condition}
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                    City: {city}
                </Typography>
            </CardContent>
            <Button variant="contained" color="primary">Subscribe</Button>
        </Card>
    );
};

export default ShortProduct;
