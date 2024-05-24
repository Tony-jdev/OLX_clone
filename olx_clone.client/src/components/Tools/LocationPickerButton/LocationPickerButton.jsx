import React, { useState } from 'react';
import {Box, Modal, Typography} from '@mui/material';
import { FormattedMessage } from 'react-intl';
import SButton from '@/components/Tools/Button/SButton';
import LocationIcon from '@mui/icons-material/LocationOn';
import LocationPickerMap from './Map/LocationPickerMap.jsx';
import {useTheme} from "@mui/material/styles"; // Припустимо, що це ваш компонент для вибору місцезнаходження

const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '80%',
    height: '80%',
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
    borderRadius: 2
};

const LocationPickerButton = () => {
    const theme = useTheme();
    const { colors } = theme.palette;
    const [selectedLocation, setSelectedLocation] = useState(null);
    const [isMapVisible, setIsMapVisible] = useState(false);

    const handleLocationSelection = (location) => {
        setSelectedLocation(location);
        setIsMapVisible(false); // Закрити карту після вибору
    };

    const toggleMapVisibility = () => {
        setIsMapVisible(!isMapVisible);
    };

    return (
        <>
            <SButton type='transparentButton'
                     text={
                         <Typography sx={{ color: colors.text.primary }} >
                             {selectedLocation ? selectedLocation.city+", \n"+selectedLocation.region :
                                 <FormattedMessage id="header.locationLabel"/>}
                         </Typography>
                     }
                     prew={<LocationIcon sx={{ color: colors.background.orange }} />}
                     action={toggleMapVisibility}
            />
            <Modal
                open={isMapVisible}
                onClose={toggleMapVisibility}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description" >
                <Box sx={modalStyle}>
                    <LocationPickerMap onLocationSelect={handleLocationSelection} />
                </Box>
            </Modal>
        </>
    );
};

export default LocationPickerButton;
