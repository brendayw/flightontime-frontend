import { useState, useEffect } from 'react';
import { fetchAeropuertos } from '../../api/catalogs.api';

/**
 * Custom hook para obtener la lista de aeropuertos desde la API.
 *
 * @returns {Object} - Retorna un objeto con:
 *   @property {Array} aeropuertos - Array de aeropuertos obtenidos de la API.
 *   @property {boolean} loading - Indica si la carga de datos está en progreso.
 *
 * @example
 * const { aeropuertos, loading } = useAeropuertos();
 * if (loading) return <Spinner />;
 * return (
 *   <ul>
 *     {aeropuertos.map(a => <li key={a.id}>{a.nombre}</li>)}
 *   </ul>
 * );
 */
const useAeropuertos = () => {
  const [aeropuertos, setAeropuertos] = useState([]);
  const [loading, setLoading] = useState(true);

  /**
  * Función que obtiene aeropuertos de la API.
  * Maneja errores y asegura que la carga finalice.
  */
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