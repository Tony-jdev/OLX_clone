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
import {useDispatch, useSelector} from "react-redux";
import {selectSelectedPostId, setSelectedPostId} from "@/Storage/Redux/Slices/postSlice.js";

const ShortProduct = ({ photo, name, price, publicationDate, condition, city, id }) => {
    const theme = useTheme();
    const { colors } = theme.palette;
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const selectedId = useSelector(selectSelectedPostId);
    
    return (
        <Card style={{...CardStyle, width: 340, height: 'auto', background: colors.background.secondary, boxShadow: colors.boxShadow}}>
            <Grid style={{padding: 20, height: 300, width: 'fit-content'}}>
                <Grid container style={IndicatorGridStyle}>
                    <IndicatorBox text="Top" style='d'/>
                    <IndicatorBox text="Б/У"/>
                </Grid>
                <CardMedia component="img" sx={CardImgStyle} image={photo} alt={name} />
            </Grid>
            <CardContent style={CardContentStyle} >
                <Typography style={HTextStyle} sx={{color: colors.text.revers}}>
                    Name: {name}
                </Typography>
                <Grid container direction='row' justifyContent='space-between'>
                    <Typography style={PTextStyle}  sx={{color: colors.text.revers}}>
                        Price: {price} ₴
                    </Typography>
                    <SButton
                        isIconButton={true}
                        icon={<LikeIcon sx={{color: colors.text.revers}}/>}
                    />
                </Grid>
                <Typography style={STextStyle}  sx={{color: colors.text.revers}}>
                    City: {city}
                </Typography>
                <Typography style={STextStyle}  sx={{color: colors.text.revers}}>
                    Published: {publicationDate}
                </Typography>
                <SButton type='whiteOutlined' sl={{width: '100%', marginTop: '15px'}} text='Check' action={
                    ()=>{
                        navigate('/../post/'+id);
                    }
                }/>
            </CardContent>
        </Card>
    );
};

export default ShortProduct;
