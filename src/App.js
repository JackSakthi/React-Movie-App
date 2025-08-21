import React from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';

import SearchResults from './SearchResults';
import Navbar from './Navbar';
import Footer from './Footer';
import Home from './Home';
import TrendingSlider from './TrendingSlider';
import BestFrom2025Slider from './BestFrom2025';
import MostPopular from './MostPopular';
import Categories from './Categories';

// ✅ New Pages
import TrendingPage from './TrendingPage';
import BestFrom2025Page from './BestFrom2025Page';
import PopularPage from './PopularPage';
import CategoriesPage from './CategoriesPage';

function App() {
  return (
    <>
      <Navbar />

      <Routes>
        <Route
          path="/"
          element={
            <>
              <Home />
              <TrendingSlider />
              <BestFrom2025Slider />
              <MostPopular />
              <Categories />
              <Footer />
            </>
          }
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
