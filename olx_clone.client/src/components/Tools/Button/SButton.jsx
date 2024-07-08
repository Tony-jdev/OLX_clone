import React, {useState} from 'react';
import { Button, IconButton } from '@mui/material';
import {
    AppButtonRefStyle, BorderInVisibleStyle, BreadCrampsButtonStyle,
    CarouselButtonStyle,
    DefoultStyle, OrangeRoundButtonStyle,
    OutlinedWhiteButtonBlackBoardStyle,
    OutlinedWhiteButtonStyle, SideBarButtonStyle, TransparentButtonLeftTextStyle,
    TransparentButtonStyle, TransparentSmallButtonStyle
} from "@/components/Tools/Button/Styles.js";
import Text from "@/components/Tools/TextContainer/Text.jsx";

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



const ColorWrapper = ({ children, color }) => {
    return React.cloneElement(children, { style: { ...children.props.style, color } });
};
const SButton = ({type, action, text, prew, next, isIconButton, icon, sl, sr, link, textSL, textSR, Color, prewColor, nextColor, borderInVisible, hoverShadow, hoverColor, hoverBack, textType, textSt, disabled}) => {
    const [isHovered, setIsHovered] = useState(false);

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

    const handleMouseEnter = () => setIsHovered(true);
    const handleMouseLeave = () => setIsHovered(false);

    const defaultBtn = (
        <Button
            title={link??""}
            onClick={action}
            style={{...buttonStyle, ...sr}}
            sx={{...DefoultStyle,
                ...sl, 
                "&:hover": 
                    {
                        boxShadow: hoverShadow ?? '', 
                        color: hoverColor ?? '', 
                        background: hoverBack ?? ''
                    } }}
            disabled={disabled}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            {prew && <ColorWrapper color={prewColor ?? (isHovered ? hoverColor ?? Color : Color)}>{prew}</ColorWrapper>}
            <Text sl={textSL??''} sr={textSR??''} type={textType} textSt={textSt} color={isHovered ? hoverColor ?? Color : Color}>{text}</Text>
            {next && <ColorWrapper color={nextColor ?? (isHovered ? hoverColor ?? Color : Color)}>{next}</ColorWrapper>}
        </Button>
    );

    const iconBtn = (
        <IconButton
            onClick={action}
            style={sl}
            sx={DefoultStyle}
            disabled={disabled}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            {icon}
        </IconButton>
    );

    return isIconButton === true ? iconBtn : defaultBtn;
};

export default SButton;
