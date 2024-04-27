import React from 'react';
import {Typography} from '@mui/material';
import {DarkStyle, LightStyle, MainStyle} from "@/components/Tools/IndicatorBox/Styles.js";
const ProductList = ({style, text}) => {
    return (
        <Typography style={{...MainStyle, ...(style === 'd' ? DarkStyle : LightStyle)}}>
            {text}
        </Typography>
    );
};
export default ProductList;
