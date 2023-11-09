import L, { LatLngExpression } from "leaflet";
import { useEffect, useState } from "react";
import { Marker, Popup, useMap } from "react-leaflet";

const pin = 'https://leafletjs.com/examples/custom-icons/leaf-red.png';
const pinShadow = 'https://leafletjs.com/examples/custom-icons/leaf-shadow.png';

const MyLocation: React.FC = () => {
  const [myPosition, setMyPosition] = useState<LatLngExpression>([0, 0]);

  const map = useMap();

  const getMyPosition = () => {
    map.locate().on("locationfound", function (e) {
      setMyPosition(e.latlng);
      map.flyTo(e.latlng, map.getZoom());
    });
    console.log('pozycjonowanie');
  };

  useEffect(() => {
    getMyPosition();
  }, []);

  const pinMB = L.icon({
    iconUrl: pin,
    shadowUrl: pinShadow,
    iconSize:     [38, 95], // size of the icon
    shadowSize:   [50, 64], // size of the shadow
    iconAnchor:   [22, 94], // point of the icon which will correspond to marker's location
    shadowAnchor: [4, 62],  // the same for the shadow
    popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
  });

  return myPosition === null ? null : (
    <Marker position={myPosition} icon={pinMB}>
      <Popup>You are here</Popup>
    </Marker>
  );

  //   const map = useMapEvents({
  //     click() {
  //       map.locate();
  //       console.log(map.locate())
  //     },
  //     locationfound(event) {
  //       setMyPosition(event.latlng);
  //       console.log(event.latlng);
  //       map.flyTo(event.latlng, map.getZoom());
  //     },
  //   });

  //   return(
  //     <>
  //     <button>Position</button>
  //     myPosition === null ? null : (<Marker position={myPosition}><Popup>You are here</Popup></Marker>)
  //   </>)
};

export default MyLocation;
