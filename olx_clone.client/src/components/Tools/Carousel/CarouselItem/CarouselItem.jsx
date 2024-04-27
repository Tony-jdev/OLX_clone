import React from 'react';
import { Paper, Button, Typography, Grid, Container} from '@mui/material';
import { BottomTextStyle, ChildGridStyle, ContainerStyle, GridStyle, PaperStyle, TopTextStyle,} from "@/components/Tools/Carousel/CarouselItem/Styles.js";

function CarouselItem(props) {
    return (
        <Paper style={PaperStyle} sx={{ backgroundImage: `url(${props.item.imageUrl})`}}>
            <Grid container direction="column" justifyContent="space-around" alignItems="flex-start" style={GridStyle}>
                <Grid container direction="column" justifyContent="space-between" alignItems="flex-start" style={ChildGridStyle}>
                    <Container style={ContainerStyle}>
                        <Typography style={TopTextStyle} sx={{color: props.item.textColor}}>{props.item.name}</Typography>
                        <Typography style={BottomTextStyle} sx={{color: props.item.textColor}}>{props.item.description}</Typography>
                    </Container>
                    <Button style={props.btnSx} sx={{color: props.item.btnTextColor, background: props.item.btnColor}}>{props.item.btnText}</Button>
                </Grid>
            </Grid>
        </Paper>
    );
}

export default CarouselItem;
