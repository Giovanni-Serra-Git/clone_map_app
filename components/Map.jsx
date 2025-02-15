/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { MapContainer, Marker, Popup, TileLayer, useMap, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import Flag from 'react-world-flags';
import { useNavigate } from 'react-router';
import { useEffect, useState } from 'react';
import useUrlPosition from '../hooks/useUrlPosition';
import { useGeolocation } from '../hooks/useGeoLocation';
import { useDispatch } from 'react-redux';
import useCities from '../features/cities/useCities.js';
import { reset } from '../features/cities/citiesSlice.js';
import { logout } from '../features/login/loginSlice.js';

import L from 'leaflet';

// Imposta le icone personalizzate di Leaflet
const customIcon = new L.Icon({
    iconUrl: '/marker-icon.png',  // Percorso relativo dalla cartella public
    iconSize: [25, 41], // dimensioni dell'icona
    iconAnchor: [12, 41], // punto di ancoraggio dell'icona
    popupAnchor: [1, -34], // punto di ancoraggio del popup
    shadowUrl: '/marker-shadow.png', // percorso della ombra dell'icona
    shadowSize: [41, 41], // dimensioni della ombra
    shadowAnchor: [12, 41], // punto di ancoraggio della ombra
});

function ChangeView({ center }) {
    const map = useMap();
    map.setView(center);
    return null;
}

function LocationMarker() {
    const [position, setPosition] = useState(null);
    const navigate = useNavigate();
    const map = useMapEvents({
        click(e) {
            navigate(`form/?lat=${e.latlng.lat}&lng=${e.latlng.lng}`);
        },
    });

    return position === null ? null : (
        <Marker position={position}>
            <Popup>You are here</Popup>
        </Marker>
    );
}

function Map() {
    const dispatch = useDispatch();
    const { cities } = useCities();
    const [lat, lng] = useUrlPosition();
    const [mapPosition, setMapPosition] = useState([40, 0]);

    const { isLoading: geoLocationIsLoading, position: geoPosition, getPosition } = useGeolocation();
    const navigate = useNavigate();

    function logoutUser() {
        dispatch(reset());
        dispatch(logout());
        navigate('/');
    }

    useEffect(() => {
        if (!isNaN(lat) && !isNaN(lng)) setMapPosition([lat, lng]);
    }, [lat, lng]);

    return (
        <div className="h-[100%] relative flex-1">
            <MapContainer center={mapPosition} zoom={6} scrollWheelZoom={false} style={{ height: '100%' }}>
                <LocationMarker />
                <ChangeView center={mapPosition} />
                <TileLayer
                    attribution="&copy; <a href='https://www.openstreetmap.org/copyright'>OpenStreetMap</a> contributors"
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {cities?.map((city, index) => {
                    return (
                        <Marker position={[city.position.lat, city.position.lng]} key={index} icon={customIcon}>
                            <Popup>
                                <p>{city.cityName}</p>
                                <div>
                                    <Flag code={city.emoji} className="w-[20px]" />
                                </div>
                            </Popup>
                        </Marker>
                    );
                })}
            </MapContainer>
            <button className="position" onClick={getPosition}>
                {geoLocationIsLoading ? 'Loading....' : 'Get position'}
            </button>
        </div>
    );
}

export default Map;
