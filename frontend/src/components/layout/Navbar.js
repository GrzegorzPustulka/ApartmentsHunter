// src/components/layout/Navbar.js
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { FaHome } from 'react-icons/fa';

const Navbar = () => {
  const { token, logout } = useContext(AuthContext);

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <FaHome className="h-8 w-8 text-blue-600" />
              <span className="ml-2 text-2xl font-bold text-blue-600">ApartmentsHunter</span>
            </Link>
            <div className="ml-6 flex items-center">
              {token && (
                <>
                  <Link to="/subscriptions" className="text-gray-900 hover:text-gray-700 px-3 py-2 rounded-md text-sm font-medium">
                    Moje subskrypcje
                  </Link>
                  <Link to="/subscriptions/create" className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium">
                    Nowa subskrypcja
                  </Link>
                </>
              )}
            </div>
          </div>
          <div className="flex items-center">
            {token ? (
              <button
                onClick={logout}
                className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
              >
                Wyloguj się
              </button>
            ) : (
              <>
                <Link to="/login" className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium">
                  Zaloguj się
                </Link>
                <Link to="/register" className="ml-4 text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium">
                  Zarejestruj się
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
