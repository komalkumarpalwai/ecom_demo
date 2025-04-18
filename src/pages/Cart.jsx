import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useCart } from '../contexts/CartContext';

const Cart = () => {
  const {
    cart,
    removeFromCart,
    updateQuantity,
    clearCart,
    totalItems,
    totalPrice,
  } = useCart();

  if (cart.length === 0) {
    return (
      <div className="bg-white text-black font-montserrat">
        <Header />
        <div className="min-h-screen flex flex-col items-center justify-center px-4">
          <div className="max-w-md text-center">
            <h2 className="text-2xl font-bold mb-4">Your cart is empty</h2>
            <p className="text-gray-600 mb-6">
              Looks like you haven't added anything to your cart yet
            </p>
            <Link
              to="/"
              className="px-6 py-3 bg-black text-white rounded-full hover:bg-amber-500 transition duration-300"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="bg-white text-black font-montserrat">
      <Header />
      <div className="max-w-6xl mx-auto px-4 py-20">
        <h1 className="text-3xl font-bold mb-8">Your Cart ({totalItems} items)</h1>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-2 space-y-6">
            {cart.map((item) => (
              <div
                key={item.id}
                className="flex flex-col sm:flex-row gap-6 border-b pb-6"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-32 h-32 object-cover rounded-lg"
                />
                <div className="flex-1">
                  <div className="flex justify-between">
                    <h3 className="text-lg font-medium">{item.name}</h3>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="text-gray-500 hover:text-red-500"
                    >
                      Remove
                    </button>
                  </div>
                  <p className="text-gray-600 text-sm mt-1">
                    ₹{item.price} {item.originalPrice && (
                      <span className="line-through text-gray-400 ml-1">
                        ₹{item.originalPrice}
                      </span>
                    )}
                  </p>
                  <div className="mt-4 flex items-center">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="w-8 h-8 border rounded-l flex items-center justify-center"
                    >
                      -
                    </button>
                    <span className="w-12 h-8 border-t border-b flex items-center justify-center">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="w-8 h-8 border rounded-r flex items-center justify-center"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="border p-6 rounded-lg h-fit sticky top-20">
            <h2 className="text-xl font-bold mb-4">Order Summary</h2>
            <div className="space-y-4">
              <div className="flex justify-between">
                <span>Subtotal ({totalItems} items)</span>
                <span>₹{totalPrice.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span className="text-green-600">FREE</span>
              </div>
              <div className="border-t pt-4 flex justify-between font-bold">
                <span>Total</span>
                <span>₹{totalPrice.toFixed(2)}</span>
              </div>
            </div>
            <button className="w-full mt-6 py-3 bg-black text-white rounded-full hover:bg-amber-500 transition duration-300">
              Proceed to Checkout
            </button>
            <button
              onClick={clearCart}
              className="w-full mt-4 py-3 border border-black rounded-full hover:bg-gray-100 transition duration-300"
            >
              Clear Cart
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Cart;