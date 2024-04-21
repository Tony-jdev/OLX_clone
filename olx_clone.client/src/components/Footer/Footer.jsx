import React from 'react';
import { Link } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import { Container, Typography, Grid, Box, IconButton, Button, Stack } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import {AddButtonStyle, AddIconStyle, ProfileButtonStyle} from "@/components/Header/Styles.js";
import {InstagramIcon, FacebookIcon, TikTokIcon, YoutubeIcon, AddIcon, GooglePlayIcon, AppStoreIcon} from "@/components/Icons/Icons.jsx";
import {AppButtonStyle, HText, LinkText, MainGridStyle, MiddleGridStyle, RefButtonStyle, RowBoxStyle} from "@/components/Footer/Styles.js";

const Footer = () => {
    const theme = useTheme();
    const { footer, header } = theme.palette;
    
    return (
        <Grid container style={MainGridStyle} sx={{backgroundColor: footer.background}}>
            <Grid container style={MiddleGridStyle}>
                <Stack>
                    <Typography style={HText} sx={{color: footer.text.primary}}>
                        eVSE
                    </Typography>
                    <Button href="/home" style={LinkText} sx={{color: footer.text.secondary}}>
                        <FormattedMessage id="footer.vacancies"/>
                    </Button>
                    <Button href="/home" style={LinkText} sx={{color: footer.text.secondary}}>
                        <FormattedMessage id="footer.aboutUs"/>
                    </Button>
                    <Button href="/home" style={LinkText} sx={{color: footer.text.secondary}}>
                        <FormattedMessage id="footer.news"/>
                    </Button>
                    <Button href="/home" style={LinkText} sx={{color: footer.text.secondary}}>
                        <FormattedMessage id="footer.contact"/>
                    </Button>
                </Stack>
                <Stack>
                    <Typography style={HText} sx={{color: footer.text.primary}}>
                        <FormattedMessage id="footer.information"/>
                    </Typography>
                    <Button href="/home" style={LinkText} sx={{color: footer.text.secondary}}>
                        <FormattedMessage id="footer.faqs"/>
                    </Button>
                    <Button href="/home" style={LinkText} sx={{color: footer.text.secondary}}>
                        <FormattedMessage id="footer.blog"/>
                    </Button>
                    <Button href="/home" style={LinkText} sx={{color: footer.text.secondary}}>
                        <FormattedMessage id="footer.terms"/>
                    </Button>
                    <Button href="/home" style={LinkText} sx={{color: footer.text.secondary}}>
                        <FormattedMessage id="footer.advertising"/>
                    </Button>
                </Stack>
                <Grid item >
                    <Typography style={HText}  sx={{color: footer.text.primary}}>
                        <FormattedMessage id="footer.followUs"/>
                    </Typography>
                    <Box style={RowBoxStyle}>
                        <IconButton style={RefButtonStyle} sx={{ color: footer.text.secondary }}>
                            <InstagramIcon />
                        </IconButton>
                        <IconButton style={RefButtonStyle} sx={{ color: footer.text.secondary }}>
                            <FacebookIcon />
                        </IconButton>
                        <IconButton style={RefButtonStyle} sx={{ color: footer.text.secondary }}>
                            <TikTokIcon />
                        </IconButton>
                        <IconButton style={RefButtonStyle} sx={{ color: footer.text.secondary }}>
                            <YoutubeIcon />
                        </IconButton>
                    </Box>
                </Grid>
                <Grid item >
                    <Typography style={HText} sx={{ color: footer.text.primary }}>
                        <FormattedMessage id="footer.freeApp"/>
                    </Typography>
                    <Box style={RowBoxStyle}>
                        <Button style={AppButtonStyle} sx={{ background: footer.button.background, color: footer.text.secondary }}>
                            <GooglePlayIcon style={AddIconStyle} sx={{ color: footer.text.secondary }} />
                            Google Play
                        </Button>
                        <Button style={AppButtonStyle} sx={{ background: footer.button.background, color: footer.text.secondary }}>
                            <AppStoreIcon style={AddIconStyle} sx={{ color: footer.text.secondary }} />
                            App Store
                        </Button>
                    </Box>
                </Grid>
            </Grid>
        </Grid>
    );
};

export default Footer;