import { createContext, useContext, useEffect, useState } from 'react';
import useCustomToast from '../hooks/useCustomToast';

const DashboardContext = createContext();

export const DashboardProvider = ({ children }) => {
  const [users, setUsers] = useState([]);
  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState([]);

  const [loading, setLoading] = useState({ orders: false, users: false });
  const { showToast } = useCustomToast();

  useEffect(() => {
    fetchResources('http://localhost:3000/api/v1/orders', setOrders, 'orders');
    fetchResources('http://localhost:3000/api/v1/users', setUsers, 'users');
    fetchResources(
      'http://localhost:3000/api/v1/products',
      setProducts,
      'products'
    );
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

  const deleteResources = async (resource, id, setter) => {
    setLoading((prev) => ({ ...prev, [resource]: true }));
    let route = '';
    if (resource === 'users') {
      route = 'deleteUser';
    }

    try {
      const res = await fetch(
        `http://localhost:3000/api/v1/${resource}/${route}`,
        {
          method: 'DELETE',
          headers: { 'Content-Type': 'application/json' },

          credentials: 'include',
          body: JSON.stringify({ id })
        }
      );

      if (!res.ok) throw new Error(`No se pudo eliminar el ${resource}`);

      setter((prev) => ({
        ...prev,
        users: prev.users.map((item) =>
          item._id === id ? { ...item, isDeleted: true } : item
        )
      }));

      showToast({ description: 'Se eliminó correctamente', status: 'success' });
    } catch (error) {
      showToast({
        title: 'Error',
        description: `Error al eliminar el ${resource}. Intenta de nuevo.`,
        status: 'error'
      });
    } finally {
      setLoading((prev) => ({ ...prev, [resource]: false }));
    }
  };

  return (
    <DashboardContext.Provider
      value={{
        orders,
        loading,
        users,
        setUsers,
        fetchResources,
        deleteResources,
        products
      }}
    >
      {children}
    </DashboardContext.Provider>
  );
};

export const useDashboard = () => useContext(DashboardContext);
