import React, {useContext, useState} from 'react';
import { FormattedMessage } from 'react-intl';
import { AppBar, Toolbar, IconButton, Typography, TextField, Box, InputAdornment, Button, Grid, CardMedia, Container } from '@mui/material';
import { AppBarStyle, ContainerStyle, ToolBarStyle, FirstGridStyle, BoxContainerStyle, LogoStyle, PropsFieldStyle, FieldStyle, FlexBoxStyle, AddButtonStyle, AddIconStyle, ProfileButtonStyle, BottomGridStyle, LastBoxStyle } from "@/components/Header/Styles.js";
import { useTheme } from '@mui/material/styles';
import { Brightness4, Brightness7 } from '@mui/icons-material';
import ColorModeContext from "@/contexts/ColorModeContext.jsx";
import {AddIcon, ProfileIcon, SearchIcon} from '@/assets/Icons/Icons.jsx';
import SButton from "@/components/Tools/Button/SButton.jsx";
import {useDispatch, useSelector} from "react-redux";
import {changeLocale, changeTheme, selectLocale, selectTheme} from "@/Storage/Redux/Slices/themeAndLocaleSlice.js";
import LocationPickerButton from "@/components/Tools/LocationPickerButton/LocationPickerButton.jsx";
import {useNavigate} from "react-router-dom";
import {selectSearchText, setSearchText} from "@/Storage/Redux/Slices/postSlice.js";
import Categories from "@/Helpers/mainCategoriesHelper.js";
const Header = () => {
    const navigate = useNavigate();

    const mode = useSelector(selectTheme) ?? 'light';
    const locale = useSelector(selectLocale) ?? 'uk';
    const dispatch = useDispatch();
    
    const theme = useTheme();
    const { colors } = theme.palette;
    const colorMode = useContext(ColorModeContext);

    const searchText = useSelector(selectSearchText) ?? '';
    const [text, setText] = useState(searchText ?? '');
    
    const toggleTheme = () => {
        const newTheme = mode === 'light' ? 'dark' : 'light';
        dispatch(changeTheme(newTheme));
    };

    const toggleLocale = () => {
        const newLocale = locale === 'en' ? 'uk' : 'en';
        dispatch(changeLocale(newLocale));
    };
    
    const searchThings = () => {
        dispatch(setSearchText(text));
        navigate('./search');
    }
    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            searchThings();
        }
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
                                onClick={()=>{navigate('./')}}
                            />
                            <TextField title='non' 
                                       value={text} 
                                       onChange={(e)=>setText(e.target.value)}
                                       onKeyDown={handleKeyDown}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <SButton isIconButton={true} 
                                                     icon={ <SearchIcon style={{fill: colors.text.orange}}/>}
                                                     action={searchThings}
                                            />
                                        </InputAdornment>
                                    ),
                                    style: PropsFieldStyle,
                                    sx: { backgroundColor: colors.background.secondary }
                                }}
                                style={FieldStyle}
                                sx={{ color: colors.text.input,
                                    '& input:-internal-autofill-selected': {
                                        paddingTop: 1,
                                        paddingBottom: 1,
                                        paddingLeft: 7.5,
                                        marginLeft: -7.5,
                                    },
                                    '& .MuiInputBase-input.MuiOutlinedInput-input': {
                                        paddingTop: 1,
                                        paddingBottom: 1,
                                        paddingLeft: 7.5,
                                        marginLeft: -7.5,
                                    },
                                }} 
                            >
                            </TextField>
                            <LocationPickerButton/>
                        </Box>
                        <Box style={FlexBoxStyle}>
                            <SButton
                              type='orangeRoundButton'
                              sl={ {backgroundColor: colors.background.orange, color: colors.text.primary} }
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
                        <Box style={LastBoxStyle} >
                            <SButton type='transparentButton'
                                     text={<FormattedMessage id="category.electronics"/>}
                                     sl={{ color: colors.text.primary }}
                                     action={()=>{ 
                                         navigate('./search/'+Categories[0]);
                                     }}
                            />
                            <SButton type='transparentButton' 
                                     text={<FormattedMessage id="category.fashion"/>}
                                     sl={{ color: colors.text.primary }}
                                     action={()=>{
                                         navigate('./search/'+Categories[1]);
                                     }}                            />
                            <SButton type='transparentButton'
                                     text={<FormattedMessage id="category.homeAndGarden"/>}
                                     sl={{ color: colors.text.primary }}
                                     action={()=>{
                                         navigate('./search/'+Categories[2]);
                                     }}                            />
                            <SButton type='transparentButton'
                                     text={<FormattedMessage id="category.realEstate"/>}
                                     sl={{ color: colors.text.primary }}
                                     action={()=>{
                                         navigate('./search/'+Categories[3]);
                                     }}                            />
                            <SButton type='transparentButton'
                                     text={<FormattedMessage id="category.cars"/>}
                                     sl={{ color: colors.text.primary }}
                                     action={()=>{
                                         navigate('./search/'+Categories[4]);
                                     }}                            />
                            <SButton type='transparentButton'
                                     text={<FormattedMessage id="category.animals"/>}
                                     sl={{ color: colors.text.primary }}
                                     action={()=>{
                                         navigate('./search/'+Categories[5]);
                                     }}                            />
                            <SButton type='transparentButton'
                                     text={<FormattedMessage id="category.job"/>}
                                     sl={{ color: colors.text.primary }}
                                     action={()=>{
                                         navigate('./search/'+Categories[6]);
                                     }}                            />
                            <SButton type='transparentButton'
                                     text={<FormattedMessage id="category.businessAndServices"/>}
                                     sl={{ color: colors.text.primary }}
                                     action={()=>{
                                         navigate('./search/'+Categories[7]);
                                     }}                            />
                            <SButton type='transparentButton'
                                     text={<FormattedMessage id="category.childrensWorld"/>}
                                     sl={{ color: colors.text.primary }}
                                     action={()=>{
                                         navigate('./search/'+Categories[8]);
                                     }}                            />
                            <SButton type='transparentButton'
                                     text={<FormattedMessage id="category.sport"/>}
                                     sl={{ color: colors.text.primary }}
                                     action={()=>{
                                         navigate('./search/'+Categories[9]);
                                     }}                            
                            />
                        </Box>
                    </Grid>
                </Toolbar>
            </Container>
        </AppBar>
    );
};

export default Header;
