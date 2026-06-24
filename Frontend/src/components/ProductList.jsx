import { useContext, useEffect } from 'react';
import { ProductContext } from '../context/ProductContext';
import ProductCard from './ProductCard';

const LoadingSpinner = () => (
  <div className="flex justify-center items-center py-16">
    <div className="relative w-16 h-16">
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full animate-spin"></div>
      <div className="absolute inset-1 bg-white rounded-full"></div>
    </div>
  </div>
);

const ErrorAlert = ({ message }) => (
  <div className="bg-red-50 border-l-4 border-red-500 rounded-lg p-6 mb-8 text-red-800 shadow-md">
    <div className="flex items-start gap-3">
      <span className="text-2xl">⚠️</span>
      <div>
        <h4 className="font-bold text-red-900 mb-1">Error Loading Products</h4>
        <p className="text-sm">{message}</p>
      </div>
    </div>
  </div>
);

const EmptyState = ({ selectedCategory }) => (
  <div className="text-center py-24 bg-gradient-to-b from-gray-50 to-white rounded-lg">
    <div className="text-6xl mb-4">📦</div>
    <h3 className="text-2xl font-bold text-gray-900 mb-2">No Products Found</h3>
    <p className="text-gray-600 mb-4">
      {selectedCategory !== 'All Categories'
        ? `No products available in the "${selectedCategory}" category`
        : 'No products available at the moment'}
    </p>
    <p className="text-sm text-gray-500">Try selecting a different category</p>
  </div>
);

const ProductList = () => {
  const { products, loading, error, hasMore, handleLoadMore, selectedCategory } =
    useContext(ProductContext);

  // Trigger initial fetch on component mount
  useEffect(() => {
    // Initial fetch is handled by ProductProvider
  }, []);

  return (
    <div>
      {/* Error state */}
      {error && <ErrorAlert message={error} />}

      {/* Loading state (initial) */}
      {loading && products.length === 0 && <LoadingSpinner />}

      {/* Products grid */}
      {!loading && products.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12">
          {products.map((product) => (
            <ProductCard
              key={`${product._id}-${product.createdAt}`}
              product={product}
            />
          ))}
        </div>
      )}

      {/* Empty state */}
      {!loading && products.length === 0 && !error && (
        <EmptyState selectedCategory={selectedCategory} />
      )}

      {/* Load More section */}
      {!loading && products.length > 0 && (
        <div className="flex flex-col items-center gap-6 py-12 border-t border-gray-200">
          {/* Loading indicator during pagination */}
          {loading && <LoadingSpinner />}

          {/* Load More Button */}
          {hasMore && !loading && (
            <button
              onClick={handleLoadMore}
              className="px-8 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-bold rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105 active:scale-95"
            >
              ↓ Load More Products
            </button>
          )}

          {/* End message */}
          {!hasMore && products.length > 0 && (
            <div className="text-center py-6 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg px-8 border border-green-200 w-full">
              <p className="text-green-800 font-semibold mb-1">✓ All products loaded</p>
              <p className="text-green-700 text-sm">
                You're viewing all {products.length} product
                {products.length !== 1 ? 's' : ''} in{' '}
                {selectedCategory === 'All Categories' ? 'our catalog' : `the ${selectedCategory} category`}
              </p>
            </div>
          )}

          {/* Product count */}
          <p className="text-gray-600 text-sm font-medium">
            📊 Showing {products.length} products
          </p>
        </div>
      )}
    </div>
  );
};

export default ProductList;
