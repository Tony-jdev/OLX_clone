import React, {useState, useEffect, useRef} from 'react';
import {MapContainer, TileLayer, Marker, useMapEvents, GeoJSON, Circle} from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import axios from 'axios';
import ukraineGeoJSON from './custom.geo.json'; 
import FullscreenMapModal from "@/components/Tools/LocationPickerButton/Map/FullscreenMapModal.jsx";
import {Box, Grid} from "@mui/material";
import {parseLocationString} from "@/Helpers/locationHelper.js";

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
    iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const defaultPosition = [48.3794, 31.1656]; 

const reverseGeocode = async (lat, lon) => {
    const response = await axios.get('https://nominatim.openstreetmap.org/reverse', {
        params: {
            lat,
            lon,
            format: 'json',
            addressdetails: 1,
        },
    });
    return response.data;
};

const LocationPickerMap = ({ onLocationSelect, location, unparseLocation, readOnly, allowMove, onClick}) => {
    const parsedLoc = parseLocationString(unparseLocation);
    const initialPosition = parsedLoc ? [parsedLoc.lat, parsedLoc.lng] : defaultPosition;
    const [position, setPosition] = useState(location ?? initialPosition);
    const LocationMarker = () => {
            useMapEvents({
                click: async (e) => {
                    const { lat, lng } = e.latlng;
                    const geoJSONLayers = L.geoJSON(ukraineGeoJSON).getLayers();
                    const layer0 = geoJSONLayers[0];
                    const bounds = layer0.getBounds();
                    const latLng= L.latLng(lat, lng);

                    const elementUnderCursor = e.originalEvent.target;
                    const computedStyle = window.getComputedStyle(elementUnderCursor);
                    const cursorStyle = computedStyle.cursor;
                    const isInsideUkraine = cursorStyle === 'pointer';

                    if (isInsideUkraine) {
                        const newPosition = [lat, lng];
                        setPosition(newPosition);

                        try {
                            const locationData = await reverseGeocode(newPosition[0], newPosition[1]);
                            const selectedLocation = {
                                lat: newPosition[0],
                                lng: newPosition[1],
                                city: locationData.address.city || locationData.address.town || locationData.address.village,
                                region: locationData.address.state,
                            };
                            onLocationSelect(selectedLocation);
                        } catch (error) {
                            console.error('Error fetching location data:', error);
                        }
                    } else {
                        console.warn('Selected location is outside Ukraine.');
                    }
                },
                mousemove: (e) => {
                    const elementUnderCursor = e.originalEvent.target;
                    const computedStyle = window.getComputedStyle(elementUnderCursor);
                    const cursorStyle = computedStyle.cursor;
                },
            });

        return position === null ? null : (
                        <Marker position={position} />
        );
    };

    const LocationCircle = () => {
        useMapEvents({
            click: onClick ? (e) => {
                onClick();
            } : ()=>{},
        });

        return position === null ? null : (
            <Circle
                center={position}
                radius={6000}
                pathOptions={{ color: 'orange', fillColor: 'orange', fillOpacity: 0.5 }}
            />
        );
    };

    

    return (
        <>
            <MapContainer
                center={position ?? defaultPosition}
                zoom={ readOnly ? 10 : 6}
                style={{ height: '100%', width: '100%' }}
                scrollWheelZoom={allowMove}
                dragging={allowMove}
                touchZoom={allowMove}
                doubleClickZoom={allowMove}
                zoomControl={allowMove}
                boxZoom={allowMove}
                keyboard={allowMove}
            >
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />
                <GeoJSON data={ukraineGeoJSON} />
                {readOnly ? <LocationCircle/> : <LocationMarker />}
            </MapContainer>
        </>
    );
};

export default LocationPickerMap;