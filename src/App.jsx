import React, { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Layout Components
import LoadingSpinner from './components/LoadingSpinner';
import ScrollToTop from './components/ScrollToTop.jsx';

// Lazy-loaded Pages
const Home = lazy(() => import('./pages/Home'));
const Product = lazy(() => import('./pages/Product')); // Added product page
const About = lazy(() => import('./pages/About'));
const Contact = lazy(() => import('./pages/Contact'));
const Feedback = lazy(() => import('./pages/Feedback'));
const Privacy = lazy(() => import('./components/Privacy'));
const Terms = lazy(() => import('./components/Terms'));
const Men = lazy(() => import('./pages/Men'));
const Women = lazy(() => import('./pages/Women'));
const Kids = lazy(() => import('./pages/Kids'));
const NotFound = lazy(() => import('./pages/NotFound'));
const LimitedEditionPage = lazy(()=> import("./pages/LimitedEditionPage.jsx"))

const App = () => {
  return (
    <Router basename="/">
      <ScrollToTop /> {/* Reset scroll position on route change */}
      <Suspense fallback={<LoadingSpinner />}>
        <Routes>
          {/* Core Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/product/:id" element={<Product />} /> {/* Added product route */}
          <Route path="/product/limited-edition-tshirt" element={<LimitedEditionPage />} />
          {/* Category Routes */}
          <Route path="/category/men" element={<Men />} />
          <Route path="/category/women" element={<Women />} />
          <Route path="/category/kids" element={<Kids />} />

          {/* Legal Pages */}
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/terms" element={<Terms />} />

          {/* Contact Pages */}
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/feedback" element={<Feedback />} />

          {/* Error Handling */}
          <Route path="/404" element={<NotFound />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </Router>
  );
};

export default App;