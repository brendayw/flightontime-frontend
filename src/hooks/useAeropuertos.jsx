import { useState, useEffect } from "react";
import { fetchAeropuertos } from "../services/api/prediction/getLocations";

const useAeropuertos = () => {
  const [aeropuertos, setAeropuertos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadAeropuertos = async () => {
      try {
        const data = await fetchAeropuertos();
        setAeropuertos(data);
      } catch (err) {
        console.error("Error cargando aeropuertos:", err);
      } finally {
        setLoading(false);
      }
    };

    loadAeropuertos();
  }, []);

  return { aeropuertos, loading };
};

export default useAeropuertos;