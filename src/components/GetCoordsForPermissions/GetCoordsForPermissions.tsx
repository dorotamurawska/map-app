import axios from "axios";
import { useEffect, useState, useCallback } from "react";

const GetCoordsForPermissions = () => {
  const [permissionData, setPermissionData] = useState([]);

  const ChangePermissionDataFromFetch = (dataText: any) => {
    // Wyrażenie regularne do dopasowania tylko obiektu 'foiarray'
    const regex = /"foiarray":\[(.*?)\]/;

    // Dopasowanie i uzyskanie tekstu wewnątrz 'foiarray'
    if (dataText !== undefined) {
      const match = dataText.match(regex);
      if (match !== null) {
        return match[1];
      } else {
        return "brak danych";
      }
    } else { return 'brak'}
  };

  const fetchPermissionData = useCallback(async () => {
    try {
      const response = await axios.get(`/wspolrzedne-pozwolenia`, {
        baseURL: "http://localhost:3001",
      });
      const newPermissionDataAfterChange = ChangePermissionDataFromFetch(response.data);
      setPermissionData(newPermissionDataAfterChange);
      console.log(typeof response.data);
      //   const newPermissionDataToChange = ()=> {
      //     // response.data.foiarray.map((item:any) => item.name.match(/Nr Decyzji Pozwolenia na budowę: (\d+)/));
      // };
      //   console.log(match[1]);

      //   setPermissionData(newPermissionDataToChange());

      console.log(permissionData, "opisowe fetch");
      console.log(typeof response.data);
    } catch (error) {
      console.error("Błąd żądania:", error);
    }
  }, []);

  useEffect(() => {
    fetchPermissionData();
    console.log("opisowe pozwolenia useEffect");
  }, [fetchPermissionData]);

  console.log(permissionData, "opisowe console.log");

  return <></>;
};

export default GetCoordsForPermissions;
