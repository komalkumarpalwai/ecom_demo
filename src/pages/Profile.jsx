import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Header from "../components/Header";
import Footer from "../components/Footer";

const Profile = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState({
    name: "John Doe",
    email: "john.doe@example.com",
    orders: [
      { id: 1, items: 3, total: 120.0, date: "2025-03-15" },
      { id: 2, items: 2, total: 75.0, date: "2025-02-10" },
    ],
  });
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { duration: 0.5 }
    },
    exit: { opacity: 0 }
  };

  const formVariants = {
    hidden: { x: isLogin ? -50 : 50, opacity: 0 },
    visible: { 
      x: 0, 
      opacity: 1,
      transition: { type: 'spring', stiffness: 100, damping: 10 }
    },
    exit: { x: isLogin ? 50 : -50, opacity: 0 }
  };

  const orderItemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.1 }
    })
  };

  const handleLogin = (e) => {
    e.preventDefault();
    setIsLoggedIn(true);
  };

  const handleRegister = (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords don't match!");
      return;
    }
    setUser({
      ...user,
      name: formData.name,
      email: formData.email
    });
    setIsLoggedIn(true);
    setIsLogin(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setFormData({
      name: '',
      email: '',
      password: '',
      confirmPassword: ''
    });
  };

  return (
    <>
      <Header />

      <div className="min-h-screen bg-gradient-to-br from-orange-200 to-amber-300 py-12">
        <motion.div 
          className="max-w-4xl mx-auto bg-white/90 backdrop-blur-md p-8 rounded-xl shadow-xl"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          <AnimatePresence mode="wait">
            {isLoggedIn ? (
              <motion.div
                key="profile"
                initial="hidden"
                animate="visible"
                exit="exit"
                variants={containerVariants}
              >
                <div className="flex justify-between items-center mb-6">
                  <motion.h2 
                    className="text-4xl font-bold"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    Welcome Back, {user.name}
                  </motion.h2>
                  <motion.button 
                    onClick={handleLogout}
                    className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition duration-300"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Logout
                  </motion.button>
                </div>
                
                <motion.p 
                  className="text-center text-lg mb-6"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                >
                  Here's your account information:
                </motion.p>
                
                <div className="text-center">
                  <motion.p 
                    className="text-xl font-semibold"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                  >
                    Name: {user.name}
                  </motion.p>
                  <motion.p 
                    className="text-lg text-gray-700 mb-8"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6 }}
                  >
                    Email: {user.email}
                  </motion.p>
                </div>

                <div className="mt-8">
                  <motion.h3 
                    className="text-2xl font-semibold mb-4"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.7 }}
                  >
                    Your Orders:
                  </motion.h3>
                  {user.orders.length > 0 ? (
                    <div className="space-y-4">
                      {user.orders.map((order, i) => (
                        <motion.div 
                          key={order.id}
                          className="bg-gray-100 p-4 rounded-lg shadow-md hover:bg-gray-200 transition-all duration-300"
                          variants={orderItemVariants}
                          initial="hidden"
                          animate="visible"
                          custom={i}
                          whileHover={{ scale: 1.02 }}
                        >
                          <p><strong>Order #{order.id}</strong></p>
                          <p><strong>Date:</strong> {order.date}</p>
                          <p><strong>Items:</strong> {order.items}</p>
                          <p><strong>Total:</strong> ${order.total.toFixed(2)}</p>
                        </motion.div>
                      ))}
                    </div>
                  ) : (
                    <motion.p 
                      className="text-center text-gray-500"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.8 }}
                    >
                      No orders found.
                    </motion.p>
                  )}
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="auth"
                initial="hidden"
                animate="visible"
                exit="exit"
                variants={containerVariants}
              >
                <motion.h2 
                  className="text-4xl font-bold text-center mb-6"
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  {isLogin ? 'Login to Your Account' : 'Create New Account'}
                </motion.h2>
                
                <AnimatePresence mode="wait">
                  <motion.div
                    key={isLogin ? "login" : "register"}
                    variants={formVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                  >
                    {isLogin ? (
                      <div className="max-w-md mx-auto">
                        <form onSubmit={handleLogin} className="space-y-4">
                          <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.2 }}
                          >
                            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                            <input
                              type="email"
                              name="email"
                              value={formData.email}
                              onChange={handleInputChange}
                              placeholder="you@example.com"
                              className="w-full border px-4 py-2 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                              required
                            />
                          </motion.div>
                          <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.3 }}
                          >
                            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                            <input
                              type="password"
                              name="password"
                              value={formData.password}
                              onChange={handleInputChange}
                              placeholder="••••••••"
                              className="w-full border px-4 py-2 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                              required
                            />
                          </motion.div>
                          <motion.button
                            type="submit"
                            className="w-full py-3 text-white rounded-lg bg-black hover:bg-amber-600 transition duration-300 font-medium"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.4 }}
                          >
                            Login
                          </motion.button>
                        </form>
                      </div>
                    ) : (
                      <div className="max-w-md mx-auto">
                        <form onSubmit={handleRegister} className="space-y-4">
                          {['name', 'email', 'password', 'confirmPassword'].map((field, i) => (
                            <motion.div
                              key={field}
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: 0.1 * i }}
                            >
                              <label className="block text-sm font-medium text-gray-700 mb-1">
                                {field === 'confirmPassword' ? 'Confirm Password' : 
                                 field.charAt(0).toUpperCase() + field.slice(1)}
                              </label>
                              <input
                                type={field.includes('password') ? 'password' : field === 'email' ? 'email' : 'text'}
                                name={field}
                                value={formData[field]}
                                onChange={handleInputChange}
                                placeholder={
                                  field === 'name' ? 'John Doe' : 
                                  field === 'email' ? 'you@example.com' : '••••••••'
                                }
                                className="w-full border px-4 py-2 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                                required
                              />
                            </motion.div>
                          ))}
                          <motion.button
                            type="submit"
                            className="w-full py-3 text-white rounded-lg bg-black hover:bg-amber-600 transition duration-300 font-medium"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.5 }}
                          >
                            Register
                          </motion.button>
                        </form>
                      </div>
                    )}
                  </motion.div>
                </AnimatePresence>

                <motion.p 
                  className="mt-6 text-sm text-center text-gray-700"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6 }}
                >
                  {isLogin ? "Don't have an account?" : 'Already have an account?'}{' '}
                  <motion.button
                    onClick={() => setIsLogin(!isLogin)}
                    className="text-amber-600 hover:underline font-medium"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {isLogin ? 'Register here' : 'Login here'}
                  </motion.button>
                </motion.p>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>

      <Footer />
    </>
  );
};

export default Profile;