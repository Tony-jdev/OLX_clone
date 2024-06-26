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