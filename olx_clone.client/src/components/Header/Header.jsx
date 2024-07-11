import React, {useContext, useEffect, useState} from 'react';
import { FormattedMessage } from 'react-intl';
import { AppBar, Toolbar, TextField, Box, InputAdornment, Grid, CardMedia, Container } from '@mui/material';
import { AppBarStyle, ContainerStyle, ToolBarStyle, FirstGridStyle, BoxContainerStyle, LogoStyle, PropsFieldStyle, FieldStyle, FlexBoxStyle, AddButtonStyle, AddIconStyle, ProfileButtonStyle, BottomGridStyle, LastBoxStyle } from "@/components/Header/Styles.js";
import { useTheme } from '@mui/material/styles';
import { Brightness4, Brightness7 } from '@mui/icons-material';
import ColorModeContext from "@/contexts/ColorModeContext.jsx";
import {AddIcon, LikeIcon, ProfileIcon, SearchIcon, SquareIcon} from '@/assets/Icons/Icons.jsx';
import SButton from "@/components/Tools/Button/SButton.jsx";
import {useDispatch, useSelector} from "react-redux";
import {changeLocale, changeTheme, selectLocale, selectTheme} from "@/Storage/Redux/Slices/themeAndLocaleSlice.js";
import LocationPickerButton from "@/components/Tools/LocationPickerButton/LocationPickerButton.jsx";
import {useNavigate} from "react-router-dom";
import {selectLocation, selectSearchText, setLocation, setSearchText} from "@/Storage/Redux/Slices/postSlice.js";
import Categories from "@/Helpers/mainCategoriesHelper.js";
import {isUserLoggedIn} from "@/Storage/Redux/Slices/userInfoSlice.js";
import AddPostModal from "@/components/Tools/AddPostModal/AddPostModal.jsx";
import {useAuth} from "@/providers/AuthProvider.jsx";
import {useAddPost} from "@/providers/AddPostModalProvider.jsx";
import Icon from "@/components/Tools/IconContainer/Icon.jsx";
import {LabelMedium, TitleLarge, TitleMedium, TitleSmall} from "@/components/Tools/TextContainer/Styles.js";
import {fontSize} from "@mui/system";
import UnderlineWrapper from "@/components/Tools/Button/LineWrapper.jsx";
import SquareAndTextWrapper from "@/components/Tools/Button/SquareWrapper.jsx";
import SubCategoriesWrapper from "@/components/Tools/Button/SubCategoriesWrapper.jsx";
const Header = () => {
    const navigate = useNavigate();

    const mode = useSelector(selectTheme) ?? 'light';
    const locale = useSelector(selectLocale) ?? 'uk';
    const dispatch = useDispatch();

    const {openAuth} = useAuth();

    const theme = useTheme();
    const { colors } = theme.palette;
    const colorMode = useContext(ColorModeContext);

    const searchText = useSelector(selectSearchText) ?? '';
    const [text, setText] = useState(searchText ?? '');

    const location = useSelector(selectLocation);
    const [newLocation, setNewLocation] = useState(location);

    const isUserLogined = useSelector(isUserLoggedIn);
    const [open, setOpen] = useState(false);

    const { showAddPostModal } = useAddPost();

    const toggleLocale = () => {
        const newLocale = locale === 'en' ? 'uk' : 'en';
        dispatch(changeLocale(newLocale));
    };

    const searchThings = () => {
        dispatch(setSearchText(text));
        navigate(`./search`, { state: { refresh: new Date().getTime() } });
    }

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            searchThings();
        }
    };

    const authHandle = ()=>  {
        navigate('/user/Settings');
    }

    useEffect(() => {
        console.log(location);
        console.log(newLocation);
    }, []);

    useEffect(() => {
        dispatch(setLocation(newLocation));
    }, [newLocation]);

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
                                       placeholder={"Пошук"}
                                       onChange={(e)=>setText(e.target.value)}
                                       onKeyDown={handleKeyDown}

                                       InputProps={{
                                           startAdornment: (
                                               <InputAdornment position="start" sx={{marginLeft: '-8px'}}>
                                                   <SButton isIconButton={true}
                                                            icon={ <SearchIcon style={{fill: colors.text.revers}}/>}
                                                            action={searchThings}
                                                   />
                                               </InputAdornment>
                                           ),
                                           inputProps: {
                                               style: LabelMedium
                                           },
                                           style: PropsFieldStyle,
                                           sx: { backgroundColor: colors.transparent }
                                       }}
                                       style={FieldStyle}
                                       sx={{ color: colors.text.input,
                                           '& input:-internal-autofill-selected': {
                                               paddingTop: 1,
                                               paddingBottom: 1,
                                               paddingLeft: 7.5,
                                               marginLeft: -6.5,
                                           },
                                           '& .MuiInputBase-input.MuiOutlinedInput-input': {
                                               paddingTop: 1,
                                               paddingBottom: 1,
                                               paddingLeft: 7.5,
                                               marginLeft: -6.5,
                                           },
                                       }}
                            >
                            </TextField>
                        </Box>
                        <Box style={FlexBoxStyle}>
                            <SButton
                                type='orangeRoundButton'
                                textType={'Body'}
                                sl={ {backgroundColor: colors.background.orange}}
                                Color={colors.text.revers}
                                hoverBack={colors.background.orange}
                                hoverShadow={colors.types.shadows.boxShadowWarning}
                                sr={{width: '200px', height: '40px', }}
                                textSR={{marginLeft: '8px', fontWeight: '600', letterSpacing: '0,1px'}}
                                textSt={TitleSmall}
                                prew={
                                    <Icon
                                        icon={AddIcon}
                                        color={colors.text.primary}
                                        step={1}
                                        width={18}
                                        height={18}
                                    />
                                }
                                text={<FormattedMessage id="header.addButtonLabel"/>}
                                action={()=>navigate('/create')}
                            />

                            <SButton
                                isIconButton={true}
                                icon={
                                    <Icon
                                        icon={ProfileIcon}
                                        color={colors.text.primary}
                                        hoverColor={colors.text.secondary}
                                        step={1}
                                        width={36}
                                        height={36}
                                    />
                                }
                                sl={{...ProfileButtonStyle, color: colors.text.primary}}
                                action={()=>navigate('/user')}
                            />

                            <SButton isIconButton={true}
                                     action={()=>{
                                         navigate('user/Favorites');
                                     }}
                                     icon={<Icon
                                         icon={LikeIcon}
                                         color={colors.text.primary}
                                         hoverColor={colors.text.secondary}
                                         step={2}
                                         width={30}
                                         height={30}
                                     />}
                            />

                            <SButton
                                type='transparentButton'
                                action={toggleLocale}
                                Color={colors.text.primary}
                                textSt={TitleMedium}
                                prewColor={locale === 'uk' ? colors.text.orange : colors.text.primary}
                                nextColor={locale === 'en' ? colors.text.orange : colors.text.primary}
                                prew={<Box style={{fontSize: '14', fontWeight: '500', lineHeight: '20px'}}>Ua</Box>}
                                text={'|'}
                                next={<Box style={{fontSize: '14', fontWeight: '500', lineHeight: '20px'}}>En</Box>}
                                sl={{color: colors.text.primary }}
                            />
                        </Box>
                    </Grid>
                </Toolbar>
                <Toolbar style={ToolBarStyle}>
                    <Grid container style={BottomGridStyle}>
                        <Box style={LastBoxStyle} >
                            <LocationPickerButton location={location} setLocation={setNewLocation} Color={colors.text.orange}/>

                            <SubCategoriesWrapper categoryId={3} Color={colors.categories.p}>
                                <UnderlineWrapper underlineColor={colors.categories.p}>
                                    <SquareAndTextWrapper
                                        squareIcon={<SquareIcon sx={{ width: '10px', height: '10px' }} />}
                                        squareColor={colors.categories.p}
                                        textColor={colors.text.primary}
                                    >
                                        <SButton
                                            type='transparentButton'
                                            sr={{padding: "0px 8px 0px 18px"}}
                                            action={() => navigate('./search/' + Categories[3])}
                                            text={<FormattedMessage id="category.realEstate" />}
                                            textSt={TitleMedium}
                                        />
                                    </SquareAndTextWrapper>
                                </UnderlineWrapper>
                            </SubCategoriesWrapper>

                            <SubCategoriesWrapper categoryId={4} Color={colors.categories.g}>
                                <UnderlineWrapper underlineColor={colors.categories.g}>
                                    <SquareAndTextWrapper
                                        squareIcon={<SquareIcon sx={{ width: '10px', height: '10px' }} />}
                                        squareColor={colors.categories.g}
                                        textColor={colors.text.primary}
                                    >
                                        <SButton
                                            type='transparentButton'
                                            sr={{padding: "0px 8px 0px 18px"}}
                                            action={() => navigate('./search/' + Categories[5])}
                                            text={<FormattedMessage id="category.animals"/>}
                                            textSt={TitleMedium}
                                        />
                                    </SquareAndTextWrapper>
                                </UnderlineWrapper>
                            </SubCategoriesWrapper>

                            <SubCategoriesWrapper categoryId={5} Color={colors.categories.y}>
                                <UnderlineWrapper underlineColor={colors.categories.y}>
                                    <SquareAndTextWrapper
                                        squareIcon={<SquareIcon sx={{ width: '10px', height: '10px' }} />}
                                        squareColor={colors.categories.y}
                                        textColor={colors.text.primary}
                                    >
                                        <SButton
                                            type='transparentButton'
                                            sr={{padding: "0px 8px 0px 18px"}}
                                            action={() => navigate('./search/' + Categories[8])}
                                            text={<FormattedMessage id="category.childrensWorld"/>}
                                            textSt={TitleMedium}
                                        />
                                    </SquareAndTextWrapper>
                                </UnderlineWrapper>
                            </SubCategoriesWrapper>
                            
                            <SubCategoriesWrapper categoryId={2} Color={colors.categories.o}>
                                <UnderlineWrapper underlineColor={colors.categories.o}>
                                    <SquareAndTextWrapper
                                        squareIcon={<SquareIcon sx={{ width: '10px', height: '10px' }} />}
                                        squareColor={colors.categories.o}
                                        textColor={colors.text.primary}
                                    >
                                        <SButton
                                            type='transparentButton'
                                            sr={{padding: "0px 8px 0px 18px"}}
                                            action={() => navigate('./search/' + Categories[1])}
                                            text={<FormattedMessage id="category.fashion"/>}
                                            textSt={TitleMedium}
                                        />
                                    </SquareAndTextWrapper>
                                </UnderlineWrapper>
                            </SubCategoriesWrapper>

                            <SubCategoriesWrapper categoryId={1} Color={colors.categories.b}>
                                <UnderlineWrapper underlineColor={colors.categories.b}>
                                    <SquareAndTextWrapper
                                        squareIcon={<SquareIcon sx={{ width: '10px', height: '10px' }} />}
                                        squareColor={colors.categories.b}
                                        textColor={colors.text.primary}
                                    >
                                        <SButton
                                            type='transparentButton'
                                            sr={{padding: "0px 8px 0px 18px"}}
                                            action={() => navigate('./search/' + Categories[0])}
                                            text={<FormattedMessage id="category.electronics"/>}
                                            textSt={TitleMedium}
                                        />
                                    </SquareAndTextWrapper>
                                </UnderlineWrapper>
                            </SubCategoriesWrapper>

                        </Box>
                    </Grid>
                </Toolbar>
            </Container>
        </AppBar>
    );
};

export default Header;
