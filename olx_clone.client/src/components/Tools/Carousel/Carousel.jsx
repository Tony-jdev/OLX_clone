import React from 'react';
import Carousel from 'react-material-ui-carousel';
import { NextArrowIcon, PrevArrowIcon} from "@/assets/Icons/Icons.jsx";
import {
    IndicatorContainerStyle,
    IndicatorIconButtonStyle,
    CarouselStyle,
    activeIndicatorIconButtonStyle,
    DefoultBtnStyle, PaperWideStyle, PaperNormalStyle
} from "@/components/Tools/Carousel/Styles.js";
import CarouselItem from "@/components/Tools/Carousel/CarouselItem/CarouselItem.jsx";
import {Paper} from "@mui/material";
function MyCarousel({items, isOnlyImg, isWide}) {
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
                <Paper key={i} style={isWide ? PaperWideStyle : PaperNormalStyle} sx={{background: 'inherit', backgroundImage: `url(${item})`}}/>
                    :
                <CarouselItem key={i} item={item} btn={item.btn}/>
            ))}
        </Carousel>
    );
}

export default MyCarousel;


