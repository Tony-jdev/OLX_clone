import React, { useState } from 'react';
import {Modal, Box, IconButton} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import LocationPickerMap from './LocationPickerMap';
import SButton from "@/components/Tools/Button/SButton.jsx";

const FullscreenMapModal = ({ open, onClose, location }) => {
    const isParsed = !(typeof location === 'string');

    return (
        <Modal open={open} onClose={onClose} aria-labelledby="fullscreen-map-modal">
            <Box sx={{ width: '100vw', height: '100vh', position: 'relative' }}>
                <SButton
                    isIconButton={true}
                    icon={ <CloseIcon sx={{color: 'black'}}/>}
                    sl={{position: 'absolute', top: '10px', right: '10px', zIndex: 1000,}}
                    action={onClose}
                />
                <LocationPickerMap
                    location={isParsed ? location : null}
                    unparseLocation={isParsed ? null : location}
                    readOnly={true}
                    allowMove={true}
                />
            </Box>
        </Modal>
    );
};

export default FullscreenMapModal;
