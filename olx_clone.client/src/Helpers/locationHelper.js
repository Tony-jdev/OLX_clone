import {FormattedMessage} from "react-intl";

export const parseLocationString = (locationString) => {
    if(locationString)
    {
        const [city, region, lat, lng] = locationString.split('|');
        return {
            city,
            region,
            lat: parseFloat(lat),
            lng: parseFloat(lng)
        };
    }
    return null;
};
export const parseLocationToString = (location) => {
    if (location) {
        const { city, region, lat, lng } = location;
        return `${city}|${region}|${lat}|${lng}`;
    }
    return "";
};
export const validateLocation = (location) => {
    if (!location || typeof location !== 'object') return false;

    const { city, region, lat, lng } = location;

    if (typeof city !== 'string' || typeof region !== 'string') return false;
    if (typeof lat !== 'number' || typeof lng !== 'number') return false;
    return !(isNaN(lat) || isNaN(lng));
};

export const formatLocationText = (location) => {
    
    console.log(location);
    if (!location || location === 'null' || (!location.region && location?.city !== 'Київ')) {
        return '';
    }

    const cityText = location.city && location.city !== 'empty' ? location.city : '';
    const regionText = location.city === "Київ" ? "Київська область" : (location.region ?? '');

    return `${cityText}${cityText && regionText ? ', ' : ''}${regionText}`;
};
