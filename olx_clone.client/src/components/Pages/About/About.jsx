import React from 'react';
import { Container, Typography, Grid } from '@mui/material';
import { FormattedMessage } from 'react-intl';
import SButton from '@/components/Tools/Button/SButton.jsx';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';
import {AboutContainerStyle, ImageStyle, TypographyStyle} from './Styles.js';

const About = () => {
    const theme = useTheme();
    const { colors } = theme.palette;
    const navigate = useNavigate();

    const images = [
        '@/../public/olxPaper.jpg',
        '@/../public/olxPaper.jpg',
        '@/../public/olxPaper.jpg',
    ]
    
    return (
        <Container style={AboutContainerStyle}>
            <Typography variant="h2" gutterBottom style={TypographyStyle}>
                <FormattedMessage id="about.title" />
            </Typography>
            <Typography paragraph style={TypographyStyle}>
                <FormattedMessage id="about.description" />
            </Typography>
            <Grid container spacing={3}>
                <Grid item xs={12} sm={4}>
                    <img src={images[0]} alt="Image 1" style={ImageStyle} />
                </Grid>
                <Grid item xs={12} sm={4}>
                    <img src={images[1]} alt="Image 2" style={ImageStyle} />
                </Grid>
                <Grid item xs={12} sm={4}>
                    <img src={images[2]} alt="Image 3" style={ImageStyle} />
                </Grid>
            </Grid>
            <SButton
                type="whiteOutlined"
                text={<FormattedMessage id="about.button" />}
                action={()=>{ navigate(-1) }}
            />
        </Container>
    );
};

export default About;
