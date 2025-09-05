import { createContext, useContext, useEffect, useState } from 'react';
import useCustomToast from '../hooks/useCustomToast';

const DashboardContext = createContext();

export const DashboardProvider = ({ children }) => {
  const [users, setUsers] = useState([]);
  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState([]);
  const [workshops, setWorkshops] = useState([]);
  const [blogs, setBlogs] = useState([]);
  const [comments, setComments] = useState([]);

  const [loading, setLoading] = useState({
    orders: false,
    users: false,
    products: false,
    workshops: false,
    blogs: false,
    comments: false
  });
  const { showToast } = useCustomToast();

  useEffect(() => {
    fetchResources('http://localhost:3000/api/v1/orders', setOrders, 'orders');
    fetchResources('http://localhost:3000/api/v1/users', setUsers, 'users');
    fetchResources(
      'http://localhost:3000/api/v1/products?all=true',
      setProducts,
      'products'
    );
    fetchResources(
      'http://localhost:3000/api/v1/workshops',
      setWorkshops,
      'workshops'
    );
    fetchResources('http://localhost:3000/api/v1/blogs', setBlogs, 'blogs');
    fetchResources(
      'http://localhost:3000/api/v1/comments',
      setComments,
      'comments'
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

    if (resource === 'products') {
      route = id;
    }

    if (resource === 'comments') {
      route = id;
    }

    if (resource === 'blogs') {
      route = id;
    }

    if (resource === 'workshops') {
      route = id;
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

      const data = await res.json();

      if (setter === setUsers) {
        setter((prev) => ({
          ...prev,
          users: prev.users.map((item) =>
            item._id === id ? { ...item, isDeleted: true } : item
          )
        }));
      }

      if (setter === setProducts) {
        fetchResources(
          'http://localhost:3000/api/v1/products?all=true',
          setProducts,
          'products'
        );
      }

      if (setter === setComments) {
        fetchResources(
          'http://localhost:3000/api/v1/comments',
          setComments,
          'comments'
        );
      }

      if (setter === setBlogs) {
        fetchResources('http://localhost:3000/api/v1/blogs', setBlogs, 'blogs');
      }

      if (setter === setWorkshops) {
        fetchResources(
          'http://localhost:3000/api/v1/workshops',
          setWorkshops,
          'workshops'
        );
      }

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

  const filterByCategory = async ({ filter, key }) => {
    setLoading((prev) => ({ ...prev, [key]: true }));
    try {
      let res;
      if (filter === 'allProducts') {
        res = await fetch('http://localhost:3000/api/v1/products?all=true');
      } else {
        res = await fetch(
          `http://localhost:3000/api/v1/products/filter?typeProduct=${encodeURIComponent(
            filter
          )}`
        );
      }

      if (!res.ok) throw new Error('Error en el filtrado');

      const data = await res.json();

      setProducts(data);
    } catch (error) {
      showToast({
        title: 'Error',
        description: `No se pudo filtrar. Intenta de nuevo.`,
        status: 'error'
      });
    } finally {
      setLoading((prev) => ({ ...prev, [key]: false }));
    }
  };

  return (
    <DashboardContext.Provider
      value={{
        orders,
        setOrders,
        loading,
        setLoading,
        users,
        setUsers,
        fetchResources,
        deleteResources,
        products,
        setProducts,
        filterByCategory,
        workshops,
        setWorkshops,
        blogs,
        setBlogs,
        comments,
        setComments
      }}
    >
      {children}
    </DashboardContext.Provider>
  );
};

export const useDashboard = () => useContext(DashboardContext);
