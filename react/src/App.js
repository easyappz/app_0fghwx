import React, { useEffect } from 'react';
import './App.css';
import ErrorBoundary from './ErrorBoundary';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import Header from './components/Header';
import Footer from './components/Footer';
import PrivateRoute from './components/PrivateRoute';

// Pages
import Home from './pages/Home';
import AdsList from './pages/AdsList';
import AdView from './pages/AdView';
import AdCreate from './pages/AdCreate';
import AdEdit from './pages/AdEdit';
import Profile from './pages/Profile';
import Login from './pages/Login';
import Register from './pages/Register';
import NotFound from './pages/NotFound';

const queryClient = new QueryClient();

function App() {
  const routesList = [
    '/',
    '/ads',
    '/ads/:id',
    '/ads/create',
    '/ads/:id/edit',
    '/profile',
    '/login',
    '/register',
    '*',
  ];

  useEffect(() => {
    if (typeof window !== 'undefined' && typeof window.handleRoutes === 'function') {
      window.handleRoutes(routesList);
    }
  }, []);

  return (
    <ErrorBoundary>
      <div data-easytag="id1-react/src/App.js" className="min-h-screen flex flex-col bg-background text-foreground">
        <BrowserRouter>
          <QueryClientProvider client={queryClient}>
            <Header />
            <main data-easytag="id2-react/src/App.js" className="flex-1 pt-20">{/* account for fixed header */}
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/ads" element={<AdsList />} />
                <Route path="/ads/:id" element={<AdView />} />
                <Route
                  path="/ads/create"
                  element={
                    <PrivateRoute>
                      <AdCreate />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/ads/:id/edit"
                  element={
                    <PrivateRoute>
                      <AdEdit />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/profile"
                  element={
                    <PrivateRoute>
                      <Profile />
                    </PrivateRoute>
                  }
                />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </main>
            <Footer />
          </QueryClientProvider>
        </BrowserRouter>
      </div>
    </ErrorBoundary>
  );
}

export default App;
