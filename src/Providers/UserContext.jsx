import { createContext, useContext, useEffect, useState } from 'react';

const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:3000/api/v1/auth/me', {
      credentials: 'include'
    })
      .then((res) => {
        if (res.status === 401) {
          setUser(null);
          return null;
        }
        return res.json();
      })
      .then((data) => {
        if (!data) {
          setUser(null);
          return;
        }
        setUser(data.user);
      })
      .catch((error) => {
        showToast({
          title: 'Error al obtener usuario',
          description: 'Inténtalo de nuevo más tarde.',
          status: 'error'
        });
        setUser(null);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const loginUser = (userData) => {
    setUser(userData);
  };

  const logoutUser = async () => {
    try {
      await fetch('http://localhost:3000/api/v1/auth/logout', {
        method: 'POST',
        credentials: 'include'
      });

      const res = await fetch('http://localhost:3000/api/v1/auth/me', {
        credentials: 'include'
      });

      if (res.status === 401) {
        setUser(null);
      } else {
        const data = await res.json();
        setUser(data.user);
      }
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
      value={{ user, setUser, loading, loginUser, logoutUser }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
