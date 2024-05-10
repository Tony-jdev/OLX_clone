import React from "react";
import {Grid, Typography} from "@mui/material";
import {GridStyle, TextStyle} from "@/components/Tools/ContainerHeader/Styles.js";

const ContainerHeader = ({text, btn}) => {
    return (
        <Grid style={GridStyle}>
            <Typography style={TextStyle}>
                {text}
            </Typography>
            {btn}
        </Grid>
    );
};

export default ContainerHeader;
