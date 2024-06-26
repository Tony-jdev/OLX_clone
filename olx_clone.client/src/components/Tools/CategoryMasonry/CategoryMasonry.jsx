import React from 'react';
import { Grid, Box, Button } from '@mui/material';
import {
    BoxImgMainStyle, BoxMainStyle,
    ButtonMainStyle,
    GridC11Style,
    GridC1Style, GridC21Style,
    GridC22Style,
    GridC2Style, GridC3Style,
    GridMainStyle
} from '@/components/Tools/CategoryMasonry/Styles.js';
import { useNavigate } from 'react-router-dom';
import {FormattedMessage} from "react-intl";
import {useTheme} from "@mui/material/styles";
import Categories from "@/Helpers/mainCategoriesHelper.js";
import Text from "@/components/Tools/TextContainer/Text.jsx";


const buttons = [
    <FormattedMessage id='category.fashion'/>,
    <FormattedMessage id='category.electronics'/>,
    <FormattedMessage id='category.animals'/>,
    <FormattedMessage id='category.childrensWorld'/>,
    <FormattedMessage id='category.realEstate'/>,
];
const navigates = [
    '/search/'+Categories[1],
    '/search/'+Categories[5],
    '/search/'+Categories[0],
    '/search/'+Categories[8],
    '/search/'+Categories[3],
]

const images = [
    '@/../public/Categories/car.png',
    '@/../public/Categories/cat.png',
    '@/../public/Categories/dog.png',
    '@/../public/Categories/child.png',
    '@/../public/Categories/buildings.png',
    '@/../public/Categories/clothing.png',
    '@/../public/Categories/hometools.png',
];

const CategoryMasonry = () => {
    const theme = useTheme();
    const { colors } = theme.palette;
    const navigate = useNavigate();

    const onClickHandler = (nav) => {
        navigate(nav);
    }
    
    return (
        <Grid container direction='row' justifyContent='space-between' style={GridMainStyle}>
            <Grid container justifyContent='space-between' style={GridC1Style}>
                <Button
                    component="span"
                    sx={{...ButtonMainStyle, width: 467, height: 290, boxShadow: colors.boxShadow }}
                    onClick={()=>onClickHandler(navigates[0])}
                >
                    <Box
                        display='flex'
                        alignItems='center'
                        justifyContent='center'
                        sx={{ ...BoxImgMainStyle,width: 467, height: 290}}
                    >
                        <Text type={'Headline'} color={colors.text.primary} sr={{textAlign: 'center', fontWeight: '700'}}>
                            {buttons[0]}
                        </Text>
                    </Box>
                </Button>
                <Grid container justifyContent='space-between' style={GridC11Style}>
                    <Box
                        component="img"
                        src={images[5]}
                        alt="alt"
                        sx={{...BoxMainStyle, width: 223, height: 290, boxShadow: colors.boxShadow }}
                    />
                    
                    <Button
                        component="span"
                        sx={{...ButtonMainStyle, width: 223, height: 290, boxShadow: colors.boxShadow}}
                        onClick={()=>onClickHandler(navigates[1])}
                    >
                        <Box
                            display='flex'
                            alignItems='center'
                            justifyContent='center'
                            sx={{...BoxImgMainStyle, width: 223, height: 290}}
                        >
                            <Text type={'Headline'} color={colors.text.primary} sr={{textAlign: 'center', fontWeight: '700'}}>
                                {buttons[2]}
                            </Text>
                        </Box>
                    </Button>
                </Grid>
            </Grid>
            
            <Grid container direction='row' justifyContent='space-between' style={GridC2Style}>
                <Grid container direction='column' justifyContent='space-between' style={GridC21Style}>
                    <Box
                        component="img"
                        src={images[1]}
                        alt="alt"
                        sx={{...BoxMainStyle, width: 290, height: 90, boxShadow: colors.boxShadow}}
                    />

                    <Button
                        component="span"
                        sx={{...ButtonMainStyle, width: 290, height: 180, boxShadow: colors.boxShadow }}
                        onClick={()=>onClickHandler(navigates[2])}
                    >
                        <Box
                            display='flex'
                            alignItems='center'
                            justifyContent='center'
                            sx={{...BoxImgMainStyle, width: 290, height: 180}}
                        >
                            <Text type={'Headline'} color={colors.text.primary} sr={{textAlign: 'center', fontWeight: '700'}}>
                                {buttons[1]}
                            </Text>
                        </Box>
                    </Button>
                    
                    <Box
                        component="img"
                        src={images[2]}
                        alt="alt"
                        sx={{...BoxMainStyle, width: 290, height: 290, boxShadow: colors.boxShadow}}
                    />
                </Grid>
                
                <Grid container direction='column' justifyContent='space-between' style={GridC22Style}>
                    <Box
                        component="img"
                        src={images[0]}
                        alt="alt"
                        sx={{...BoxMainStyle, width: 223, height: 180, boxShadow: colors.boxShadow}}
                    />

                    <Button
                        component="span"
                        sx={{...ButtonMainStyle, width: 223, height: 290, boxShadow: colors.boxShadow }}
                        onClick={()=>onClickHandler(navigates[3])}
                    >
                        <Box
                            display='flex'
                            alignItems='center'
                            justifyContent='center'
                            sx={{...BoxImgMainStyle, width: 223, height: 290}}
                        >
                            <Text type={'Headline'} color={colors.text.primary} sr={{textAlign: 'center', fontWeight: '700'}}>
                                {buttons[3]}
                            </Text>
                        </Box>
                    </Button>

                    <Box
                        component="img"
                        src={images[3]}
                        alt="alt"
                        sx={{...BoxMainStyle, width: 225, height: 90 , boxShadow: colors.boxShadow}}
                    />
                </Grid>
            </Grid>
            
            <Grid container direction='column' justifyContent='space-between' style={GridC3Style}>
                <Box
                    component="img"
                    src={images[4]}
                    alt="alt"
                    sx={{...BoxMainStyle, width: 389, height: 90, boxShadow: colors.boxShadow }}
                />

                <Button
                    component="span"
                    sx={{...ButtonMainStyle, width: 396, height: 180, boxShadow: colors.boxShadow }}
                    onClick={()=>onClickHandler(navigates[4])}
                >
                    <Box
                        display='flex'
                        alignItems='center'
                        justifyContent='center'
                        sx={{...BoxImgMainStyle, width: 396, height: 180}}
                    >
                        <Text type={'Headline'} color={colors.text.primary} sr={{textAlign: 'center', fontWeight: '700'}}>
                            {buttons[4]}
                        </Text>
                    </Box>
                </Button>

                <Box
                    component="img"
                    src={images[6]}
                    alt="alt"
                    sx={{...BoxMainStyle, width: 398, height: 290, boxShadow: colors.boxShadow }}
                />
            </Grid>
        </Grid>
    );
};

export default CategoryMasonry;
