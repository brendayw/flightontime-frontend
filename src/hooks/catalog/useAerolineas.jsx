import { useState, useEffect } from 'react';
import { fetchAerolineas } from '../../api/catalogs.api';

/**
 * Custom hook para obtener la lista de aerolíneas desde la API.
 *
 * @returns {Object} - Retorna un objeto con:
 *   @property {Array} aerolineas - Array de aerolíneas obtenidas de la API.
 *   @property {boolean} loading - Indica si la carga de datos está en progreso.
 *
 * @example
 * const { aerolineas, loading } = useAerolineas();
 * if (loading) return <Spinner />;
 * return (
 *   <ul>
 *     {aerolineas.map(a => <li key={a.id}>{a.nombre}</li>)}
 *   </ul>
 * );
 */
const useAerolineas = () => {
  const [aerolineas, setAerolineas] = useState([]);
  const [loading, setLoading] = useState(true);

  /**
  * Función que obtiene aerolíneas de la API.
  * Maneja errores y asegura que siempre se retorne un array.
  */
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