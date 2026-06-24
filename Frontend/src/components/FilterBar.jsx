import { useContext } from 'react';
import { ProductContext } from '../context/ProductContext';

const CATEGORIES = [
  'All Categories',
  'Electronics',
  'Clothing',
  'Books',
  'Home & Kitchen',
  'Sports & Outdoors',
  'Toys & Games',
  'Beauty & Personal Care',
  'Food & Grocery',
  'Furniture',
  'Automotive',
];

const FilterBar = () => {
  const { selectedCategory, handleCategoryChange } = useContext(ProductContext);

  const handleChange = (e) => {
    handleCategoryChange(e.target.value);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-8 border-l-4 border-blue-500">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        {/* Filter Label */}
        <div>
          <label htmlFor="category-select" className="block text-sm font-bold text-gray-700 mb-2">
            Filter Products by Category
          </label>
          <p className="text-xs text-gray-500">
            Select a category to browse products or view all
          </p>
        </div>

        {/* Category Dropdown */}
        <select
          id="category-select"
          value={selectedCategory}
          onChange={handleChange}
          className="px-4 py-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 bg-white cursor-pointer font-medium text-gray-700 transition-all duration-200 md:w-auto w-full"
        >
          {CATEGORIES.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>

      {/* Active filter indicator */}
      {selectedCategory !== 'All Categories' && (
        <div className="mt-4 inline-block bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
          Active: {selectedCategory} ✓
        </div>
      )}
    </div>
  );
};

export default FilterBar;
