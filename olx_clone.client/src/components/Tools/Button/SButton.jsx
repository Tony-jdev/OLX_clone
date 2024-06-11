import React from 'react';
import { Button, IconButton } from '@mui/material';
import {
    AppButtonRefStyle, BorderInVisibleStyle, BreadCrampsButtonStyle,
    CarouselButtonStyle,
    DefoultStyle, OrangeRoundButtonStyle,
    OutlinedWhiteButtonBlackBoardStyle,
    OutlinedWhiteButtonStyle, SideBarButtonStyle, TransparentButtonLeftTextStyle,
    TransparentButtonStyle, TransparentSmallButtonStyle
} from "@/components/Tools/Button/Styles.js";

/*
* Buttons(style types):
* 1 - whiteOutlined
* 2 - whiteOutlinedBB
* 3 - transparentButton
* 4 - transparentButtonLT
* 5 - transparentButtonSM
* 6 - orangeRoundButton
* 7 - carouselButton
* 8 - appBtnStyle
* 9 - breadCrBtnStyle
* 10 - sideBarBtnStyle 
* */




const SButton = ({type, action, text, prew, next, isIconButton, icon, sl, link, borderInVisible}) => {

    const getButtonStyle = () => {
        let baseStyle;

        switch (type) {
            case 'whiteOutlined':
                baseStyle = OutlinedWhiteButtonStyle;
                break;
            case 'whiteOutlinedBB':
                baseStyle = OutlinedWhiteButtonBlackBoardStyle;
                break;
            case 'transparentButton':
                baseStyle = TransparentButtonStyle;
                break;
            case 'transparentButtonLT':
                baseStyle = TransparentButtonLeftTextStyle;
                break;
            case 'transparentButtonSM':
                baseStyle = TransparentSmallButtonStyle;
                break;
            case 'orangeRoundButton':
                baseStyle = OrangeRoundButtonStyle;
                break;
            case 'carouselButton':
                baseStyle = CarouselButtonStyle;
                break;
            case 'appBtnStyle':
                baseStyle = AppButtonRefStyle;
                break;
            case 'breadCrBtnStyle':
                baseStyle = BreadCrampsButtonStyle;
                break;
            case 'sideBarBtnStyle':
                baseStyle = SideBarButtonStyle;
                break;
            default:
                baseStyle = OutlinedWhiteButtonStyle;
        }

        return borderInVisible ? {...baseStyle, ...BorderInVisibleStyle} : baseStyle;
    };


    const buttonStyle = getButtonStyle();


    const defaultBtn = (
        <Button title={link??""} onClick={action} style={buttonStyle} sx={{...DefoultStyle, ...sl}}>
            {prew}{text}{next}
        </Button>
    );
    
    const iconBtn = (
        <IconButton onClick={action} style={sl} sx={DefoultStyle}>
            {icon}
        </IconButton>
    );
    
    return isIconButton === true ? iconBtn : defaultBtn;
};

export default SButton;
