import React, { useState } from 'react';
import Carousel from 'react-material-ui-carousel';
import { NextArrowIcon, PrevArrowIcon} from "@/assets/Icons/Icons.jsx";
import {
    IndicatorContainerStyle,
    IndicatorIconButtonStyle,
    CarouselStyle,
    activeIndicatorIconButtonStyle,
    DefoultBtnStyle, PaperWideStyle, PaperNormalStyle, modalStyle
} from "@/components/Tools/Carousel/Styles.js";
import CarouselItem from "@/components/Tools/Carousel/CarouselItem/CarouselItem.jsx";
import { Paper, Modal, Box } from "@mui/material";
import {useTheme} from "@mui/material/styles";

function MyCarousel({items, isOnlyImg, isWide, sr, width, height, withoutBtns, withoutNBtns, stopAutoplay}) {
    const theme = useTheme();
    const { colors } = theme.palette;
    
    const [open, setOpen] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);

    const handleOpen = (image) => {
        setSelectedImage(image);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setSelectedImage(null);
    };

    return (
        <>
            <Carousel
                style={{ ...CarouselStyle }}
                sx={{ width: width, height: height }}
                NextIcon={<NextArrowIcon />}
                PrevIcon={<PrevArrowIcon />}
                indicatorContainerProps={{sx:IndicatorContainerStyle}}
                indicatorIconButtonProps={{sx:{...IndicatorIconButtonStyle,...DefoultBtnStyle}}}
                activeIndicatorIconButtonProps={{sx:{...activeIndicatorIconButtonStyle,...DefoultBtnStyle}}}
                navButtonsAlwaysInvisible={withoutBtns}
                indicators={!withoutNBtns}
                autoPlay={!stopAutoplay}
            >
                {items.map((item, i) => (
                    isOnlyImg ?
                        <Paper
                            key={i}
                            style={{...(isWide ? PaperWideStyle : PaperNormalStyle), ...sr}}
                            sx={{background: 'inherit', backgroundImage: `url(${item})`}}
                            onClick={() => handleOpen(item)}
                        />
                        :
                        <CarouselItem key={i} item={item} btn={item.btn}/>
                ))}
            </Carousel>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-title"
                aria-describedby="modal-description"
            >
                <div>
                    {selectedImage && <img src={selectedImage} alt="Selected" style={{ ...modalStyle, maxWidth: '90vw', maxHeight: '90vh' }} />}

                </div>
            </Modal>
        </>
    );
}

export default MyCarousel;
