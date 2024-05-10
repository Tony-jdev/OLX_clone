import React from 'react';
import { Grid, Box, Typography, Button } from '@mui/material';
import {
    BoxImgMainStyle, BoxMainStyle,
    ButtonMainStyle,
    GridC11Style,
    GridC1Style, GridC21Style,
    GridC22Style,
    GridC2Style, GridC3Style,
    GridMainStyle, TextStyle
} from '@/components/Tools/CategoryMasonry/Styles.js';
import { useNavigate } from 'react-router-dom';
import {FormattedMessage} from "react-intl";


const buttons = [
    <FormattedMessage id='masonry.1'/>,
    <FormattedMessage id='masonry.2'/>,
    <FormattedMessage id='masonry.3'/>,
    <FormattedMessage id='masonry.4'/>,
    <FormattedMessage id='masonry.5'/>,
];

const navigates = [
    '/search',
    '/search',
    '/search',
    '/search',
    '/search',
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
    const navigate = useNavigate();

    return (
        <Grid container direction='row' justifyContent='space-between' style={GridMainStyle}>
            <Grid container justifyContent='space-between' style={GridC1Style}>
                <Button
                    component="span"
                    sx={{...ButtonMainStyle, width: 467, height: 290 }}
                    onClick={()=> navigate(navigates[0])}
                >
                    <Box
                        display='flex'
                        alignItems='center'
                        justifyContent='center'
                        sx={{ ...BoxImgMainStyle,width: 467, height: 290}}
                    >
                        <Typography style={TextStyle}>
                            {buttons[0]}
                        </Typography>
                    </Box>
                </Button>
                <Grid container justifyContent='space-between' style={GridC11Style}>
                    <Box
                        component="img"
                        src={images[5]}
                        alt="alt"
                        sx={{...BoxMainStyle, width: 223, height: 290, }}
                    />
                    
                    <Button
                        component="span"
                        sx={{...ButtonMainStyle, width: 223, height: 290 }}
                        onClick={()=> navigate(navigates[1])}
                    >
                        <Box
                            display='flex'
                            alignItems='center'
                            justifyContent='center'
                            sx={{...BoxImgMainStyle, width: 223, height: 290}}
                        >
                            <Typography style={TextStyle}>
                                {buttons[2]}
                            </Typography>
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
                        sx={{...BoxMainStyle, width: 290, height: 90}}
                    />

                    <Button
                        component="span"
                        sx={{...ButtonMainStyle, width: 290, height: 180 }}
                        onClick={()=> navigate(navigates[2])}
                    >
                        <Box
                            display='flex'
                            alignItems='center'
                            justifyContent='center'
                            sx={{...BoxImgMainStyle, width: 290, height: 180}}
                        >
                            <Typography style={TextStyle}>
                                {buttons[1]}
                            </Typography>
                        </Box>
                    </Button>
                    
                    <Box
                        component="img"
                        src={images[2]}
                        alt="alt"
                        sx={{...BoxMainStyle, width: 290, height: 290,}}
                    />
                </Grid>
                
                <Grid container direction='column' justifyContent='space-between' style={GridC22Style}>
                    <Box
                        component="img"
                        src={images[0]}
                        alt="alt"
                        sx={{...BoxMainStyle, width: 223, height: 180,}}
                    />

                    <Button
                        component="span"
                        sx={{...ButtonMainStyle, width: 223, height: 290 }}
                        onClick={()=> navigate(navigates[3])}
                    >
                        <Box
                            display='flex'
                            alignItems='center'
                            justifyContent='center'
                            sx={{...BoxImgMainStyle, width: 223, height: 290}}
                        >
                            <Typography style={TextStyle}>
                                {buttons[3]}
                            </Typography>
                        </Box>
                    </Button>

                    <Box
                        component="img"
                        src={images[3]}
                        alt="alt"
                        sx={{...BoxMainStyle, width: 225, height: 90, }}
                    />
                </Grid>
            </Grid>
            
            <Grid container direction='column' justifyContent='space-between' style={GridC3Style}>
                <Box
                    component="img"
                    src={images[4]}
                    alt="alt"
                    sx={{...BoxMainStyle, width: 389, height: 90, }}
                />

                <Button
                    component="span"
                    sx={{...ButtonMainStyle, width: 396, height: 180 }}
                    onClick={()=> navigate(navigates[4])}
                >
                    <Box
                        display='flex'
                        alignItems='center'
                        justifyContent='center'
                        sx={{...BoxImgMainStyle, width: 396, height: 180}}
                    >
                        <Typography style={TextStyle}>
                            {buttons[4]}
                        </Typography>
                    </Box>
                </Button>

                <Box
                    component="img"
                    src={images[6]}
                    alt="alt"
                    sx={{...BoxMainStyle, width: 398, height: 290, }}
                />
            </Grid>
        </Grid>
    );
};

export default CategoryMasonry;
