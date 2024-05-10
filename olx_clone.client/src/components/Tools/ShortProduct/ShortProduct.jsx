import React from 'react';
import {Grid, Card, CardMedia, CardContent, Typography, IconButton } from '@mui/material';
import IndicatorBox from "@/components/Tools/IndicatorBox/IndicatorBox.jsx";
import {
    CardContentStyle,
    CardImgStyle,
    CardStyle,
    HTextStyle, IndicatorGridStyle,
    PTextStyle,
    STextStyle
} from "@/components/Tools/ShortProduct/Styles.js";
import {LikeIcon} from "@/assets/Icons/Icons.jsx";
import SButton from "@/components/Tools/Button/SButton.jsx";
import {useTheme} from "@mui/material/styles";
import {useNavigate} from "react-router-dom";

const ShortProduct = ({ photo, name, price, publicationDate, condition, city, id }) => {
    const theme = useTheme();
    const { colors } = theme.palette;
    const navigate = useNavigate();
    
    return (
        <Card style={{...CardStyle, width:272, height: 532, background: colors.background.secondary}}>
            <Grid style={{padding: 20, height: 342, width: 272}}>
                <Grid container style={IndicatorGridStyle}>
                    <IndicatorBox text="Top" style='d'/>
                    <IndicatorBox text="Б/У"/>
                </Grid>
                <CardMedia component="img" sx={CardImgStyle} image={photo} alt={name} />
            </Grid>
            <CardContent style={CardContentStyle}>
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
                <SButton type='whiteOutlined' text='Check' action={()=>navigate('post/'+id)}/>
            </CardContent>
        </Card>
    );
};

export default ShortProduct;
