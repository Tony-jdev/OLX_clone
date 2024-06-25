import React from 'react';
import { FormattedMessage } from 'react-intl';
import { Typography, Grid, Box, Stack } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { InstagramIcon, FacebookIcon, TikTokIcon, YoutubeIcon, GooglePlayIcon, AppStoreIcon} from "@/assets/Icons/Icons.jsx";
import { AppIconStyle, HText, MainGridStyle, MiddleGridStyle, RefButtonStyle, RowBoxStyle} from "@/components/Footer/Styles.js";
import SButton from "@/components/Tools/Button/SButton.jsx";
import { useNavigate } from 'react-router-dom';
import Text from "@/components/Tools/TextContainer/Text.jsx";

const Footer = () => {
    const theme = useTheme();
    const { colors } = theme.palette;
    const navigate = useNavigate();
    
    return (
        <Grid container style={MainGridStyle} sx={{backgroundColor: colors.background.primary}}>
            <Grid container style={MiddleGridStyle}>
                <Stack>
                    <Text type={'Title'} sl={{marginBottom: '12px'}} color={colors.text.orange}>eVSE</Text>
                    <SButton
                        type='transparentButtonLT'
                        textType={'Body'}
                        Color={colors.text.primary}
                        text={<FormattedMessage id="footer.vacancies"/>}
                        action={()=>{ navigate('/about') }}
                        sl={{color: colors.text.primary}}
                    />
                    <SButton
                        type='transparentButtonLT'
                        textType={'Body'}
                        Color={colors.text.primary}
                        text={<FormattedMessage id="footer.aboutUs"/>}
                        action={()=>{ navigate('/about') }}
                        sl={{color: colors.text.primary}}
                    />
                    <SButton
                        type='transparentButtonLT'
                        textType={'Body'}
                        Color={colors.text.primary}
                        text={<FormattedMessage id="footer.news"/>}
                        action={()=>{ navigate('/about') }}
                        sl={{color: colors.text.primary}}
                    />
                    <SButton
                        type='transparentButtonLT'
                        textType={'Body'}
                        Color={colors.text.primary}
                        text={<FormattedMessage id="footer.contact"/>}
                        action={()=>{ navigate('/about') }}
                        sl={{color: colors.text.primary}}
                    />
                </Stack>
                <Stack>
                    <Text type={'Title'} color={colors.text.orange} sl={{marginBottom: '12px'}}><FormattedMessage id="footer.information"/></Text>
                    <SButton
                        type='transparentButtonLT'
                        textType={'Body'}
                        Color={colors.text.primary}
                        text={ <FormattedMessage id="footer.faqs"/>}
                        action={()=>{ navigate('/about') }}
                        sl={{color: colors.text.primary}}
                    />
                    <SButton
                        type='transparentButtonLT'
                        textType={'Body'}
                        Color={colors.text.primary}
                        text={<FormattedMessage id="footer.blog"/>}
                        action={()=>{ navigate('/about') }}
                        sl={{color: colors.text.primary}}
                    />
                    <SButton
                        type='transparentButtonLT'
                        textType={'Body'}
                        Color={colors.text.primary}
                        text={<FormattedMessage id="footer.terms"/>}
                        action={()=>{ navigate('/about') }}
                        sl={{color: colors.text.primary}}
                    />
                    <SButton
                        type='transparentButtonLT'
                        textType={'Body'}
                        Color={colors.text.primary}
                        text={<FormattedMessage id="footer.advertising"/>}
                        action={()=>{ navigate('/about') }}
                        sl={{color: colors.text.primary}}
                    />
                </Stack>
                <Grid item >
                    <Text type={'Title'} color={colors.text.orange} sl={{marginBottom: '12px'}}><FormattedMessage id="footer.followUs"/></Text>
                    <Box style={RowBoxStyle}>
                        <SButton isIconButton={true}
                                 icon={<InstagramIcon />}
                                 sl={{...RefButtonStyle, color: colors.text.primary}}
                                 action={()=>{ navigate('/about') }}
                        />
                        <SButton isIconButton={true}
                                 icon={<FacebookIcon />}
                                 sl={{...RefButtonStyle, color: colors.text.primary}}
                                 action={()=>{ navigate('/about') }}
                        />
                        <SButton isIconButton={true}
                                 icon={ <TikTokIcon />}
                                 sl={{...RefButtonStyle, color: colors.text.primary}}
                                 action={()=>{ navigate('/about') }}
                        />
                        <SButton isIconButton={true}
                                 icon={<YoutubeIcon />}
                                 sl={{...RefButtonStyle, color: colors.text.primary}}
                                 action={()=>{ navigate('/about') }}
                        />
                    </Box>
                </Grid>
                <Grid item >
                    <Text type={'Title'} color={colors.text.orange} sl={{marginBottom: '12px'}}><FormattedMessage id="footer.freeApp"/></Text>
                    <Box style={RowBoxStyle}>
                        <SButton
                            type='appBtnStyle'
                            textType={'Body'}
                            Color={colors.text.primary}
                            text='Google Play'
                            prew={<GooglePlayIcon style={AppIconStyle} sx={{ color: colors.text.primary }} />}
                            sl={{background: colors.background.lightGradient, color: colors.text.primary}}
                            action={()=>{ navigate('/about') }}
                        />
                        <SButton
                            type='appBtnStyle'
                            textType={'Body'}
                            Color={colors.text.primary}
                            text='App Store'
                            prew={<AppStoreIcon style={AppIconStyle} sx={{ color: colors.text.primary }} />}
                            sl={{background: colors.background.lightGradient, color: colors.text.primary}}
                            action={()=>{ navigate('/about') }}
                        />
                    </Box>
                </Grid>
            </Grid>
        </Grid>
    );
};

export default Footer;