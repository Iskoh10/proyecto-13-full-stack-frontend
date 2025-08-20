import { createContext, useContext, useEffect, useState } from 'react';
import fetchApi from '../service/fetchApi';
import useCustomToast from '../hooks/useCustomToast';

const FilterContext = createContext();

export const FilterProvider = ({ children }) => {
  const [filters, setFilters] = useState({ typeProduct: 'allProducts' });
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState({
    page: 1,
    lastPage: 1,
    total: 0
  });
  const { showToast } = useCustomToast();

  const fetchProducts = async (page = 1) => {
    setLoading(true);
    try {
      const data = await fetchApi({ filters, page });
      setProducts(Array.isArray(data) ? data : data.products);

      if (data.info) {
        setPagination({
          page: page,
          lastPage: data.info.pages,
          total: data.info.count
        });
      }
    } catch (error) {
      showToast({
        title: 'Error al cargar los productos',
        description: error.message || 'Inténtalo de nuevo más tarde.',
        status: 'error'
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts(1);
  }, [filters]);

  return (
    <FilterContext.Provider
      value={{
        filters,
        setFilters,
        products,
        setProducts,
        loading,
        refreshProducts: fetchProducts,
        pagination,
        setPagination
      }}
    >
      {children}
    </FilterContext.Provider>
  );
};

export const useFilterContext = () => useContext(FilterContext);
