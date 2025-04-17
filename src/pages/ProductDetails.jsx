import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const ProductCard = ({ product }) => {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      transition={{ duration: 0.3 }}
      className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 relative group"
    >
      <Link to={`/product/${product.id}`} className="block h-full">
        {/* Image Container */}
        <div className="relative overflow-hidden">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-64 object-cover transform transition-transform duration-500 group-hover:scale-110"
          />
          
          {/* Stock Status Badge */}
          <div className={`absolute top-4 right-4 px-3 py-1 rounded-full text-sm font-semibold ${
            product.inStock ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
          }`}>
            {product.inStock ? 'In Stock' : 'Sold Out'}
          </div>
        </div>

        {/* Product Details */}
        <div className="p-5">
          <h3 className="text-xl font-bold text-gray-800 mb-2">{product.name}</h3>
          <p className="text-sm text-gray-500 uppercase tracking-wide mb-3">{product.category}</p>
          
          <div className="flex justify-between items-center">
            <span className="text-2xl font-bold text-amber-600">
              ₹{product.price.toLocaleString()}
            </span>
            <button className="bg-gray-900 text-white px-4 py-2 rounded-full text-sm hover:bg-amber-500 transition-colors duration-300">
              View Details
            </button>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default ProductCard;