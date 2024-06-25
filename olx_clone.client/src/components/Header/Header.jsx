import React, {useContext, useState} from 'react';
import { FormattedMessage } from 'react-intl';
import { AppBar, Toolbar, IconButton, Typography, TextField, Box, InputAdornment, Button, Grid, CardMedia, Container } from '@mui/material';
import { AppBarStyle, ContainerStyle, ToolBarStyle, FirstGridStyle, BoxContainerStyle, LogoStyle, PropsFieldStyle, FieldStyle, FlexBoxStyle, AddButtonStyle, AddIconStyle, ProfileButtonStyle, BottomGridStyle, LastBoxStyle } from "@/components/Header/Styles.js";
import { useTheme } from '@mui/material/styles';
import { Brightness4, Brightness7 } from '@mui/icons-material';
import ColorModeContext from "@/contexts/ColorModeContext.jsx";
import {AddIcon, ProfileIcon, SearchIcon, SquareIcon} from '@/assets/Icons/Icons.jsx';
import SButton from "@/components/Tools/Button/SButton.jsx";
import {useDispatch, useSelector} from "react-redux";
import {changeLocale, changeTheme, selectLocale, selectTheme} from "@/Storage/Redux/Slices/themeAndLocaleSlice.js";
import LocationPickerButton from "@/components/Tools/LocationPickerButton/LocationPickerButton.jsx";
import {useNavigate} from "react-router-dom";
import {selectSearchText, setSearchText} from "@/Storage/Redux/Slices/postSlice.js";
import Categories from "@/Helpers/mainCategoriesHelper.js";
import {isUserLoggedIn} from "@/Storage/Redux/Slices/userInfoSlice.js";
import AddPostModal from "@/components/Tools/AddPostModal/AddPostModal.jsx";
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

    const isUserLogined = useSelector(isUserLoggedIn);
    const [open, setOpen] = useState(false);

    const handleOpen = () => {
        if(isUserLogined)
        setOpen(true);
        else navigate('/auth');
    };

    const handleClose = () => {
        setOpen(false);
    };
    
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
    
    const authHandle = ()=>  {
        navigate('/user/Settings');
    }

    function getRandomBrightColor() {
        const letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 3; i++) {
            // Генеруємо яскравий колір, обираючи випадкове значення в діапазоні 8-F для кожного каналу RGB
            color += letters[Math.floor(Math.random() * 8) + 8];
            color += letters[Math.floor(Math.random() * 8) + 8];
        }
        return color;
    }
    
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
                              textType={'Body'}
                              sl={ {backgroundColor: colors.background.orange}}
                              Color={colors.text.primary}
                              hoverBack={colors.background.orange}
                              hoverShadow={colors.types.shadows.boxShadowWarning}
                              sr={{width: '200px', height: '40px'}}
                              prew={<AddIcon style={AddIconStyle} sx={{ color: colors.text.primary }} />}
                              text={<FormattedMessage id="header.addButtonLabel"/>}
                              action={handleOpen}
                            />
                            <AddPostModal open={open} handleClose={handleClose}/>

                            <SButton isIconButton={true} 
                                     action={toggleTheme} 
                                     icon={mode === 'dark' ? <Brightness7 /> : <Brightness4 />}
                                     sl={{...ProfileButtonStyle, color: colors.text.primary}}
                            />
                            
                            <SButton
                                isIconButton={true}
                                icon={ <ProfileIcon /> }
                                sl={{...ProfileButtonStyle, color: colors.text.primary}}
                                action={authHandle}
                            />
                            
                            <SButton
                                type='transparentButton'
                                action={toggleLocale}
                                textType={'Body'}
                                Color={colors.text.primary}
                                prewColor={locale === 'uk' ? colors.text.orange : colors.text.primary}
                                nextColor={locale === 'en' ? colors.text.orange : colors.text.primary}
                                prew={<Box>Ua</Box>}
                                text={'|'}
                                next={<Box>En</Box>}
                                sl={{color: colors.text.primary }}
                            />
                        </Box>
                    </Grid>
                </Toolbar>
                <Toolbar style={ToolBarStyle}>
                    <Grid container style={BottomGridStyle}>
                        <Box style={LastBoxStyle} >
                            <SButton type='transparentButton'
                                     Color={colors.text.primary}
                                     text={<FormattedMessage id="category.realEstate"/>}
                                     sl={{ color: colors.text.primary }}
                                     prewColor={getRandomBrightColor()}
                                     prew={<SquareIcon sx={{width: '10px', height: '10px', marginRight: '5px'}}/>}
                                     action={()=>{
                                         navigate('./search/'+Categories[3]);
                                     }}                            />
                            <SButton type='transparentButton'
                                     Color={colors.text.primary}
                                     prewColor={getRandomBrightColor()}
                                     prew={<SquareIcon sx={{width: '10px', height: '10px', marginRight: '5px'}}/>}
                                     text={<FormattedMessage id="category.animals"/>}
                                     sl={{ color: colors.text.primary }}
                                     action={()=>{
                                         navigate('./search/'+Categories[5]);
                                     }}                            />
                            <SButton type='transparentButton'
                                     Color={colors.text.primary}
                                     prewColor={getRandomBrightColor()}
                                     prew={<SquareIcon sx={{width: '10px', height: '10px', marginRight: '5px'}}/>}
                                     text={<FormattedMessage id="category.childrensWorld"/>}
                                     sl={{ color: colors.text.primary }}
                                     action={()=>{
                                         navigate('./search/'+Categories[8]);
                                     }}                            />
                            <SButton type='transparentButton'
                                     Color={colors.text.primary}
                                     prewColor={getRandomBrightColor()}
                                     prew={<SquareIcon sx={{width: '10px', height: '10px', marginRight: '5px'}}/>}
                                     text={<FormattedMessage id="category.fashion"/>}
                                     sl={{ color: colors.text.primary }}
                                     action={()=>{
                                         navigate('./search/'+Categories[1]);
                                     }}                            />
                            <SButton type='transparentButton'
                                     Color={colors.text.primary}
                                     prewColor={getRandomBrightColor()}
                                     prew={<SquareIcon sx={{width: '10px', height: '10px', marginRight: '5px'}}/>}
                                     text={<FormattedMessage id="category.electronics"/>}
                                     sl={{ color: colors.text.primary }}
                                     action={()=>{ 
                                         navigate('./search/'+Categories[0]);
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
