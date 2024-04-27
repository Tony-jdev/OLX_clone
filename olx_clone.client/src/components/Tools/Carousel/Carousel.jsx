import React from 'react';
import Carousel from 'react-material-ui-carousel';
import { useTheme } from '@mui/material/styles';
import { IconButton} from '@mui/material';
import { NextArrowIcon, PrevArrowIcon} from "@/assets/Icons/Icons.jsx";
import {ButtonStyle} from "@/components/Tools/Carousel/CarouselItem/Styles.js";
import {IndicatorContainerStyle, IndicatorIconButtonStyle, CarouselStyle, activeIndicatorIconButtonStyle} from "@/components/Tools/Carousel/Styles.js";
import CarouselItem from "@/components/Tools/Carousel/CarouselItem/CarouselItem.jsx";
function MyCarousel(props) {
    const theme = useTheme();
    const { body } = theme.palette;
    
    const items = [
        {
            name: "Вдома купа одягу і ти не знаєш куди подіти?",
            description: "Наш eVse - ваш порятунок! Розмістіть оголошення та звільніть простір для чогось нового.",
            btnText: "Додати оголошення",
            textColor: body.mtext.secondary,
            btnColor: body.button.background.primary,
            btnTextColor: body.button.text.primary,
            btnStyle: ButtonStyle,
            imageUrl: "@/../public/Ads/Ads0.png" 
        },
        {
            name: "Пухнастик чекає на тебе!",
            description: "Завітайте на наш сайт оголошень та знайдіть свого майбутнього улюбленця вже сьогодні!",
            btnText: "Переглянути зараз",
            textColor: body.mtext.primary,
            btnColor: body.button.background.darkGradient,
            btnTextColor: body.button.text.secondary,
            btnStyle: ButtonStyle,
            imageUrl: "@/../public/Ads/Ads1.png" 
        },
        {
            name: "Відкрийте для вашої дитини світ захоплень та радості!",
            description: "Перегляньте оголошення на нашому сайті і знайдіть цікаве хоббі для маленьких дослідників.",
            btnText: "Переглянути зараз",
            textColor: body.mtext.primary,
            btnColor: body.button.background.darkGradient,
            btnTextColor: body.button.text.secondary,
            btnStyle: ButtonStyle,
            imageUrl: "@/../public/Ads/Ads2.png" 
        },
    ];

    return (
        <Carousel
            style={{CarouselStyle}}
            NextIcon={<NextArrowIcon />} 
            PrevIcon={<PrevArrowIcon />}
            indicatorContainerProps={{sx:IndicatorContainerStyle}}
            indicatorIconButtonProps={{sx:IndicatorIconButtonStyle}}
            activeIndicatorIconButtonProps={{sx:activeIndicatorIconButtonStyle}}
        >
            {items.map((item, i) => (
                <CarouselItem key={i} item={item} btnSx={item.btnStyle}/>
            ))}
        </Carousel>
    );
}

export default MyCarousel;


