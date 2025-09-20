import { createContext, useContext, useEffect, useState } from 'react';
import useCustomToast from '../hooks/useCustomToast';

const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const { showToast } = useCustomToast();

  useEffect(() => {
    const initUser = async () => {
      await loginUser();
    };
    initUser();
  }, []);

  const checkUser = async () => {
    setLoading(true);
    try {
      const res = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/auth/me`,
        {
          credentials: 'include'
        }
      );

      if (res.status === 401) {
        setUser(null);
        return;
      }

      const data = await res.json();
      return data.user;
    } catch (error) {
      showToast({
        title: 'Error al obtener usuario',
        description: 'Inténtalo de nuevo más tarde.',
        status: 'error'
      });
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const loginUser = async () => {
    const userData = await checkUser();

    if (userData) {
      setUser(userData);
    } else {
      setUser(null);
    }
  };

  const logoutUser = async () => {
    try {
      await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/v1/auth/logout`, {
        method: 'POST',
        credentials: 'include'
      });

      setUser(null);
    } catch (error) {
      showToast({
        title: 'Error al cerrar sesión',
        description: 'Inténtalo de nuevo más tarde.',
        status: 'error'
      });
      setUser(null);
    }
  };

  return (
    <UserContext.Provider
      value={{ user, setUser, loading, loginUser, logoutUser, checkUser }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
