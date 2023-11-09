import axios from "axios";
import { useState } from "react";
import { useMapEvents } from "react-leaflet";
import { GeoJsonObject } from "geojson";
import GetCoordsForPermissions from "../GetCoordsForPermissions/GetCoordsForPermissions";

const MapEventsGetCoords = () => {
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const [pozwoleniaNaBudowe, setPozwoleniaNaBudowe] =
    useState<GeoJsonObject | null>(null);

  const fetchData = async (x: number, y: number) => {
    try {
      const response = await axios.get(`/api/findData/${y}/${x}`, {
        baseURL: "http://localhost:3001",
      });
      setPozwoleniaNaBudowe(response.data);
      console.log("Odpowiedź z serwera:", response.data as GeoJsonObject);
      // console.log(pozwoleniaNaBudowe, "Odpowiedź z serwera: aktualny useState");
    } catch (error) {
      console.error("Błąd żądania:", error);
    }
  };

  useMapEvents({
    click(event) {
      setCoords({ x: event.latlng.lat, y: event.latlng.lng });
      fetchData(event.latlng.lat, event.latlng.lng);
    },
  });
  return (
    <>
      <GetCoordsForPermissions />
    </>
  );
};

export default MapEventsGetCoords;
