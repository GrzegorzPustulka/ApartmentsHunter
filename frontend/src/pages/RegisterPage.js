// src/pages/RegisterPage.js
import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/layout/Navbar';
import RegisterForm from '../components/forms/RegisterForm';

function RegisterPage() {
  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Zarejestruj nowe konto
          </h2>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
            <RegisterForm />

            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">Lub</span>
                </div>
              </div>

              <div className="mt-6 text-center">
                <p className="text-sm text-gray-600">
                  Masz już konto?{' '}
                  <Link to="/login" className="font-medium text-blue-600 hover:text-blue-500">
                    Zaloguj się
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RegisterPage;
