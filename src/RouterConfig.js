import React, { lazy, Suspense } from 'react';
import { Routes, Route, BrowserRouter as Router } from 'react-router-dom';
import HomePage from '../src/pages/HomePage/index'

// Lazy loaded components
// const HomePage = lazy(() => import('../src/pages/HomePage/index'));
const Search = lazy(() => import('../src/components/Search/Search'));
const Download = lazy(() => import('../src/components/Download/Download'));

const RouterConfig = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        {/* Base path for the dashboard */}
        <Route path="/" element={<HomePage />}>
          {/* Nested routes under dashboard */}
          <Route index element={<Search />} />{' '}
          {/* Shows default content for "/dashboard" */}
          <Route path="search" element={<Search />} />
          <Route path="download" element={<Download />} />
          <Route path="*" element={<div>Page Not Found</div>} />{' '}
          {/* Fallback for unmatched routes under "/" */}
        </Route>
      </Routes>
    </Suspense>
  );
};

export default RouterConfig;
