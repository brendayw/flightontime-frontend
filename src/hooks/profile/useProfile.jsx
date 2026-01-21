import { useEffect, useState } from 'react';
import { getProfileRequest } from '../../services/authService';

/**
 * Custom hook para obtener el perfil del usuario desde la API.
 *
 * Maneja estados de carga, error y almacenamiento del perfil.
 *
 * @returns {Object} - Retorna un objeto con:
 *   @property {Object|null} profile - Datos del perfil del usuario.
 *   @property {boolean} loading - Indica si la solicitud está en progreso.
 *   @property {string|null} error - Mensaje de error si la carga falla.
 *
 * @example
 * const { profile, loading, error } = useProfile();
 * if (loading) return <Spinner />;
 * if (error) return <p>{error}</p>;
 * return (
 *   <div>
 *     <h2>{profile.name}</h2>
 *     <p>Email: {profile.email}</p>
 *   </div>
 * );
 */
const useProfile = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getProfileRequest()
      .then(setProfile)
      .catch(() => setError("Error al cargar perfil"))
      .finally(() => setLoading(false));
  }, []);

  return { profile, loading, error };
};

export default useProfile;