import React, { useEffect, useState } from "react";
import styles from "./map.module.css";
import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMap,
  useMapEvents,
} from "react-leaflet";
import { useCitiesContext } from "../Contexts/CitiesContext";
import { useNavigate } from "react-router-dom";
import { useUrlParams } from "../Hooks/useUrlParams";
export default function Map() {
  const { cities } = useCitiesContext();
  const [position, setPosition] = useState([40, 0]);
  const [lat, lng] = useUrlParams();

  useEffect(() => {
    if (lat && lng) {
      setPosition([lat, lng]);
    }
  }, [lat, lng]);

  return (
    <div className={styles.mapContainer}>
      <MapContainer
        center={position}
        zoom={13}
        scrollWheelZoom={false}
        className={styles.map}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.fr/hot/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {cities?.map((city) => (
          <Marker
            position={[city?.position?.lat, city?.position?.lng]}
            key={city.id}
          >
            <Popup>
              <div>{city?.cityName}</div>
            </Popup>
          </Marker>
        ))}
        <ChangePosition position={position} />
        <DetectClick />
      </MapContainer>
    </div>
  );
}

// eslint-disable-next-line react/prop-types
function ChangePosition({ position }) {
  const map = useMap();
  map.setView(position);
  return null;
}
function DetectClick() {
  const navigate = useNavigate();

  useMapEvents({
    click: (e) => navigate(`form?lat=${e.latlng.lat}&lng=${e.latlng.lng}`),
  });
}
