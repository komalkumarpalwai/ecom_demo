import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import { motion } from 'framer-motion';

const LimitedEditionPage = () => {
  const [product, setProduct] = useState(null);
  const [selectedSize, setSelectedSize] = useState('');

  useEffect(() => {
    fetch('/data/products.json')
      .then((response) => response.json())
      .then((data) => {
        const limitedEditionProduct = data.find((item) => item.id === 'limited-edition-tshirt');
        setProduct(limitedEditionProduct);
      })
      .catch((error) => console.error("Error fetching product data:", error));
  }, []);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse text-2xl text-amber-500">Loading Luxury...</div>
      </div>
    );
  }

  return (
    <div className="bg-white text-black font-montserrat">
      <Header />
      
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Product Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Image Section */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="relative aspect-square overflow-hidden rounded-3xl shadow-xl"
            >
              <motion.img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              />
              <div className="absolute top-4 right-4 bg-amber-500 text-white px-4 py-2 rounded-full text-sm font-bold">
                Limited Edition
              </div>
            </motion.div>

            {/* Details Section */}
            <div className="space-y-8">
              <h1 className="text-4xl font-bold mb-4">{product.name}</h1>
              
              <div className="flex items-center gap-4 mb-6">
                <div className="flex text-amber-500">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      className={`w-5 h-5 ${i < 4 ? 'fill-current' : 'fill-gray-300'}`}
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <span className="text-gray-600">(128 reviews)</span>
              </div>

              <p className="text-gray-600 text-lg leading-relaxed mb-8">{product.description}</p>

              {/* Size Selector */}
              <div className="mb-8">
                <h3 className="text-xl font-semibold mb-4">Select Size</h3>
                <div className="grid grid-cols-4 gap-3">
                  {['S', 'M', 'L', 'XL'].map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`py-3 text-center rounded-lg border-2 transition-colors ${
                        selectedSize === size
                          ? 'border-amber-500 bg-amber-50'
                          : 'border-gray-200 hover:border-amber-300'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Pricing */}
              <div className="mb-8">
                <div className="flex items-center gap-4">
                  <span className="text-3xl font-bold text-amber-600">₹{product.price}</span>
                  <span className="line-through text-gray-400">₹{product.originalPrice}</span>
                  <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">
  {Math.round(100 - (product.price / product.originalPrice * 100))}% OFF
</span>
                </div>
              </div>

              {/* Add to Cart */}
              <button className="w-full bg-amber-500 text-white py-4 rounded-xl font-bold hover:bg-amber-600 transition-colors shadow-lg flex items-center justify-center gap-3">
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  className="h-6 w-6" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" 
                  />
                </svg>
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LimitedEditionPage;