import React from 'react';
import { Paper, Grid, Container} from '@mui/material';
import { ChildGridStyle, ContainerStyle, GridStyle, PaperStyle,} from "@/components/Tools/Carousel/CarouselItem/Styles.js";
import Text from "@/components/Tools/TextContainer/Text.jsx";

function CarouselItem(props) {
    return (
        <Paper style={PaperStyle} sx={{ backgroundImage: `url(${props.item.imageUrl})`}}>
            <Grid container direction="column" justifyContent="space-around" alignItems="flex-start" style={GridStyle}>
                <Grid container direction="column" justifyContent="space-between" alignItems="flex-start" style={ChildGridStyle}>
                    <Container style={ContainerStyle}>
                        <Text type={'Headline'} color={props.item.textColor} sr={{fontWeight: '700'}}> {props.item.name} </Text>
                        <Text type={'Title'} color={props.item.textColor} sr={{marginTop: '10px'}}> {props.item.description} </Text>
                    </Container>
                    {props.btn}
                </Grid>
            </Grid>
        </Paper>
    );
}

export default CarouselItem;
