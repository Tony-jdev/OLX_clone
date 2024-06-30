import React, {useEffect} from 'react';
import {Grid, Typography, Button, Box, Container} from '@mui/material';
import { FormattedMessage } from 'react-intl';
import SButton from '@/components/Tools/Button/SButton.jsx';
import {
    ProfileContainer,
    Sidebar,
    MainContent,
} from './Styles';
import {useDispatch, useSelector} from 'react-redux';
import UserInfo from "@/components/Pages/UserProfileContainer/MiniPages/UserInfo/UserInfo.jsx";
import {useTheme} from "@mui/material/styles";
import {HistoryViewsIcon, LikedIcon, MyMessagesIcon, MyPostsIcon, SettingsIcon} from "@/assets/Icons/Icons.jsx";
import PagePointer from "@/components/Tools/PagePointer/PagePointer.jsx";
import {useNavigate, useParams} from "react-router-dom";
import {logOut} from "@/Storage/Redux/Slices/userInfoSlice.js";
import MyPosts from "@/components/Pages/UserProfileContainer/MiniPages/MyPosts/MyPosts.jsx";
import {selectMessage} from "@/Storage/Redux/Slices/userAuthSlice.js";
import {setMessage} from "@/Storage/Redux/Slices/userAuthSlice.js";


const profileItems = [
    { id: 'profile.ads', label: 'Ads', type: 'sideBarBtnStyle', icon: <MyPostsIcon/>, miniPage: <MyPosts/> },
    { id: 'profile.favorites', label: 'Favorites', type: 'sideBarBtnStyle', icon: <LikedIcon/>, miniPage: <></>},
    { id: 'profile.messages', label: 'Messages', type: 'sideBarBtnStyle', icon: <MyMessagesIcon/>, miniPage: <></>},
    { id: 'profile.viewedProducts', label: 'ViewedProducts', type: 'sideBarBtnStyle', icon: <HistoryViewsIcon/>, miniPage: <></>},
    { id: 'profile.settings', label: 'Settings', type: 'sideBarBtnStyle', icon: <SettingsIcon/>, miniPage: <UserInfo/> },
    { id: 'profile.logout', label: 'LogOut', type: 'carouselButton'},
];

const UserProfile = () => {
    const theme = useTheme();
    const { colors } = theme.palette;

    let { miniPage } = useParams();
    const way = ['user', miniPage ?? profileItems[0].label,];
    
    
    const navigate = useNavigate();
    
    const dispatch = useDispatch();
    const message = useSelector(selectMessage);

    const getMiniPageByLabel = (label) => {
        const item = profileItems.find(item => item.label === label);
        return item ? item.miniPage : null;
    };

    const handleLogOut = () =>  {
        dispatch(logOut());
        dispatch(setMessage('Log out successs!'));
    };
    
    return (
        <Container style={{maxWidth: 1440, paddingTop: '10px', paddingBottom: '10px'}}>
            <PagePointer way={way}/>
            <Grid container direction='row' justifyContent="center" wrap='nowrap'  sx={ProfileContainer}>
                <Grid item sx={{maxWidth: '345px', width: '100%', marginRight: '20px',}}>
                    <Grid style={Sidebar} sx={{background: colors.background.secondary, boxShadow: colors.boxShadow}}>
                        {profileItems.slice(0, -1).map((item, index) => (
                            <SButton
                                key={item.id}
                                link={item.label}
                                type={item.type}
                                textType={'Title'}
                                prew={React.cloneElement(item.icon, { sx: { color: item.label === way[1] ? colors.text.orange : colors.text.revers, marginRight: '10px', height: '36px', width: '36px' } })}
                                text={<FormattedMessage id={item.id} />}
                                action={()=>navigate(`../user/${item.label}`)}
                                sl={{ width: '100%', color: colors.text.revers, "&:hover": { boxShadow: colors.boxShadow } }}
                                textSR={{fontWeight: item.label === way[1] ? '700' : ''}}
                            />
                        ))}
                        <SButton
                            key={profileItems[5].id}
                            link={profileItems[5].label}
                            type={profileItems[5].type}
                            textType={'Title'}
                            Color={colors.text.primary}
                            sl={
                                {
                                    background: colors.background.darkGradient,
                                    "&:hover":{ boxShadow: colors.boxShadow},
                                    maxWidth: '305px', maxHeight: '40px', 
                                    width: '100%', marginTop: '20px',
                                }}
                            text={<FormattedMessage id={profileItems[5].id} />}
                            action={handleLogOut}
                        />
                    </Grid>
                </Grid>
                <Grid item sx={MainContent}>
                    {getMiniPageByLabel(way[1])}
                </Grid>
            </Grid>
        </Container>
    );
};

export default UserProfile;
