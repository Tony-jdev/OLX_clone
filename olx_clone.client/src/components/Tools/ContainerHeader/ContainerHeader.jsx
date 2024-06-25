import React from "react";
import {Grid, Typography} from "@mui/material";
import {GridStyle, TextStyle} from "@/components/Tools/ContainerHeader/Styles.js";
import Text from "@/components/Tools/TextContainer/Text.jsx";

const ContainerHeader = ({text, btn}) => {
    return (
        <Grid style={GridStyle}>
            <Text type={'Headline'} sr={{fontWeight: '700'}}>{text}</Text>
            {btn}
        </Grid>
    );
};

export default ContainerHeader;
