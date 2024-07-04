import React, { useEffect, useState } from 'react';
import { Box, Modal } from '@mui/material';
import { FormattedMessage } from 'react-intl';
import SButton from '@/components/Tools/Button/SButton';
import LocationIcon from '@mui/icons-material/LocationOn';
import LocationPickerMap from './Map/LocationPickerMap.jsx';
import { useTheme } from "@mui/material/styles";
import { formatLocationText, parseLocationToString } from "@/Helpers/locationHelper.js";

const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '80%',
    height: '80%',
    boxShadow: 24,
    paddingBottom: 7,
    borderRadius: 2
};

const LocationPickerButton = ({ Color, setLocation, location, withoutDefoult }) => {
    const theme = useTheme();
    const { colors } = theme.palette;
    const [selectedLocation, setSelectedLocation] = useState(location ?? null);
    const [locationText, setLocationText] = useState('');
    const [isMapVisible, setIsMapVisible] = useState(false);

    const handleLocationSelection = (location) => {
        setSelectedLocation(location);
        if (setLocation) {
            setLocation(location === null ? null : location);
        }
        setIsMapVisible(false);
    };

    const handleLocationSelectionDef = (location) => {
        setSelectedLocation(location);
        if (setLocation) {
            setLocation(location === null ? null : location);
        }
    };

    const toggleMapVisibility = () => {
        setIsMapVisible(!isMapVisible);
    };

    useEffect(() => {
        setSelectedLocation(location);
        setLocationText(formatLocationText(location));
    }, [location]);

    return (
        <>
            <SButton
                type='transparentButton'
                textType={'Body'}
                Color={Color ?? colors.text.primary}
                text={ locationText || <FormattedMessage id="header.locationLabel" />}
                prew={<LocationIcon />}
                prewColor={colors.background.orange}
                action={toggleMapVisibility}
            />
            <Modal
                open={isMapVisible}
                onClose={toggleMapVisibility}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={{ ...modalStyle, background: colors.background.secondary }}>
                    <LocationPickerMap
                        onLocationSelect={handleLocationSelection}
                        location={selectedLocation}
                        readOnly={false}
                        allowMove={true}
                        isCloseBtn={true}
                        isSetDefBtn={!(withoutDefoult ?? true)}
                        isSetOnlyRegion={true}
                        onClose={toggleMapVisibility}
                        setDef={handleLocationSelectionDef}
                    />
                </Box>
            </Modal>
        </>
    );
};

export default LocationPickerButton;
