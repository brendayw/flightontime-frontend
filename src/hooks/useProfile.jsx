import { useEffect, useState } from 'react';
import { getProfileRequest } from '../services/authService';

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