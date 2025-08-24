import { createContext, useContext, useEffect, useState } from 'react';
import useCustomToast from '../hooks/useCustomToast';

const DashboardContext = createContext();

export const DashboardProvider = ({ children }) => {
  const [users, setUsers] = useState([]);
  const [orders, setOrders] = useState([]);

  const [loading, setLoading] = useState({ orders: false, users: false });
  const { showToast } = useCustomToast();

  useEffect(() => {
    fetchResources('http://localhost:3000/api/v1/orders', setOrders, 'orders');
    fetchResources('http://localhost:3000/api/v1/users', setUsers, 'users');
  }, []);

  const fetchResources = async (url, setter, key) => {
    setLoading((prev) => ({ ...prev, [key]: true }));

    try {
      const res = await fetch(url, { credentials: 'include' });

      if (!res.ok) throw new Error(`Error al obtener ${key}`);

      const data = await res.json();
      setter(data);
    } catch (error) {
      showToast({
        title: 'Error',
        description: `No se pudo recuperar los ${key}. Intenta de nuevo.`,
        status: 'error'
      });
    } finally {
      setLoading((prev) => ({ ...prev, [key]: false }));
    }
  };

  return (
    <DashboardContext.Provider value={{ orders, loading, users }}>
      {children}
    </DashboardContext.Provider>
  );
};

export const useDashboard = () => useContext(DashboardContext);
