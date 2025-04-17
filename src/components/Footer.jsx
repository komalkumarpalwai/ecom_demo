import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookF, faTwitter, faInstagram, faPinterestP, faTumblr } from '@fortawesome/free-brands-svg-icons';

const Footer = () => {
  return (
    <footer className="bg-black text-white py-8 px-4">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-start space-y-6 md:space-y-0 md:space-x-12">
        
        {/* Social Icons */}
        <div className="flex space-x-4">
          <a href="https://facebook.com" className="hover:text-blue-400">
            <FontAwesomeIcon icon={faFacebookF} className="text-xl" />
          </a>
          <a href="https://twitter.com" className="hover:text-blue-400">
            <FontAwesomeIcon icon={faTwitter} className="text-xl" />
          </a>
          <a href="https://tumblr.com" className="hover:text-blue-400">
            <FontAwesomeIcon icon={faTumblr} className="text-xl" />
          </a>
          <a href="https://instagram.com" className="hover:text-blue-400">
            <FontAwesomeIcon icon={faInstagram} className="text-xl" />
          </a>
          <a href="https://pinterest.com" className="hover:text-blue-400">
            <FontAwesomeIcon icon={faPinterestP} className="text-xl" />
          </a>
        </div>

        {/* Contact Info */}
        <div className="space-y-2">
          <h3 className="font-semibold text-lg">Contact Info</h3>
          <p className="text-sm">radhirajpurohit@gmail.com</p>
          <p className="text-sm">916304411313</p>
          <p className="text-sm">8-2-120/120/1/44, Noor Nagar, Road No. 10, Banjara Hills, Hyderabad, Telangana 500034.</p>
        </div>

        {/* Quick Links */}
        <div className="space-y-2">
          <h3 className="font-semibold text-lg">Quick Links</h3>
          <ul className="space-y-1 text-sm">
            <li><a href="/products" className="hover:text-blue-400">Products</a></li>
            <li><a href="/blog" className="hover:text-blue-400">Our Blog</a></li>
          </ul>
        </div>

        {/* Legal Links */}
        <div className="space-y-2">
          <h3 className="font-semibold text-lg">Legal Links</h3>
          <ul className="space-y-1 text-sm">
            <li><a href="/shipping" className="hover:text-blue-400">Shipping and Delivery Policy</a></li>
            <li><a href="/refund" className="hover:text-blue-400">Refund and Cancellation Policy</a></li>
          </ul>
        </div>

        {/* Useful Links */}
        <div className="space-y-2">
          <h3 className="font-semibold text-lg">Useful Links</h3>
          <ul className="space-y-1 text-sm">
            <li><a href="/track-order" className="hover:text-blue-400">Track Your Order</a></li>
            <li><a href="/offers" className="hover:text-blue-400">Offers</a></li>
          </ul>
        </div>
      </div>

      {/* Copyright */}
      <div className="mt-8 text-center text-sm">
        <p>© 2024 | All Rights Reserved</p>
      </div>
    </footer>
  );
};

export default Footer;
