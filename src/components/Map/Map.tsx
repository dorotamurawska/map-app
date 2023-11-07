import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import { LatLngBoundsExpression, LatLngExpression } from "leaflet";
import { MapContainer, TileLayer, GeoJSON, useMapEvents, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { GeoJsonObject } from "geojson";

function MyLocationMarker() {
  const [clickedPosition, setClickedPosition] = useState<LatLngExpression>([0,0]);
  const map = useMapEvents({
    click() {
      map.locate()
    },
    locationfound(e) {
      setClickedPosition(e.latlng)
      console.log(e.latlng)
      // map.flyTo(e.latlng, map.getZoom())
    },
  })

  return clickedPosition === null ? null : (
    <Marker position={clickedPosition}>
      <Popup>You are here</Popup>
    </Marker>
  )
}


const Map: React.FC = () => {
  // Default coordinates set to Warsow central station
  const position: LatLngExpression = [52.24938160480759, 21.013992440543763];
  const initialZoom: number = 13;
  const minZoom: number = 10;

  // maxBounds:
  const southWest: LatLngExpression = [52.020668, 20.380891];
  const northEast: LatLngExpression = [52.429325, 21.459572];
  const customerMaxBounds: LatLngBoundsExpression = [southWest, northEast];

  const [dzielnica, setDzielnica] = useState<GeoJsonObject | null>(null);
  // const [clickedPosition, setClickedPosition] = useState<LatLngExpression>();


  const fetchData = async () => {
    try {
      const response = await axios.get("/api");
      setDzielnica(response.data);
      console.log("Odpowiedź z serwera:", response.data as GeoJsonObject);
      console.log(dzielnica);
    } catch (error) {
      console.error("Błąd żądania:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const geoJSONStyle = {
    color: "green", // Kolor linii
    weight: 2, // Grubość linii
    fillOpacity: 0.1, // Przezroczystość wypełnienia
  };

  return (
    <div>
      <MapContainer
        center={position}
        zoom={initialZoom}
        scrollWheelZoom={true}
        doubleClickZoom={false}
        minZoom={minZoom}
        maxBounds={customerMaxBounds}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {dzielnica && (
          <GeoJSON data={dzielnica as GeoJsonObject} style={geoJSONStyle} />
        )}
        <MyLocationMarker/>
      </MapContainer>
    </div>
  );
};

export default Map;
