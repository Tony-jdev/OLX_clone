
import React from 'react';
import {Box, Breadcrumbs, Container, Grid} from '@mui/material';
import SButton from "@/components/Tools/Button/SButton.jsx";
import {useNavigate} from "react-router-dom";
import {useTheme} from "@mui/material/styles";

function PagePointer({way}) {
    const theme = useTheme();
    const { colors } = theme.palette;
    
    const navigate = useNavigate();
    const clearWay = way.filter((element) => element !== null);
    const handleNavigation = (parts) => {
        const urlParts = parts.map((part) => encodeURIComponent(part));
        const url = `/${urlParts.join('/')}`;
        navigate(url);
    };
    
    return (
        <Box>
            <Breadcrumbs aria-label="breadcrumb">
                {
                    clearWay.length > 0 && clearWay.map((part, index) => part != null && (
                        <SButton
                            key = {part}
                            textType={'Title'}
                            type='breadCrBtnStyle'
                            text={part}
                            action={()=> {
                                if(part != null) handleNavigation(clearWay.slice(0, index + 1))
                            }}
                            link={'url'}
                            Color={index !== clearWay.length-1 ? colors.text.revers : colors.text.orange}
                        />
                    ))
                }
            </Breadcrumbs>
        </Box>
    );
}

export default PagePointer;
