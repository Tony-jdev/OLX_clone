import React from 'react';
import { Button, IconButton } from '@mui/material';
import {OutlinedWhiteButtonStyle} from "@/components/Tools/Button/Styles.js";

/*
* Buttons(style types):
* 1 - whiteOutlined
* */

const SButton = ({type, action, text, prew, next, isIconButton, icon}) => {

    const defaultBtn = (
        <Button style={(() => {
            switch (type) {
                case 'whiteOutlined':
                    return OutlinedWhiteButtonStyle;
                default:
                    return OutlinedWhiteButtonStyle;
            }})()} onClick={action}>
            {prew}{text}{next}
        </Button>
    );
    
    const iconBtn = (
        <IconButton onClick={action}>
            {icon}
        </IconButton>
    );
    
    return isIconButton === true ? IconButton : defaultBtn;
};

export default SButton;
