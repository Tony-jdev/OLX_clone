import React, {useEffect} from 'react';
import {Grid, Typography, Button, Box, Container, CircularProgress} from '@mui/material';
import { FormattedMessage } from 'react-intl';
import SButton from '@/components/Tools/Button/SButton.jsx';
import {
    InfoBlock,
    InfoTitle,
    InfoText,
    ButtonGroup,
} from './Styles';
import {useDispatch, useSelector} from "react-redux";
import {fetchUserDataAsync, selectToken, selectUser} from "@/Storage/Redux/Slices/UserInfoSlice.js";
import OrangeProgress from "@/components/Tools/CentralProgress/OrangeProgress.jsx";
import {useTheme} from "@mui/material/styles";

const UserProfile = () => {
    const theme = useTheme();
    const { colors } = theme.palette;
    
    const dispatch = useDispatch();
    const user = useSelector(selectUser);
    const token = useSelector(selectToken);

    useEffect(() => {
        if (token) {
            dispatch(fetchUserDataAsync());
        }
    }, [token]);

    if (!user) {
        return <OrangeProgress/>;
    }
    
    const mainInfo = {
        name: user.name,
        surname: user.surname,
        email: user.email,
        phone: user.phone,
    }
    
    const additionalInfo = {
        birthDate: '04.11.2004',
        gender: "male",
        maritalStatus: "not",
        hobbies: "eme game",
        pets: 'cats',
        occupation: 'non',
    }

    return (
        <>
            <Box sx={{...InfoBlock, background: colors.background.secondary, boxShadow: colors.boxShadow}}>
                <Typography sx={InfoTitle}><FormattedMessage id="profile.contactInfo" /></Typography>
                <Typography sx={InfoText}><FormattedMessage id="profile.name" />: {mainInfo.name}</Typography>
                <Typography sx={InfoText}><FormattedMessage id="profile.surname" />: {mainInfo.surname}</Typography>
                <Typography sx={InfoText}><FormattedMessage id="profile.email" />: {mainInfo.email}</Typography>
                <Typography sx={InfoText}><FormattedMessage id="profile.phone" />: {mainInfo.phone}</Typography>
            </Box>
            <Box sx={{...InfoBlock, background: colors.background.secondary, boxShadow: colors.boxShadow}}>
                <Typography sx={InfoTitle}><FormattedMessage id="profile.additionalInfo" /></Typography>
                <Typography sx={InfoText}><FormattedMessage id="profile.birthDate" />: {additionalInfo.birthDate}</Typography>
                <Typography sx={InfoText}><FormattedMessage id="profile.gender" />: {additionalInfo.gender}</Typography>
                <Typography sx={InfoText}><FormattedMessage id="profile.maritalStatus" />: {additionalInfo.maritalStatus}</Typography>
                <Typography sx={InfoText}><FormattedMessage id="profile.hobbies" />: {additionalInfo.hobbies}</Typography>
                <Typography sx={InfoText}><FormattedMessage id="profile.pets" />: {additionalInfo.pets}</Typography>
                <Typography sx={InfoText}><FormattedMessage id="profile.occupation" />: {additionalInfo.occupation}</Typography>
            </Box>
            <Box sx={{...ButtonGroup, background: colors.background.secondary, boxShadow: colors.boxShadow}}>
                <SButton type='whiteOutlined' text={<FormattedMessage id="profile.changePassword" />} />
                <SButton type='orange' text={<FormattedMessage id="profile.resetPassword" />} />
            </Box>
        </>
    );
};

export default UserProfile;

