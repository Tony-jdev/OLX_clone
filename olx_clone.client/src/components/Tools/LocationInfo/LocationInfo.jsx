import React, {useState} from 'react';
import {Box, Grid} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import LocationPickerMap from "@/components/Tools/LocationPickerButton/Map/LocationPickerMap.jsx";
import {LocationIcon} from "@/assets/Icons/Icons.jsx";
import FullscreenMapModal from "@/components/Tools/LocationPickerButton/Map/FullscreenMapModal.jsx";
import Text from '@/components/Tools/TextContainer/Text.jsx';
import {parseLocationString} from "@/Helpers/locationHelper.js";
import Icon from "@/components/Tools/IconContainer/Icon.jsx";
const LocationCard = ({ location }) => {
    const theme = useTheme();
    const { colors } = theme.palette;
    const [fullscreenOpen, setFullscreenOpen] = useState(false);

    const parsedLoc = parseLocationString(location);
    
    const handleMapClick = () => {
        console.log('Clicked');
        setFullscreenOpen(true);
    };
    return (
        <Box
            sx={{
                maxWidth: 466,
                maxHeight: 180,
                width: '100%',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                borderRadius: '20px',
                boxShadow: colors.boxShadow,
                background: colors.background.secondary,
                padding: '16px',
            }}
        >
           
                <Box display="flex" alignItems="center">
                    <Box display="flex" flexDirection="column" flexGrow={1}>
                        <Text type={'Headline'} color={colors.text.revers} sl={{marginBottom: '8px'}}>
                            Місцезнаходження
                        </Text>
                        <Box display="flex" alignItems="center" mb={1}>
                            <Icon
                                icon={LocationIcon}
                                width={56}
                                height={80}
                                step={3}
                                color={colors.text.orange}
                                sx={{marginRight: '8px'}}
                            />
                            <Grid>
                                <Text type={'Title'} color={colors.text.revers} >
                                    {(parsedLoc?.city ==='empty' ? "" : parsedLoc?.city) ?? 'null'}
                                </Text>
                                <Text type={'Title'} color={colors.text.revers} >
                                    {parsedLoc?.region ?? 'empty'}
                                </Text>
                            </Grid>
                        </Box>
                </Box>
                <Box
                    sx={{
                        width: 250,
                        height: 150,
                        overflow: 'hidden',
                        borderRadius: '8px',
                        marginLeft: '16px',
                    }}
                >
                    <LocationPickerMap unparseLocation={location} readOnly={true} onClick={handleMapClick}/>
                    <FullscreenMapModal
                        open={fullscreenOpen}
                        onClose={() => setFullscreenOpen(false)}
                        location={location}
                    />
                </Box>
            </Box>
        </Box>
    );
};

export default LocationCard;
