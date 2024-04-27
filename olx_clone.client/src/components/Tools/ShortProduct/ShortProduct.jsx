import React from 'react';
import {Grid, Card, CardMedia, CardContent, Typography, IconButton } from '@mui/material';
import IndicatorBox from "@/components/Tools/IndicatorBox/IndicatorBox.jsx";
import {CardStyle, HTextStyle, PTextStyle, STextStyle} from "@/components/Tools/ShortProduct/Styles.js";
import {LikeIcon} from "@/assets/Icons/Icons.jsx";
import SButton from "@/components/Tools/Button/SButton.jsx";

const ShortProduct = ({ photo, name, price, publicationDate, condition, city }) => {
    return (
        <Card style={{...CardStyle, width:272, height: 532}}>
            <Grid style={{padding: 20, height: 342, width: 272}}>
                <Grid container style={{position: 'absolute', x: 40, y: 40, width: 'fit-content'}}>
                    <IndicatorBox text="Top" style='d'/>
                    <IndicatorBox text="Б/У"/>
                </Grid>
                <CardMedia component="img" sx={{objectFit: 'fill', width: '100%', height: '100%', borderRadius: '8px 8px 0px 0px'
                }} image={photo} alt={name} />
            </Grid>
            <CardContent style={{width: 272, height: 190, padding: 20, paddingTop: 0}}>
                <Typography style={HTextStyle}>
                    Name: {name}
                </Typography>
                <Grid container direction='row' justifyContent='space-between'>
                    <Typography style={PTextStyle}>
                        Price: {price} ₴
                    </Typography>
                    <IconButton>
                        <LikeIcon/>
                    </IconButton>
                </Grid>
                <Typography style={STextStyle}>
                    City: {city}
                </Typography>
                <Typography style={STextStyle}>
                    Published: {publicationDate}
                </Typography>
                <SButton type='whiteOutlined' text='Write author' />
            </CardContent>
        </Card>
    );
};

export default ShortProduct;
