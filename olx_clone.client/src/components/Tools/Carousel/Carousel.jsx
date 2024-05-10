import React from 'react';
import Carousel from 'react-material-ui-carousel';
import { NextArrowIcon, PrevArrowIcon} from "@/assets/Icons/Icons.jsx";
import {
    IndicatorContainerStyle,
    IndicatorIconButtonStyle,
    CarouselStyle,
    activeIndicatorIconButtonStyle,
    DefoultBtnStyle, PaperWideStyle
} from "@/components/Tools/Carousel/Styles.js";
import CarouselItem from "@/components/Tools/Carousel/CarouselItem/CarouselItem.jsx";
import {Paper} from "@mui/material";
function MyCarousel({items, isOnlyImg}) {
    return (
        <Carousel
            style={{CarouselStyle}}
            NextIcon={<NextArrowIcon />} 
            PrevIcon={<PrevArrowIcon />}
            indicatorContainerProps={{sx:IndicatorContainerStyle}}
            indicatorIconButtonProps={{sx:{...IndicatorIconButtonStyle,...DefoultBtnStyle}}}
            activeIndicatorIconButtonProps={{sx:{...activeIndicatorIconButtonStyle,...DefoultBtnStyle}}}
        >
            {items.map((item, i) => (
                isOnlyImg ? 
                <Paper key={i} style={PaperWideStyle} sx={{background: 'red', backgroundImage: `url(${item})`}}/>
                    :
                <CarouselItem key={i} item={item} btn={item.btn}/>
            ))}
        </Carousel>
    );
}

export default MyCarousel;


