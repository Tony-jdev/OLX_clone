import React from 'react';
import { Button, IconButton } from '@mui/material';
import {
    AppButtonRefStyle, BreadCrampsButtonStyle,
    CarouselButtonStyle,
    DefoultStyle, OrangeRoundButtonStyle,
    OutlinedWhiteButtonBlackBoardStyle,
    OutlinedWhiteButtonStyle, TransparentButtonLeftTextStyle,
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
* */

const SButton = ({type, action, text, prew, next, isIconButton, icon, sl, link}) => {

    const defaultBtn = (
        <Button title={link??""} style={(() => {
            switch (type) {
                case 'whiteOutlined':
                    return OutlinedWhiteButtonStyle;
                case 'whiteOutlinedBB':
                    return OutlinedWhiteButtonBlackBoardStyle;
                case 'transparentButton':
                    return TransparentButtonStyle;
                case 'transparentButtonLT':
                    return TransparentButtonLeftTextStyle;
                case 'transparentButtonSM':
                    return TransparentSmallButtonStyle;
                case 'orangeRoundButton':
                    return OrangeRoundButtonStyle;
                case 'carouselButton':
                    return CarouselButtonStyle;
                case 'appBtnStyle':
                    return AppButtonRefStyle;
                case 'breadCrBtnStyle':
                    return BreadCrampsButtonStyle;
                default:
                    return OutlinedWhiteButtonStyle;
            }})()} onClick={action} sx={{...DefoultStyle, ...sl}}
                >
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
