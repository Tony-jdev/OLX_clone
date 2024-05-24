import React from 'react';
import {Typography, Grid} from '@mui/material';
import ContainerHeader from "@/components/Tools/ContainerHeader/ContainerHeader.jsx";
import SButton from "@/components/Tools/Button/SButton.jsx";
import {ArrowIcon, DoAddIcon, DoPhotoIcon, RegistrationIcon} from "@/assets/Icons/Icons.jsx";
import {
    BtHTextStyle,
    ButtonContainerStyle,
    ContainerStyle, defTextStyle,
    GridItemStyle, H2TextStyle,
    SectionContainerStyle
} from "@/components/Tools/TutorialPanel/Styles.js";
import {FormattedMessage} from "react-intl";


const TutorialPanel = () => {
    
    return (
        <Grid container style={ContainerStyle}>
            <ContainerHeader text= {
                <><FormattedMessage id="tutorialPanel.howItWorks" /> eVSE.ua</>
            }/>
            <Grid container style={SectionContainerStyle} spacing={3} direction="row" justifyContent="space-between" alignItems="center">
                <Grid style={GridItemStyle}>
                    <RegistrationIcon sx={{ width: '332px', height: '332px' }} />
                    <Typography style={H2TextStyle}><FormattedMessage id="tutorialPanel.register" /></Typography>
                    <Typography style={defTextStyle}><FormattedMessage id="tutorialPanel.createAccount" /></Typography>
                </Grid>
                <ArrowIcon sx={{ width: '43px', height: '75px' }} />
                <Grid style={GridItemStyle}>
                    <DoPhotoIcon sx={{ width: '332px', height: '332px' }} />
                    <Typography style={H2TextStyle}><FormattedMessage id="tutorialPanel.takePhoto" /></Typography>
                    <Typography style={defTextStyle}><FormattedMessage id="tutorialPanel.takePhotoOfWhatYouWantToSell" /></Typography>
                </Grid>
                <ArrowIcon sx={{ width: '43px', height: '75px' }} />
                <Grid style={GridItemStyle}>
                    <DoAddIcon sx={{ width: '332px', height: '332px' }} />
                    <Typography style={H2TextStyle}><FormattedMessage id="tutorialPanel.add" /></Typography>
                    <Typography style={defTextStyle}><FormattedMessage id="tutorialPanel.createAdOnYourPage" /></Typography>
                </Grid>
            </Grid>
            <Grid container direction="row" justifyContent="center" style={ButtonContainerStyle}>
                <SButton text={<FormattedMessage id="tutorialPanel.addAd" />} />
                <Typography style={{...BtHTextStyle, marginLeft: 20 }}><FormattedMessage id="tutorialPanel.addAdNowAndGetWhatYouWant" /></Typography>
            </Grid>
        </Grid>
    );
};

export default TutorialPanel;
