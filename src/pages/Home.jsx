import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { motion } from 'framer-motion';
import { GlobeAltIcon, CheckBadgeIcon, TagIcon, LockClosedIcon } from '@heroicons/react/24/outline';

const Home = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const productsRes = await fetch('/data/products.json');
        const categoriesRes = await fetch('/data/categories.json');

        if (!productsRes.ok || !categoriesRes.ok) {
          throw new Error('Network response was not ok');
        }

        const productsData = await productsRes.json();
        const categoriesData = await categoriesRes.json();

        setProducts(productsData);
        setCategories(categoriesData);
      } catch (err) {
        console.error('Error loading data:', err);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="bg-white text-black font-montserrat">
      <Header />

      {/* Hero Section */}
      <section
        className="relative h-screen min-h-[800px] bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.pexels.com/photos/1536619/pexels-photo-1536619.jpeg?auto=compress&cs=tinysrgb&w=600')",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-black/40 flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="text-center px-6 max-w-4xl"
          >
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight drop-shadow-xl">
              Unleash Your <span className="text-amber-400">Fashion</span> Statement
            </h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 1 }}
              className="text-white text-xl md:text-2xl mb-8 font-light tracking-wider"
            >
              Where Luxury Meets Contemporary Design
            </motion.p>
            <Link
              to="/shop"
              className="inline-block bg-transparent border-2 border-white text-white px-12 py-4 rounded-full font-bold hover:bg-white hover:text-black transition-all duration-500 uppercase tracking-widest text-sm"
            >
              Explore Collection
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-24 px-6 bg-slate-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 relative pb-4">
            Discover Our Collections
            <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-amber-400"></span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 ml-8 md:ml-16 lg:ml-32 xl:ml-48">
            {categories.map((cat, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="relative group h-96 rounded-xl overflow-hidden shadow-xl"
              >
                <Link to={cat.link} className="h-full w-full block">
                  <div
                    className="absolute inset-0 bg-cover bg-center transition-all duration-500 group-hover:scale-105"
                    style={{ backgroundImage: `url(${cat.image})` }}
                  ></div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-black/30 transition duration-300"></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <h3 className="text-white text-3xl font-medium tracking-wide text-center transform transition duration-500 group-hover:-translate-y-2">
                      {cat.title}
                    </h3>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

   {/* Featured Products Section */}
<section className="py-24 px-6 bg-white">
  <div className="max-w-7xl mx-auto">
    <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 relative pb-4">
      Curated Selections
      <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-amber-400"></span>
    </h2>

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
      {products.slice(0, 5).map((product) => (  // Limit the products to the first 5
        <motion.div
          key={product.id}
          whileHover={{ y: -10 }}
          transition={{ duration: 0.3 }}
          className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300"
        >
          <Link to={`/product/${product.id}`}>
            <div className="relative overflow-hidden">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-80 object-cover transform transition duration-500 hover:scale-105"
              />
              <div className="absolute top-4 right-4 bg-amber-400 text-black px-4 py-2 rounded-full text-sm font-bold">
                {product.inStock ? "New Arrival" : "Out of Stock"}
              </div>
            </div>
          </Link>
          <div className="p-6 space-y-3">
            <Link to={`/product/${product.id}`}>
              <h3 className="text-xl font-bold text-gray-800 hover:underline">{product.name}</h3>
            </Link>
            <div className="flex items-center gap-3 text-sm">
              <span className="text-amber-600 font-semibold text-lg">₹{product.price}</span>
              <span className="line-through text-gray-400 text-sm">₹{product.originalPrice}</span>
              <span className="text-green-600 font-medium">
                {Math.round(100 - (product.price / product.originalPrice) * 100)}% off
              </span>
            </div>
            <div className="flex items-center text-sm text-yellow-500 gap-2">
              <span>★ {product.reviews.rating}</span>
              <span className="text-gray-500">({product.reviews.count} reviews)</span>
            </div>
            <p className="text-sm text-gray-500 uppercase tracking-wide">{product.category}</p>
            <div className="flex gap-4 pt-4">
              <button className="flex-1 bg-black text-white px-4 py-2 rounded-full text-sm hover:bg-amber-400 hover:text-black transition-colors duration-300">
                Buy Now
              </button>
              <button className="flex-1 border border-black text-black px-4 py-2 rounded-full text-sm hover:bg-black hover:text-white transition-colors duration-300">
                Add to Cart
              </button>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  </div>
</section>
      {/* Special Offer Banner */}
      <section className="relative py-24 px-6 bg-gradient-to-r from-black to-amber-900 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center"
          >
            <div className="space-y-8 relative z-10 text-center lg:text-left">
              <motion.div
                initial={{ x: -50 }}
                animate={{ x: 0 }}
                transition={{ type: "spring", stiffness: 100 }}
              >
                <h3 className="text-amber-400 font-bold uppercase tracking-[0.2em] text-sm mb-4">
                  Limited Time Offer
                </h3>
                <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
                  Special Edition <br />
                  <span className="text-amber-400">Premium Cotton T-Shirt</span>
                </h2>
                <p className="text-gray-200 text-lg mb-8 max-w-xl">
                  Crafted with luxury organic cotton and precision stitching. Experience unparalleled comfort with our limited edition designer wear.
                </p>
              </motion.div>
              <div className="space-y-6">
                <div className="inline-flex items-center gap-4 bg-black/30 px-8 py-4 rounded-full">
                  <span className="text-white font-semibold">Use Code:</span>
                  <span className="text-amber-400 font-bold text-2xl tracking-wide">OFF20</span>
                </div>
                <motion.div whileHover={{ scale: 1.05 }} className="inline-block">
                  <Link 
                    to="/product/limited-edition-tshirt"
                    className="inline-flex items-center gap-4 bg-amber-400 text-black px-8 py-4 rounded-full font-bold hover:bg-white hover:gap-6 transition-all duration-300 group"
                  >
                    Shop Now
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 group-hover:translate-x-2 transition-transform"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </Link>
                </motion.div>
              </div>
            </div>

            <motion.div whileHover={{ scale: 1.02 }} className="relative h-96 rounded-3xl overflow-hidden shadow-2xl">
              <img
                src="https://images.pexels.com/photos/9558699/pexels-photo-9558699.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                alt="Special Offer T-Shirt"
                className="w-full h-full object-cover absolute inset-0 transform hover:scale-105 transition duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/40 to-black/20" />
              <div className="absolute bottom-8 right-8 bg-white/10 backdrop-blur-lg p-6 rounded-2xl">
                <div className="text-center">
                  <span className="line-through text-gray-300 text-xl">₹2999</span>
                  <h3 className="text-3xl font-bold text-amber-400 mt-2">₹2399</h3>
                  <p className="text-white text-sm mt-2">20% OFF</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>

        <div className="absolute top-0 left-0 w-48 h-48 bg-amber-400/10 rounded-full -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-64 h-64 bg-amber-400/10 rounded-full translate-x-1/2 translate-y-1/2" />
      </section>

      {/* Feature Highlights */}
      <section className="bg-amber-50 py-24 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 text-center">
          {[
            { title: "Worldwide Shipping", desc: "We deliver globally with care and speed — wherever you are.", icon: GlobeAltIcon },
            { title: "Best Quality", desc: "Crafted with precision using top-tier materials and design.", icon: CheckBadgeIcon },
            { title: "Best Offers", desc: "Get the latest luxury fashion with exclusive deals & discounts.", icon: TagIcon },
            { title: "Secure Payments", desc: "Enjoy safe, encrypted transactions at checkout.", icon: LockClosedIcon },
          ].map((item, i) => (
            <div key={i} className="space-y-4 px-6">
              <item.icon className="h-12 w-12 mx-auto text-amber-500" />
              <h4 className="text-xl font-bold">{item.title}</h4>
              <p className="text-gray-600 text-sm">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Home;
