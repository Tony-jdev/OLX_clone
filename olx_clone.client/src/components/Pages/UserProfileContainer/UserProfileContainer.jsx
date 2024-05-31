import React from 'react';
import { Grid, Typography, Button, Box } from '@mui/material';
import { FormattedMessage } from 'react-intl';
import SButton from '@/components/Tools/Button/SButton.jsx';
import {
    ProfileContainer,
    Sidebar,
    SidebarItem,
    SidebarButton,
    MainContent,
    InfoBlock,
    InfoTitle,
    InfoText,
    ButtonGroup,
} from './Styles';
import { useSelector } from 'react-redux';
//import { selectUserName, selectUserEmail, selectUserPhone, selectUserAdditionalInfo } from '@/Storage/Redux/Slices/userProfileSlice';

const UserProfile = () => {
    //const name = useSelector(selectUserName);
    //const email = useSelector(selectUserEmail);
    //const phone = useSelector(selectUserPhone);
    //const additionalInfo = useSelector(selectUserAdditionalInfo);

    const name = 'Artem';
    const email = 'Diominov';
    const phone = '+380663896855';
    const additionalInfo = {
        birthDate: '04.11.2004',
        gender: "male",
        maritalStatus: "not",
        hobbies: "eme game",
        pets: 'cats',
        occupation: 'non',
    }

    return (
        <Grid container direction='row' wrap='nowrap'  sx={ProfileContainer}>
            <Grid item xs={3} sx={Sidebar}>
                <Typography variant="h5"><FormattedMessage id="profile.greeting" values={{name: "Друже"}} /></Typography>
                <Typography variant="h6" sx={{ color: 'orange' }}><FormattedMessage id="profile.friend" /></Typography>
                <Box>
                    <Box sx={SidebarItem}><FormattedMessage id="profile.cart" /></Box>
                    <Box sx={SidebarItem}><FormattedMessage id="profile.ads" /></Box>
                    <Box sx={SidebarItem}><FormattedMessage id="profile.orderHistory" /></Box>
                    <Box sx={SidebarItem}><FormattedMessage id="profile.favorites" /></Box>
                    <Box sx={SidebarItem}><FormattedMessage id="profile.messages" /></Box>
                    <Box sx={SidebarItem}><FormattedMessage id="profile.viewedProducts" /></Box>
                    <Box sx={SidebarItem}><FormattedMessage id="profile.settings" /></Box>
                    <Box sx={SidebarButton}><FormattedMessage id="profile.logout" /></Box>
                </Box>
            </Grid>
            <Grid item xs={9} sx={MainContent}>
                <Box sx={InfoBlock}>
                    <Typography sx={InfoTitle}><FormattedMessage id="profile.contactInfo" /></Typography>
                    <Typography sx={InfoText}><FormattedMessage id="profile.name" />: {name}</Typography>
                    <Typography sx={InfoText}><FormattedMessage id="profile.email" />: {email}</Typography>
                    <Typography sx={InfoText}><FormattedMessage id="profile.phone" />: {phone}</Typography>
                </Box>
                <Box sx={InfoBlock}>
                    <Typography sx={InfoTitle}><FormattedMessage id="profile.additionalInfo" /></Typography>
                    <Typography sx={InfoText}><FormattedMessage id="profile.birthDate" />: {additionalInfo.birthDate}</Typography>
                    <Typography sx={InfoText}><FormattedMessage id="profile.gender" />: {additionalInfo.gender}</Typography>
                    <Typography sx={InfoText}><FormattedMessage id="profile.maritalStatus" />: {additionalInfo.maritalStatus}</Typography>
                    <Typography sx={InfoText}><FormattedMessage id="profile.hobbies" />: {additionalInfo.hobbies}</Typography>
                    <Typography sx={InfoText}><FormattedMessage id="profile.pets" />: {additionalInfo.pets}</Typography>
                    <Typography sx={InfoText}><FormattedMessage id="profile.occupation" />: {additionalInfo.occupation}</Typography>
                </Box>
                <Box sx={ButtonGroup}>
                    <SButton type='whiteOutlined' text={<FormattedMessage id="profile.changePassword" />} />
                    <SButton type='orange' text={<FormattedMessage id="profile.resetPassword" />} />
                </Box>
            </Grid>
        </Grid>
    );
};

export default UserProfile;
