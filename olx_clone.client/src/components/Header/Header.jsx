import React, { useContext } from 'react';
import { FormattedMessage } from 'react-intl';
import { AppBar, Toolbar, IconButton, Typography, TextField, Box, InputAdornment, Button, Grid, CardMedia, Container } from '@mui/material';
import { AppBarStyle, ContainerStyle, ToolBarStyle, FirstGridStyle, BoxContainerStyle, LogoStyle, PropsFieldStyle, FieldStyle, FlexBoxStyle, AddButtonStyle, AddIconStyle, ProfileButtonStyle, BottomGridStyle, LastBoxStyle } from "@/components/Header/Styles.js";
import { useTheme } from '@mui/material/styles';
import { Brightness4, Brightness7 } from '@mui/icons-material';
import ColorModeContext from "@/contexts/ColorModeContext.jsx";
import {LocationIcon, AddIcon, ProfileIcon, SearchIcon} from '@/assets/Icons/Icons.jsx';
import SButton from "@/components/Tools/Button/SButton.jsx";
import {useDispatch, useSelector} from "react-redux";
import {changeLocale, changeTheme, selectLocale, selectTheme} from "@/Storage/Redux/Slices/themeAndLocaleSlice.js";
const Header = () => {

    const mode = useSelector(selectTheme) ?? 'light';
    const locale = useSelector(selectLocale) ?? 'uk';
    const dispatch = useDispatch();
    
    const theme = useTheme();
    const { colors } = theme.palette;
    const colorMode = useContext(ColorModeContext);

    const toggleTheme = () => {
        const newTheme = mode === 'light' ? 'dark' : 'light';
        dispatch(changeTheme(newTheme));
    };

    const toggleLocale = () => {
        const newLocale = locale === 'en' ? 'uk' : 'en';
        dispatch(changeLocale(newLocale));
    };
    
    return (
        <AppBar style={AppBarStyle} sx={{ backgroundColor: colors.background.primary }}>
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
                            <TextField title='non'
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <SButton isIconButton={true} icon={ <SearchIcon style={{fill: colors.text.orange}}/>}/>
                                        </InputAdornment>
                                    ),
                                    style: PropsFieldStyle,
                                    sx: { backgroundColor: colors.background.secondary }
                                }}
                                style={FieldStyle}
                                sx={{ color: colors.text.input }}>
                            </TextField>
                        </Box>
                        <Box style={FlexBoxStyle}>
                            <SButton
                              type='orangeRoundButton'
                              sl={ {backgroundColor: colors.background.orange, color: colors.text.input} }
                              prew={<AddIcon style={AddIconStyle} sx={{ color: colors.text.primary }} />}
                              text={<FormattedMessage id="header.addButtonLabel"/>}
                            />

                            <SButton isIconButton={true} 
                                     action={toggleTheme} 
                                     icon={mode === 'dark' ? <Brightness7 /> : <Brightness4 />}
                                     sl={{...ProfileButtonStyle, color: colors.text.primary}}
                            />
                            
                            <SButton
                                isIconButton={true}
                                icon={ <ProfileIcon /> }
                                sl={{...ProfileButtonStyle, color: colors.text.primary}}
                            />
                            
                            <SButton
                                type='transparentButton'
                                action={toggleLocale}
                                prew={<Typography sx={locale === 'uk' ? {color: colors.text.orange} : {color: colors.text.primary}}>Ua</Typography>}
                                text='|'
                                next={ <Typography sx={locale === 'en' ? {color: colors.text.orange} : {color: colors.text.primary}}>En</Typography>}
                                sl={{color: colors.text.primary }}
                            />
                        </Box>
                    </Grid>
                </Toolbar>
                <Toolbar style={ToolBarStyle}>
                    <Grid container style={BottomGridStyle}>
                        <Box>
                            <SButton type='transparentButton'
                                     text={
                                         <Typography sx={{ color: colors.text.primary }}>
                                             <FormattedMessage id="header.locationLabel"/>
                                         </Typography>
                                     } 
                                     prew={<LocationIcon sx={{ color: colors.background.orange }} />} />
                        </Box>
                        <Box style={LastBoxStyle} >
                            
                            <SButton type='transparentButton'
                                     text={<FormattedMessage id="header.realEstateLabel"/>}
                                     sl={{ color: colors.text.primary }}/>
                            <SButton type='transparentButton' 
                                     text={<FormattedMessage id="header.technologyLabel"/>}
                                     sl={{ color: colors.text.primary }}/>
                            <SButton type='transparentButton'
                                     text={<FormattedMessage id="header.kidsLabel"/>}
                                     sl={{ color: colors.text.primary }}/>
                            <SButton type='transparentButton'
                                     text={<FormattedMessage id="header.clothingLabel"/>}
                                     sl={{ color: colors.text.primary }}/>
                            <SButton type='transparentButton'
                                     text={<FormattedMessage id="header.animalsLabel"/>}
                                     sl={{ color: colors.text.primary }}/>
                        </Box>
                    </Grid>
                </Toolbar>
            </Container>
        </AppBar>
    );
};

export default Header;
