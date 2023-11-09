import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import { LatLngBoundsExpression, LatLngExpression } from "leaflet";
import { MapContainer, TileLayer, GeoJSON } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { GeoJsonObject } from "geojson";
import MyLocation from "../MyLocation/MyLocation";
import MapEventsGetCoords from "../MapEventsGetCoords/MapEventsGetCoords";

const Map: React.FC = () => {
  // Default coordinates set to Warsaw central station
  const position: LatLngExpression = [52.24938160480759, 21.013992440543763];
  const initialZoom: number = 13;
  const minZoom: number = 10;

  // maxBounds:
  const southWest: LatLngExpression = [52.020668, 20.380891];
  const northEast: LatLngExpression = [52.429325, 21.759572];
  const customerMaxBounds: LatLngBoundsExpression = [southWest, northEast];

  const [dzielnica, setDzielnica] = useState<GeoJsonObject | null>(null);
  // const [clickedPosition, setClickedPosition] = useState<LatLngExpression>();
  const [myLocationOff, setMyLocationOff] = useState<boolean>(true);

  // const fetchData = async () => {
  //   try {
  //     const response = await axios.get("/api");
  //     setDzielnica(response.data);
  //     console.log("Odpowiedź z serwera:", response.data as GeoJsonObject);
  //     console.log(dzielnica);
  //   } catch (error) {
  //     console.error("Błąd żądania:", error);
  //   }
  // };

  // useEffect(() => {
  //   fetchData();
  // }, []);

  const geoJSONStyle = {
    color: "green", // Kolor linii
    weight: 2, // Grubość linii
    fillOpacity: 0.1, // Przezroczystość wypełnienia
  };

  const switchMyLocation = () => {
    setMyLocationOff((prevState) => !prevState);
  };

  const renderMyLocation = myLocationOff ? null : <MyLocation />;

  return (
    <div>
      <button onClick={switchMyLocation}>{`moja lokalizacja ${
        myLocationOff ? "off" : "on"
      }`}</button>
      <MapContainer
        center={position}
        zoom={initialZoom}
        scrollWheelZoom={true}
        doubleClickZoom={false}
        minZoom={minZoom}
        maxBounds={customerMaxBounds}
      >
        {renderMyLocation}
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {/* <GeoJSON data={Warsaw as GeoJsonObject}/> */}
        {dzielnica && (
          <GeoJSON data={dzielnica as GeoJsonObject} style={geoJSONStyle} />
        )}
        <MapEventsGetCoords />
      </MapContainer>
    </div>
  );
};

export default Map;
