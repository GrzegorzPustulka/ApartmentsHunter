import React from 'react';
import LoginForm from '../components/forms/LoginForm';
import Navbar from '../components/layout/Navbar';

function LoginPage() {
  return (
    <>
      <Navbar />
      <div className="flex justify-center items-center h-screen bg-gray-100">
        <LoginForm />
      </div>
    </>
  );
}

export default LoginPage;
