import React from 'react';
import { Container, Typography, Grid } from '@mui/material';
import { FormattedMessage } from 'react-intl';
import SButton from '@/components/Tools/Button/SButton.jsx';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';
import {AboutContainerStyle, ImageStyle, TypographyStyle} from './Styles.js';
import Text from "@/components/Tools/TextContainer/Text.jsx";

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
            <Text><FormattedMessage id="about.title" /></Text>
            <Text type={'Body'}><FormattedMessage id="about.description" /></Text>
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
                sr={{padding: '5px'}}
                text={<FormattedMessage id="about.button" />}
                action={()=>{ navigate(-1) }}
            />
        </Container>
    );
};

export default About;
