import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import './App.css';

import SearchResults from './SearchResults';
import Navbar from './Navbar';
import Footer from './Footer';
import Home from './Home';
import TrendingSlider from './TrendingSlider';
import BestFrom2025Slider from './BestFrom2025';
import MostPopular from './MostPopular';
import Categories from './Categories';
import Login from './Login';
import SignUp from './SignUp';

// ✅ New Pages
import TrendingPage from './TrendingPage';
import BestFrom2025Page from './BestFrom2025Page';
import PopularPage from './PopularPage';
import CategoriesPage from './CategoriesPage';

function App() {
  const [user, setUser] = useState(null);
  const location = useLocation();

  useEffect(() => {
    const storedUser = localStorage.getItem('movieAppUser');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleLogin = (userData) => {
    localStorage.setItem('movieAppUser', JSON.stringify(userData));
    setUser(userData);
  };

  const handleLogout = () => {
    localStorage.removeItem('movieAppUser');
    setUser(null);
  };

  const hideNavbar = location.pathname === '/login' || location.pathname === '/signup';

  return (
    <>
      {!hideNavbar && <Navbar user={user} onLogout={handleLogout} />}

      <Routes>
        <Route
          path="/"
          element={
            user ? (
              <>
                <Home />
                <TrendingSlider />
                <BestFrom2025Slider />
                <MostPopular />
                <Categories />
                <Footer />
              </>
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
        <Route
          path="/login"
          element={user ? <Navigate to="/" replace /> : <Login onLogin={handleLogin} />}
        />
        <Route path="/signup"
          element={user ? <Navigate to="/" replace /> : <SignUp />}
        />
        <Route path="/search" element={<SearchResults />} />

        {/* ✅ New Routes for dynamic tabs/pages */}
        <Route path="/trending" element={<TrendingPage />} />
        <Route path="/best-2025" element={<BestFrom2025Page />} />
        <Route path="/popular" element={<PopularPage />} />
        <Route path="/categories" element={<CategoriesPage />} />
      </Routes>
    </>
  );
}

export default App;
