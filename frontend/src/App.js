// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './context/ProtectedRoute';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import SubscriptionsPage from './pages/SubscriptionsPage';
import CreateSubscriptionPage from './pages/CreateSubscriptionPage';
import EditSubscriptionPage from './pages/EditSubscriptionPage';
import AccountManagementPage from './pages/AccountManagementPage';
import ResetPasswordPage from './pages/ResetPasswordPage';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/reset-password/:token" element={<ResetPasswordPage />} />
          <Route element={<ProtectedRoute />}>
            <Route path="/subscriptions" element={<SubscriptionsPage />} />
            <Route path="/subscriptions/create" element={<CreateSubscriptionPage />} />
            <Route path="/subscriptions/edit/:id" element={<EditSubscriptionPage />} />
            <Route path="/account" element={<AccountManagementPage />} />
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
