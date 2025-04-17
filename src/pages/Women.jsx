import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

const Womens = () => {
  const [products, setProducts] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [sortOption, setSortOption] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;

  useEffect(() => {
    const fetchProducts = async () => {
      const res = await fetch('/data/products.json');
      const data = await res.json();
      const womensProducts = data.filter(p => p.gender === 'women');
      setProducts(womensProducts);
      setFiltered(womensProducts);
    };
    fetchProducts();
  }, []);

  useEffect(() => {
    let updated = [...products];

    if (sortOption === 'lowToHigh') {
      updated = updated.sort((a, b) => a.price - b.price);
    } else if (sortOption === 'highToLow') {
      updated = updated.sort((a, b) => b.price - a.price);
    } else {
      updated = [...products]; // Default
    }

    setFiltered(updated);
    setCurrentPage(1);
  }, [sortOption, products]);

  const paginated = filtered.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
  const totalPages = Math.ceil(filtered.length / itemsPerPage);

  return (
    <>
      <Header />
      <div className="flex flex-col lg:flex-row bg-white min-h-screen font-montserrat">
        {/* Sidebar Filter */}
        <aside className="w-full lg:w-1/4 p-6 bg-slate-50 border-r">
          <h2 className="text-xl font-bold mb-4">Sort Options</h2>
          <div className="space-y-2">
            <button
              onClick={() => setSortOption('')}
              className={`block w-full text-left px-4 py-2 rounded ${!sortOption ? 'bg-black text-white' : 'hover:bg-gray-200'}`}
            >
              Default
            </button>
            <button
              onClick={() => setSortOption('lowToHigh')}
              className={`block w-full text-left px-4 py-2 rounded ${sortOption === 'lowToHigh' ? 'bg-black text-white' : 'hover:bg-gray-200'}`}
            >
              Price: Low to High
            </button>
            <button
              onClick={() => setSortOption('highToLow')}
              className={`block w-full text-left px-4 py-2 rounded ${sortOption === 'highToLow' ? 'bg-black text-white' : 'hover:bg-gray-200'}`}
            >
              Price: High to Low
            </button>
          </div>
        </aside>

        {/* Product Grid Content */}
        <main className="w-full lg:w-3/4 p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">Women's Collection</h2>
            <div className="text-gray-500">
              Showing {(currentPage - 1) * itemsPerPage + 1} - {Math.min(currentPage * itemsPerPage, filtered.length)} of {filtered.length} items
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
            {paginated.map(product => (
              <div key={product.id} className="border rounded-xl p-4 shadow hover:shadow-lg transition">
                <Link to={`/product/${product.id}`}>
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-64 object-cover mb-4 rounded"
                  />
                  <h3 className="text-lg font-semibold mb-2">{product.name}</h3>
                  <div className="flex items-center justify-between">
                    <p className="text-amber-600 font-bold text-lg">₹{product.price}</p>
                    {product.originalPrice && (
                      <p className="text-gray-400 line-through text-sm">₹{product.originalPrice}</p>
                    )}
                  </div>
                  <div className="mt-2 flex items-center justify-between">
                    <span className="text-sm text-gray-500">{product.category}</span>
                    <span className={`text-sm ${product.inStock ? 'text-green-600' : 'text-red-600'}`}>
                      {product.inStock ? 'In Stock' : 'Out of Stock'}
                    </span>
                  </div>
                </Link>
              </div>
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="mt-10 flex justify-center gap-2">
              {Array.from({ length: totalPages }, (_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentPage(i + 1)}
                  className={`px-4 py-2 rounded-full border ${
                    currentPage === i + 1 ? 'bg-black text-white' : 'hover:bg-gray-200'
                  }`}
                >
                  {i + 1}
                </button>
              ))}
            </div>
          )}
        </main>
      </div>
      <Footer />
    </>
  );
};

export default Womens;
