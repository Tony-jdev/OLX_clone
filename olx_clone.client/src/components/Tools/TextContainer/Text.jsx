import React from 'react';
import {Box, Typography} from "@mui/material";
import {useTheme} from "@mui/material/styles";

const Text = ({text}) => {
    const theme = useTheme();
    const { colors } = theme.palette;
    
    return(
        <Typography color={colors.text.revers}>
            {text}
        </Typography>
    );
}

export default Text;