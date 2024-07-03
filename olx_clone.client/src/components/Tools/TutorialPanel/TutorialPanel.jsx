import React from 'react';
import {Typography, Grid, Box} from '@mui/material';
import ContainerHeader from "@/components/Tools/ContainerHeader/ContainerHeader.jsx";
import SButton from "@/components/Tools/Button/SButton.jsx";
import {AddOutlinedIcon, ArrowIcon, DoAddIcon, DoPhotoIcon, RegistrationIcon} from "@/assets/Icons/Icons.jsx";
import {
    BtHTextStyle,
    ButtonContainerStyle,
    ContainerStyle, defTextStyle,
    GridItemStyle, H2TextStyle,
    SectionContainerStyle
} from "@/components/Tools/TutorialPanel/Styles.js";
import {FormattedMessage} from "react-intl";
import {useTheme} from "@mui/material/styles";
import Text from "@/components/Tools/TextContainer/Text.jsx";
import {useAuth} from "@/providers/AuthProvider.jsx";
import {useAddPost} from "@/providers/AddPostModalProvider.jsx";
import {useNavigate} from "react-router-dom";



const TutorialPanel = () => {
    const theme = useTheme();
    const { colors } = theme.palette;
    
    const navigate = useNavigate();

    const { showAddPostModal } = useAddPost();
    
    return (
        <Grid container style={ContainerStyle}>
            <ContainerHeader text= {
                <><FormattedMessage id="tutorialPanel.howItWorks" /> e<span style={{color: colors.text.orange}}>V</span>SE.ua</>
            }/>
            <Grid container style={SectionContainerStyle} spacing={3} direction="row" justifyContent="space-between" alignItems="center">
                <Grid style={GridItemStyle}>
                    <RegistrationIcon sx={{ width: '332px', height: '332px' }} />
                    <Text type={'Title'} color={colors.text.orange}><FormattedMessage id="tutorialPanel.register" /></Text>
                    <Text type={'Body'}><FormattedMessage id="tutorialPanel.createAccount" /></Text>
                </Grid>
                <ArrowIcon sx={{ width: '43px', height: '75px' }} />
                <Grid style={GridItemStyle}>
                    <DoPhotoIcon sx={{ width: '332px', height: '332px' }} />
                    <Text type={'Title'} color={colors.text.orange}><FormattedMessage id="tutorialPanel.takePhoto" /></Text>
                    <Text type={'Body'}><FormattedMessage id="tutorialPanel.takePhotoOfWhatYouWantToSell" /></Text>
                </Grid>
                <ArrowIcon sx={{ width: '43px', height: '75px' }} />
                <Grid style={GridItemStyle}>
                    <DoAddIcon sx={{ width: '332px', height: '332px' }} />
                    <Text type={'Title'} color={colors.text.orange}><FormattedMessage id="tutorialPanel.add" /></Text>
                    <Text type={'Body'}><FormattedMessage id="tutorialPanel.createAdOnYourPage" /></Text>
                </Grid>
            </Grid>
            <Grid container direction="row" justifyContent="center" style={ButtonContainerStyle}>
                <SButton text={<FormattedMessage id="tutorialPanel.addAd" />} 
                         textType={'Title'}
                         prew={<AddOutlinedIcon sx={{width: '18px', height: '18px', marginRight: '5px', color: colors.text.primary}}/>} 
                         Color={colors.text.primary}
                         sl={{background: colors.background.darkGradient}}
                         sr={{padding: '15px', borderRadius: '30px 2px 30px 2px'}}
                         borderInVisible={true} 
                         action={()=>navigate('/create')}
                />
                <Text type={'Title'} sr={{marginLeft: 20}}><FormattedMessage id="tutorialPanel.addAdNowAndGetWhatYouWant" /></Text>
            </Grid>
        </Grid>
    );
};

export default TutorialPanel;
