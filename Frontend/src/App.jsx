import { ProductProvider } from './context/ProductContext';
import FilterBar from './components/FilterBar';
import ProductList from './components/ProductList';

function App() {
  return (
    <ProductProvider>
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-gray-50 to-gray-100">
        {/* Header */}
        <header className="bg-gradient-to-r from-blue-600 to-purple-600 shadow-lg sticky top-0 z-40">
          <div className="max-w-7xl mx-auto px-4 py-8">
            <div className="flex flex-col gap-2">
              <h1 className="text-4xl md:text-5xl font-bold text-white">
                🛍️ CodeVector
              </h1>
              <p className="text-blue-100 text-lg">
                Browse 200,000+ products with optimized cursor-based pagination
              </p>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="max-w-7xl mx-auto px-4 py-12">
          {/* Filter Bar */}
          <FilterBar />

          {/* Product List with Pagination */}
          <ProductList />
        </main>

        {/* Footer */}
        <footer className="bg-gray-900 text-gray-300 py-8 mt-16 border-t border-gray-800">
          <div className="max-w-7xl mx-auto px-4 text-center">
            <p className="mb-2">© 2024 CodeVector. Product Browsing Made Fast & Easy.</p>
            <p className="text-gray-500 text-sm">
              Powered by React, Vite, Tailwind CSS & Cursor-Based Pagination
            </p>
          </div>
        </footer>
      </div>
    </ProductProvider>
  );
}

export default App;
