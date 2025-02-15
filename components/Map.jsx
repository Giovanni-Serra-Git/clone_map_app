/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { MapContainer, Marker, Popup, TileLayer, useMap, useMapEvents} from 'react-leaflet'
import 'leaflet/dist/leaflet.css';
import Flag from 'react-world-flags';
import { useNavigate, useSearchParams } from 'react-router';
import { useEffect, useState } from 'react';
import useUrlPosition from '../hooks/useUrlPosition';
import { useGeolocation } from '../hooks/useGeoLocation';
import { useLoginUser } from '../context/LoginContextProvider';
import useCities from "../features/cities/useCities.js"
import { useDispatch } from 'react-redux';
import useLogin from '../features/login/useLogin';
import { reset } from '../features/cities/citiesSlice.js';
import { logout } from '../features/login/loginSlice.js';

function ChangeView({ center }) {
    const map = useMap();
    map.setView(center);
    return null;
}



function LocationMarker() {

    const [position, setPosition] = useState(null)
    const navigate = useNavigate()
    const map = useMapEvents({
      click(e) {
        navigate(`form/?lat=${e.latlng.lat}&lng=${e.latlng.lng}`)
      },
      // locationfound(e) {
      //   setPosition(e.latlng)
      //   map.flyTo(e.latlng, map.getZoom())
      // },
    })
  
    return position === null ? null : (
      <Marker position={position}>
        <Popup>You are here</Popup>
      </Marker>
    )
}  

function Map() {

    const dispatch = useDispatch()

    const {cities} = useCities()

    const [lat,lng] = useUrlPosition()

    const [mapPosition, setMapPosition] = useState([40, 0])

    const {isLoading: geoLocationIsLoading, position: geoPosition, error: geoError, getPosition } = useGeolocation()

    const {user} = useLogin()

    const navigate = useNavigate()

    function logoutUser() {
        dispatch(reset())
        dispatch(logout())
        navigate("/")
    }




    useEffect(() => {
        if (!isNaN(lat) && !isNaN(lng) ) setMapPosition([lat, lng])
    }, [lat,lng])
    
    return (
        <div className='h-[100%] relative flex-1'>
        {user.name && user.password ? <div className='login flex justify-around w-[200px] md:w-[300px]'>
            <div className='flex gap-4'>
             <p>{user.name}</p>
             <div className="flex -space-x-1 overflow-hidden flex items-center">
                <img className="inline-block size-6 ring-2 ring-white" src="https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="" />
            </div>
            </div>
            <button onClick={logoutUser} className='active-btn' style={{color: "#d9d9d9"}}>Logout</button>
        </div> : ""}
        <MapContainer 
            center={mapPosition}
            zoom={6}
            scrollWheelZoom={false}
            style={{height: "100%"}}
        >
            <LocationMarker />
        <ChangeView center={mapPosition} />
        <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {cities?.map((city, index) => {
            return (
                <Marker position={[city.position.lat, city.position.lng]} key={index}>
                <Popup>
                     <p>{city.cityName}</p>
                     <div>{<Flag code={city.emoji} className="w-[20px]" />}</div>
                </Popup>
            </Marker>
            )
        })}
        </MapContainer>
        <button className='position' onClick={getPosition}>{geoLocationIsLoading ? "Loading...." : "Get position"}</button>
        </div>
    )
}

export default Map
