import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

const Product = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch('/data/products.json');
        const data = await res.json();
        const foundProduct = data.find(p => p.id.toString() === id.toString());
        if (foundProduct) {
          setProduct(foundProduct);
        } else {
          console.error(`Product with ID ${id} not found`);
        }
      } catch (err) {
        console.error("Error fetching product:", err);
      }
    };

    fetchProduct();
  }, [id]);

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center text-gray-600">
        <p>Loading product...</p>
        <Link to="/" className="mt-4 text-blue-500 underline">Back to Home</Link>
      </div>
    );
  }

  const discount = Math.round(100 - (product.price / product.originalPrice) * 100);

  return (
    <div className="bg-white text-black font-montserrat">
      <Header />
      <div className="max-w-6xl mx-auto px-4 py-20 grid md:grid-cols-2 gap-10 items-start">
        <img src={product.image} alt={product.name} className="w-full h-auto object-cover rounded-xl shadow-md" />

        <div className="space-y-6">
          <h1 className="text-4xl font-bold">{product.name}</h1>

          <div className="flex items-center space-x-3">
            <span className="text-amber-600 text-2xl font-semibold">₹{product.price}</span>
            <span className="line-through text-gray-400 text-lg">₹{product.originalPrice}</span>
            <span className="text-green-600 font-medium text-sm">{discount}% OFF</span>
          </div>

          <div className="text-sm text-yellow-500">
            ★ {product.reviews?.rating} <span className="text-gray-500">({product.reviews?.count} reviews)</span>
          </div>

          <p className="text-gray-700">{product.description || "This product is amazing!"}</p>

          <span className={`block font-medium ${product.inStock ? 'text-green-600' : 'text-red-600'}`}>
            {product.inStock ? "In Stock" : "Out of Stock"}
          </span>

          <div className="flex gap-4 pt-6">
            <button
              disabled={!product.inStock}
              className={`flex-1 px-6 py-3 rounded-full text-white text-sm font-medium transition duration-300 ${
                product.inStock
                  ? 'bg-black hover:bg-amber-400 hover:text-black'
                  : 'bg-gray-400 cursor-not-allowed'
              }`}
            >
              Buy Now
            </button>
            <button
              disabled={!product.inStock}
              className={`flex-1 px-6 py-3 rounded-full border text-sm font-medium transition duration-300 ${
                product.inStock
                  ? 'border-black text-black hover:bg-black hover:text-white'
                  : 'border-gray-400 text-gray-400 cursor-not-allowed'
              }`}
            >
              Add to Cart
            </button>
          </div>

          <Link
            to="/"
            className="inline-block mt-10 text-sm text-blue-600 underline hover:text-blue-800"
          >
            ← Back to Home
          </Link>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Product;
