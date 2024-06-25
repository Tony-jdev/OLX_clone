import React from 'react';
import { useMediaQuery } from '@mui/material';
import {Typography} from "@mui/material";
import {useTheme} from "@mui/material/styles";
import {
    BodyLarge,
    BodyMedium,
    BodySmall, DisplayLarge, DisplayMedium, DisplaySmall, HeadlineLarge,
    HeadlineMedium, HeadlineSmall, LabelLarge,
    LabelMedium,
    LabelSmall, TitleLarge, TitleMedium, TitleSmall
} from "@/components/Tools/TextContainer/Styles.js";

//DisplayLarge
//DisplayMedium
//DisplaySmall

//HeadlineLargeBold
//HeadlineLarge
//HeadlineMedium
//HeadlineSmall

//TitleLarge
//TitleMedium
//TitleSmall

//LabelLarge
//LabelMedium
//LabelSmall

//BodyLarge
//BodyMedium
//BodySmall 

const stylesMap = {
    Display: {
        Desktop: DisplayLarge,
        Tablet: DisplayMedium,
        Mobile: DisplaySmall
    },
    Headline: {
        Desktop: HeadlineLarge,
        Tablet: HeadlineMedium,
        Mobile: HeadlineSmall
    },
    Title: {
        Desktop: TitleLarge,
        Tablet: TitleMedium,
        Mobile: TitleSmall
    },
    Label: {
        Desktop: LabelLarge,
        Tablet: LabelMedium,
        Mobile: LabelSmall
    },
    Body: {
        Desktop: BodyLarge,
        Tablet: BodyMedium,
        Mobile: BodySmall
    }
};


const Text = ({children, text, type, sl, sr, color, hoverColor, prew, next}) => {
    const theme = useTheme();
    const { colors } = theme.palette;

    const isDesktop = useMediaQuery('(min-width: 1025px)');
    const isTablet = useMediaQuery('(min-width: 768px) and (max-width: 1024px)' );
    const isMobile = useMediaQuery('(max-width: 767px)' );

    const getStyle = () => {
        if (!stylesMap[type]) {
            return TitleMedium; 
        }

        if (isDesktop) {
            return stylesMap[type].Desktop;
        } else if (isTablet) {
            return stylesMap[type].Tablet;
        } else if (isMobile) {
            return stylesMap[type].Mobile;
        }
    };
    
    const TextStyle = getStyle();
    
    return(
        <Typography color={color ?? colors.text.revers} style={{...TextStyle, ...sr}} sx={{...sl, "&:hover": {color: hoverColor ?? '',}}}>
            {prew}{children ?? text}{next}
        </Typography>
    );
}

export default Text;