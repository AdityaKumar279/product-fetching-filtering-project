const ProductCard = ({ product }) => {
  if (!product) return null;

  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden flex flex-col h-full">
      {/* Image placeholder with gradient */}
      <div className="bg-gradient-to-br from-blue-400 via-purple-400 to-pink-400 h-40 flex items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-20 bg-pattern"></div>
        <div className="relative text-center z-10">
          <p className="text-white text-sm font-semibold opacity-90">PRODUCT</p>
          <p className="text-white font-bold text-lg truncate px-4 mt-1">
            {product.category}
          </p>
        </div>
      </div>

      {/* Content section */}
      <div className="p-4 flex flex-col flex-grow">
        {/* Product name */}
        <h3 className="font-semibold text-gray-900 text-sm line-clamp-2 mb-2 hover:text-blue-600 transition-colors">
          {product.name}
        </h3>

        {/* Product ID */}
        <p className="text-xs text-gray-500 mb-3 font-mono">
          ID: {product._id?.slice(0, 8)}...
        </p>

        {/* Footer with category badge and price */}
        <div className="flex items-center justify-between mt-auto pt-3 border-t border-gray-100">
          <span className="inline-block bg-gradient-to-r from-blue-100 to-blue-50 text-blue-800 text-xs font-medium px-2 py-1 rounded-full">
            {product.category}
          </span>
          <span className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-green-600">
            ${product.price.toFixed(2)}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
