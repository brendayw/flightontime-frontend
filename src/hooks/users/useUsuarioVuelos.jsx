import { useState, useEffect } from "react";
import { getUsuarioVuelos as getUsuarioVuelosAPI } from "../../api/usuarios.api";

const useUsuarioVuelos = () => {
  const [vuelos, setVuelos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchVuelos = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await getUsuarioVuelosAPI();
        console.log("Dato de vuelos: ", data);
        setVuelos(data);
      } catch (err) {
        setError("No se pudieron cargar los vuelos");
      } finally {
        setLoading(false);
      }
    };

    fetchVuelos();
  }, []);

  return { vuelos, loading, error };
};

export default useUsuarioVuelos;