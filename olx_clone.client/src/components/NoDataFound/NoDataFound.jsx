import React from 'react';
import { Typography, Box } from '@mui/material';
import { FormattedMessage } from 'react-intl';
import {noDataStyle} from "@/components/NoDataFound/Styles.js";
import {useTheme} from "@mui/material/styles";
import {NoDataFoundIcon} from "@/assets/Icons/Icons.jsx";

const NoDataFound = () => {
    const theme = useTheme();
    const { colors } = theme.palette;
    
    return (
        <Box sx={noDataStyle}>
            <NoDataFoundIcon sx={{width: '120px', height: '120px', color: colors.text.secondary}}/>
            <Typography variant="h6" sx={{ color: colors.text.secondary }}>
                <FormattedMessage id="noDataFound" />
            </Typography>
        </Box>
    );
};

export default NoDataFound;
