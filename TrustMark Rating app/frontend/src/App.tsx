import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './contexts/AuthContext';
import Header from './components/common/Header/Header';
import Login from './components/auth/LoginForm/LoginForm';
import Register from './components/auth/RegisterForm/RegisterForm';
import AdminDashboard from './components/dashboard/AdminDashboard/AdminDashboard';
import UserDashboard from './components/dashboard/UserDashboard/UserDashboard';
import StoreOwnerDashboard from './components/dashboard/StoreOwnerDashboard/StoreOwnerDashboard';
import ProtectedRoute from './components/common/ProtectedRoute/ProtectedRoute';
import './App.css';

function App() {
  const { user } = useAuth();

  return (
    <div className="App">
      <Header />
      <main className="main-content">
        <Routes>
          <Route 
            path="/login" 
            element={user ? <Navigate to={user.role === 'admin' ? '/admin' : user.role === 'store_owner' ? '/owner' : '/user'} /> : <Login />} 
          />
          <Route 
            path="/register" 
            element={user ? <Navigate to={user.role === 'admin' ? '/admin' : user.role === 'store_owner' ? '/owner' : '/user'} /> : <Register />} 
          />
          <Route 
            path="/admin/*" 
            element={
              <ProtectedRoute role="admin">
                <AdminDashboard />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/user/*" 
            element={
              <ProtectedRoute>
                <UserDashboard />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/owner/*" 
            element={
              <ProtectedRoute role="store_owner">
                <StoreOwnerDashboard />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/" 
            element={<Navigate to={user ? (user.role === 'admin' ? '/admin' : user.role === 'store_owner' ? '/owner' : '/user') : '/login'} />} 
          />
        </Routes>
      </main>
    </div>
  );
}

export default App;