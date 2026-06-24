import { createContext, useState, useCallback, useEffect } from 'react';
import axios from 'axios';

export const ProductContext = createContext();

const API_BASE_URL = 'http://localhost:5000/api/products';

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [hasMore, setHasMore] = useState(false);
  const [nextCursor, setNextCursor] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('All Categories');

  const fetchProducts = useCallback(
    async (category = selectedCategory, cursor = null) => {
      try {
        setError(null);
        if (!cursor) setLoading(true);

        const params = {
          limit: 20,
        };

        if (cursor) {
          params.cursor = cursor;
        }

        if (category && category !== 'All Categories') {
          params.category = category;
        }

        const response = await axios.get(API_BASE_URL, { params });
        console.log(response);

        const { success, data, nextCursor: newNextCursor, hasMore: newHasMore } = response.data;

        if (!success) {
          throw new Error('Failed to fetch products');
        }

        if (cursor) {
          // Pagination: append to existing products
          setProducts((prevProducts) => [...prevProducts, ...data]);
        } else {
          // Category change or initial load: replace products
          setProducts(data);
        }

        setNextCursor(newNextCursor);
        setHasMore(newHasMore);
        setError(null);
      } catch (err) {
        console.error('Error fetching products:', err);
        setError(err.message || 'Failed to fetch products');
        if (!cursor) {
          setProducts([]);
        }
      } finally {
        setLoading(false);
      }
    },
    [selectedCategory]
  );

  useEffect(() => {
    // Initial fetch on mount
    fetchProducts();
  }, [fetchProducts]);

  const handleCategoryChange = useCallback(
    (newCategory) => {
      setSelectedCategory(newCategory);
      setNextCursor(null);
      setProducts([]);
      fetchProducts(newCategory, null);
    },
    [fetchProducts]
  );

  const handleLoadMore = useCallback(async () => {
    if (nextCursor && !loading) {
      await fetchProducts(selectedCategory, nextCursor);
    }
  }, [nextCursor, loading, selectedCategory, fetchProducts]);

  const value = {
    products,
    loading,
    error,
    hasMore,
    nextCursor,
    selectedCategory,
    fetchProducts,
    handleCategoryChange,
    handleLoadMore,
  };

  return (
    <ProductContext.Provider value={value}>
      {children}
    </ProductContext.Provider>
  );
};
