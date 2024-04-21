import React, { useContext } from 'react';
import { FormattedMessage } from 'react-intl';
import { AppBar, Toolbar, IconButton, Typography, TextField, Box, InputAdornment, Button, Grid, CardMedia, Container } from '@mui/material';
import { AppBarStyle, ContainerStyle, ToolBarStyle, FirstGridStyle, BoxContainerStyle, LogoStyle, PropsFieldStyle, FieldStyle, FlexBoxStyle, AddButtonStyle, AddIconStyle, ProfileButtonStyle, BottomGridStyle, LastBoxStyle } from "@/components/Header/Styles.js";
import { useTheme } from '@mui/material/styles';
import { Brightness4, Brightness7 } from '@mui/icons-material';
import ColorModeContext from "@/contexts/ColorModeContext.jsx";
import {LocationIcon, AddIcon, ProfileIcon, SearchIcon} from '@/assets/Icons/Icons.jsx';
const Header = ({changeLanguage, language}) => {
    const theme = useTheme();
    const { header } = theme.palette;
    const colorMode = useContext(ColorModeContext);
    
    return (
        <AppBar style={AppBarStyle} sx={{ backgroundColor: header.background.primary }}>
            <Container style={ContainerStyle}>
                <Toolbar style={ToolBarStyle}>
                    <Grid container style={FirstGridStyle}>
                        <Box style={BoxContainerStyle}>
                            <CardMedia
                                component='img'
                                image='../../../public/LogoBar1.png'
                                alt='Logo'
                                sx={LogoStyle}
                            />
                            <TextField
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <IconButton>
                                                <SearchIcon />
                                            </IconButton>
                                        </InputAdornment>
                                    ),
                                    style: PropsFieldStyle,
                                    sx: { backgroundColor: header.background.secondary }
                                }}
                                style={FieldStyle}
                                sx={{ color: header.text.input }}>
                            </TextField>
                        </Box>
                        <Box style={FlexBoxStyle}>
                            <Button style={AddButtonStyle} sx={{ backgroundColor: header.button.primary, color: header.text.input }}>
                                <AddIcon style={AddIconStyle} sx={{ color: header.text.primary }} />
                                <FormattedMessage id="header.addButtonLabel"/>
                            </Button>

                            <IconButton onClick={colorMode.toggleColorMode} color='inherit' sx={{ border: 'none' }}>
                                {theme.palette.mode === 'dark' ? <Brightness7 /> : <Brightness4 />}
                            </IconButton>
                            <IconButton style={ProfileButtonStyle} sx={{ color: header.button.secondary }}>
                                <ProfileIcon />
                            </IconButton>
                            <Button onClick={() => changeLanguage(language === 'uk' ? 'en' : 'uk')} sx={{ color: header.button.secondary }}>
                                <Typography sx={language === 'uk' ? {color: header.button.primary} : {color: header.button.secondary}}>Ua</Typography>
                                |
                                <Typography sx={language === 'en' ? {color: header.button.primary} : {color: header.button.secondary}}>En</Typography>
                            </Button>
                        </Box>
                    </Grid>
                </Toolbar>
                <Toolbar style={ToolBarStyle}>
                    <Grid container style={BottomGridStyle}>
                        <Box>
                            <IconButton sx={{ color: header.button.primary }}>
                                <LocationIcon />
                                <Typography sx={{ color: header.text.primary }}>
                                    <FormattedMessage id="header.locationLabel"/>
                                </Typography>
                            </IconButton>
                        </Box>
                        <Box style={LastBoxStyle} >
                            <Button sx={{ color: header.text.primary }}>
                                <FormattedMessage id="header.realEstateLabel"/>
                            </Button>
                            <Button sx={{ color: header.text.primary }}>
                                <FormattedMessage id="header.technologyLabel"/>
                            </Button>
                            <Button sx={{ color: header.text.primary }}>
                                <FormattedMessage id="header.kidsLabel"/>
                            </Button>
                            <Button sx={{ color: header.text.primary }}>
                                <FormattedMessage id="header.clothingLabel"/>
                            </Button>
                            <Button sx={{ color: header.text.primary }}>
                                <FormattedMessage id="header.animalsLabel"/>
                            </Button>
                        </Box>
                    </Grid>
                </Toolbar>
            </Container>
        </AppBar>
    );
};

export default Header;
