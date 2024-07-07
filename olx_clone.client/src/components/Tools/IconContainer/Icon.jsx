import React from 'react';
import { useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';

const Icon = ({ color, icon: IconComponent, step = 1, width = 10, height = 10, hoverColor, sr}) => {
    const theme = useTheme();
    const { colors } = theme.palette;

    const isDesktop = useMediaQuery('(min-width: 1025px)');
    const isTablet = useMediaQuery('(min-width: 768px) and (max-width: 1024px)');
    const isMobile = useMediaQuery('(max-width: 767px)');

    const getSize = () => {
        let iconWidth = width;
        let iconHeight = height;

        if (isTablet) {
            iconWidth -= (width/step);
            iconHeight -= (height/step);
        } else if (isMobile) {
            iconWidth -= (width/step)*2;
            iconHeight -= (height/step)*2;
        }

        return [iconWidth, iconHeight];
    };

    const iconSize = getSize();

    const iconStyle = {
        alignSelf: 'center',
        width: `${iconSize[0]}px`,
        height: `${iconSize[1]}px`,
        color: colors[color] || color,
        '&:hover':{
            color: hoverColor ?? "",
        }
    };

    return <IconComponent sx={iconStyle} style={sr} />;
};

export default Icon;
