import React, {useState} from 'react';
import {Grid, Box} from '@mui/material';
import IndicatorBox from "@/components/Tools/IndicatorBox/IndicatorBox.jsx";
import {
    CardContentStyle,
    CardImgStyle,
    CardStyle,
    IndicatorGridStyle,
} from "@/components/Tools/ShortProduct/Styles.js";
import {LikedIcon, LikeIcon} from "@/assets/Icons/Icons.jsx";
import SButton from "@/components/Tools/Button/SButton.jsx";
import {useTheme} from "@mui/material/styles";
import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {selectSelectedPostId, setSelectedPostId} from "@/Storage/Redux/Slices/postSlice.js";
import Text from "@/components/Tools/TextContainer/Text.jsx";
import Icon from "@/components/Tools/IconContainer/Icon.jsx";

const ShortProduct = ({vip, type, photo, name, price, publicationDate, city, id }) => {
    const theme = useTheme();
    const { colors } = theme.palette;
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const selectedId = useSelector(selectSelectedPostId);
    const isVip = vip ?? false;
    const isUsed = type === 'Usd';
    
    return (
        <Box
            style={{
                ...CardStyle,
                backgroundColor: colors.background.secondary,
                boxShadow: colors.boxShadow,
                transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
                maxWidth: 272,
                maxHeight: 430,
                width: '100%',
                height: '100vh',
            }}
            sx={{
                '&:hover': { 
                    boxShadow: colors.types.shadows.boxShadowWarning + '!important',
                    transform: 'scale(1.05)', 
                },
            }}
            onClick={() => {
                navigate(`/../post/${id}`);
            }}
        >
            <Box style={{ position: 'relative', marginBottom: '10px' }}>
                <Grid container style={IndicatorGridStyle}>
                    {vip && <IndicatorBox text="Top" style="d" />}
                    {isUsed && <IndicatorBox text="Б/У" />}
                </Grid>
                <Box component="img" sx={CardImgStyle} src={photo} alt={name} />
            </Box>
            <Box style={CardContentStyle}>
               <Box>
                   <Text type={'Body'} sr={{textAlign: 'center', marginBottom: '30px'}}>{name}</Text>
               </Box>
                <Box style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
                    <Text type={'Title'} sr={{alignSelf: 'center'}}>{price}₴</Text>
                    <SButton
                        isIconButton={true}
                        icon={<Icon icon={LikeIcon} color={colors.text.orange} step={3} height={28} width={28}/>}
                        action={(e)=>{ e.stopPropagation(); console.log('clicked')}}
                    />
                </Box>
            </Box>
        </Box>
    );
};

export default ShortProduct;
