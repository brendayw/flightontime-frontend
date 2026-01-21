import { useState, useEffect } from "react";
import { getAllUsers } from "../../api/usuarios.api";

/**
 * Hook para obtener todas los usuarios guardados
 * y manejar loading, error y refresh para el ADMIN.
 */
const useUsersAdmin = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const data = await getAllUsers();
      setUsers(data);
      setError(null);
    } catch (err) {
      console.error("Error al obtener los usuarios:", err);
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return { users, loading, error, refresh: fetchUsers };
};

export default useUsersAdmin;