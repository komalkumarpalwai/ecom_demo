import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faShoppingCart, faUser, faBars, faTimes } from '@fortawesome/free-solid-svg-icons';

const Header = () => {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className="bg-black text-white sticky top-0 z-50 overflow-x-hidden">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo */}
        <div className="group relative flex-shrink-0">
          <Link to="/" className="text-3xl md:text-4xl font-bold font-montserrat">
            <span className="bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent 
              transition-all duration-500 group-hover:bg-gradient-to-l group-hover:scale-105">
              LuxeWear
            </span>
          </Link>
          <div className="absolute -bottom-1 left-0 w-0 h-1 bg-gradient-to-r from-blue-400 to-blue-600 
            transition-all duration-500 group-hover:w-full" />
        </div>

        {/* Mobile Menu Toggle */}
        <div className="md:hidden flex items-center">
          <button 
            onClick={toggleMobileMenu} 
            className="text-white transition-transform duration-300 hover:rotate-90"
          >
            <FontAwesomeIcon 
              icon={isMobileMenuOpen ? faTimes : faBars} 
              className="text-2xl" 
            />
          </button>
        </div>

        {/* Search Bar (Desktop) */}
        <div className="hidden md:flex items-center justify-center w-1/3 mx-4">
          <div className="relative w-full group">
            <input 
              type="text" 
              className="w-full p-3 rounded-full border-2 border-gray-700 focus:outline-none 
                focus:border-blue-400 placeholder-gray-400 text-black pr-12
                transition-all duration-500 group-hover:border-blue-400/50"
              placeholder="Search for products..."
            />
            <button className="absolute right-2 top-1/2 -translate-y-1/2 p-3 bg-gradient-to-r from-blue-500 
              to-blue-400 text-white rounded-full hover:bg-gradient-to-l hover:scale-110 
              transition-all duration-500 shadow-lg shadow-blue-500/30">
              <FontAwesomeIcon icon={faSearch} className="text-lg" />
            </button>
          </div>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6 lg:space-x-8 text-white">
          {['Men', 'Women', 'Kids'].map((item) => (
            <Link 
              key={item}
              to={`/category/${item.toLowerCase()}`} 
              className="relative py-2 group transition-all duration-500"
            >
              <div className="flex flex-col items-center">
                <span className="group-hover:text-blue-400 transition-all duration-500 group-hover:-translate-y-1">
                  {item}
                </span>
                <div className="absolute bottom-0 left-0 w-0 h-[2px] bg-blue-400 
                  transition-all duration-500 group-hover:w-full" />
              </div>
            </Link>
          ))}
          <Link 
            to="/cart" 
            className="relative p-2 hover:text-blue-400 transition-all duration-500 hover:scale-110"
          >
            <FontAwesomeIcon icon={faShoppingCart} className="text-2xl" />
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full 
              w-5 h-5 flex items-center justify-center animate-pulse">
              3
            </span>
          </Link>
          <Link 
            to="/profile" 
            className="p-2 hover:text-blue-400 transition-all duration-500 hover:scale-110"
          >
            <FontAwesomeIcon icon={faUser} className="text-2xl" />
          </Link>
        </nav>
      </div>

      {/* Mobile Menu */}
      <div className={`${isMobileMenuOpen ? 'h-screen' : 'h-0'} md:hidden overflow-y-auto 
        transition-all duration-500 ease-in-out bg-gradient-to-b from-black to-gray-900`}>
        <div className="p-4 space-y-6 w-full">
          <div className="relative w-full max-w-xs mx-auto">
            <input 
              type="text" 
              className="w-full p-3 rounded-full border-2 border-gray-700 focus:outline-none 
                focus:border-blue-400 placeholder-gray-400 text-black pr-12"
              placeholder="Search for products..."
            />
            <button className="absolute right-2 top-1/2 -translate-y-1/2 p-3 bg-gradient-to-r from-blue-500 
              to-blue-400 text-white rounded-full">
              <FontAwesomeIcon icon={faSearch} />
            </button>
          </div>
          <div className="flex flex-col items-center space-y-4 text-lg w-full">
            {['Men', 'Women', 'Kids', 'Cart', 'Profile'].map((item) => (
              <Link 
                key={item}
                to={`/${item.toLowerCase()}`} 
                className="relative py-2 group transition-all duration-500 w-full text-center"
                onClick={toggleMobileMenu}
              >
                <div className="flex flex-col items-center mx-auto max-w-xs">
                  <span className="group-hover:text-blue-400 transition-all duration-500 group-hover:-translate-y-1">
                    {item}
                  </span>
                  <div className="w-0 h-[2px] bg-blue-400 transition-all duration-500 group-hover:w-3/4" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
