import { Provider, useSelector } from 'react-redux';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import store from './app/store';
import Navbar from './components/Shared/Navbar';
import {
  ProtectedRoute,
  AdminRoute,
  CustomerRoute,
} from './components/Shared/ProtectedRoute';
import {
  LoginPage,
  RegisterPage,
  DashboardPage,
  BuyPolicyPage,
  ClaimsPage,
  AdminPage,
  NotFoundPage,
} from './pages';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import './App.css';

const HomeRoute = () => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  return isAuthenticated ? (
    <Navigate to="/dashboard" replace />
  ) : (
    <Navigate to="/login" replace />
  );
};

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Navbar />
        <Routes>
          {/* Public Routes */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/" element={<HomeRoute />} />

          {/* Customer Routes */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <CustomerRoute>
                  <DashboardPage />
                </CustomerRoute>
              </ProtectedRoute>
            }
          />
          <Route
            path="/buy-policy"
            element={
              <ProtectedRoute>
                <CustomerRoute>
                  <BuyPolicyPage />
                </CustomerRoute>
              </ProtectedRoute>
            }
          />
          <Route
            path="/claims"
            element={
              <ProtectedRoute>
                <CustomerRoute>
                  <ClaimsPage />
                </CustomerRoute>
              </ProtectedRoute>
            }
          />

          {/* Admin Routes */}
          <Route
            path="/admin"
            element={
              <ProtectedRoute>
                <AdminRoute>
                  <AdminPage />
                </AdminRoute>
              </ProtectedRoute>
            }
          />

          {/* Catch-all */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Router>
    </Provider>
    <Router>
      <div className="app">
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            {/* Add other routes here as needed */}
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
