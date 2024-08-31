import React from 'react';
import LoginForm from '../components/forms/LoginForm';
import Navbar from '../components/layout/Navbar';
import { Link } from 'react-router-dom';

function LoginPage() {
  return (
    <>
      <Navbar />
      <div className="flex justify-center items-center h-screen bg-gray-100">
        <div>
          <LoginForm />
          <p className="text-center mt-4">
            Nie masz konta? <Link to="/register" className="text-blue-500 hover:underline">Zarejestruj się</Link>
          </p>
        </div>
      </div>
    </>
  );
}

export default LoginPage;
