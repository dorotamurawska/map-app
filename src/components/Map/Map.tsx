import React from 'react';
import { LatLngBoundsExpression, LatLngExpression } from "leaflet";
import { MapContainer, TileLayer, Marker, Popup, GeoJSON } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import data from '../../geoData/geoJson.json';
import {GeoJsonObject} from 'geojson';

const Map: React.FC= () => {
  // Default coordinates set to Warsow central station
  const position: LatLngExpression = [52.24938160480759, 21.013992440543763];
  const initialZoom: number = 13;
  const minZoom: number = 10;

  // maxBounds:
  const southWest: LatLngExpression = [52.020668, 20.380891];
  const northEast: LatLngExpression = [52.429325, 21.459572];
  const customerMaxBounds: LatLngBoundsExpression = [southWest, northEast];


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
        <Marker position={position}>
          <Popup>
            A pretty CSS3 popup.
          </Popup>
        </Marker>
        <GeoJSON data={data as GeoJsonObject} />
      </MapContainer>
    </div>
  );
};

export default Map;
