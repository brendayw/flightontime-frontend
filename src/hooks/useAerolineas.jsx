import { useState, useEffect } from "react";
import { fetchAerolineas } from "../services/api/getLocations";

const useAerolineas = () => {
  const [aerolineas, setAerolineas] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadAerolineas = async () => {
      try {
        const data = await fetchAerolineas();
        setAerolineas(data || []); // fallback a array vacío
      } catch (err) {
        setAerolineas([]); // asegurar array
      } finally {
        setLoading(false);
      }
    }

    loadAerolineas();
  }, []);

  return { aerolineas, loading };
};

export default useAerolineas;