import React from 'react';
import { Snackbar, Alert} from '@mui/material';
import { useTheme } from "@mui/material/styles";
import {useNavigate} from "react-router-dom";

const SAlert = ({autoHideTime, openS, setOpenS, message, severity}) => {
    const theme = useTheme();
    const { colors } = theme.palette;
    const navigate = useNavigate();
    
    const handleCloseSnackbar = () => {
        setOpenS(false);
    };

    return (
        <Snackbar open={openS} autoHideDuration={autoHideTime} onClose={handleCloseSnackbar}>
            <Alert onClose={handleCloseSnackbar} severity={severity} sx={{ width: '100%' }}>
                {message}
            </Alert>
        </Snackbar>
    );
};

export default SAlert;
