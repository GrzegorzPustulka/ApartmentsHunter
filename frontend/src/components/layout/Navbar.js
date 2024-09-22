import React, { useContext, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { FaHome, FaUser, FaSignOutAlt, FaList, FaPlus, FaSignInAlt, FaUserPlus } from 'react-icons/fa';
import { Menu } from 'lucide-react';

const Navbar = () => {
  const { token, logout } = useContext(AuthContext);
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  if (location.pathname.includes('/reset-password')) {
    return null;
  }

  const NavLink = ({ to, icon: Icon, children }) => (
    <Link
      to={to}
      className="text-gray-600 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium flex items-center transition duration-150 ease-in-out"
    >
      <Icon className="h-5 w-5 mr-2" />
      {children}
    </Link>
  );

  const navItems = token ? [
    { to: "/subscriptions", icon: FaList, text: "Moje subskrypcje" },
    { to: "/subscriptions/create", icon: FaPlus, text: "Nowa subskrypcja" },
    { to: "/account", icon: FaUser, text: "Konto" },
  ] : [
    { to: "/login", icon: FaSignInAlt, text: "Zaloguj się" },
    { to: "/register", icon: FaUserPlus, text: "Zarejestruj się" },
  ];

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <FaHome className="h-8 w-8 text-blue-600" />
              <span className="ml-2 text-2xl font-bold text-blue-600 hidden sm:block">ApartmentsHunter</span>
            </Link>
          </div>
          <div className="hidden md:flex md:items-center">
            {navItems.map((item, index) => (
              <NavLink key={index} to={item.to} icon={item.icon}>
                {item.text}
              </NavLink>
            ))}
            {token && (
              <button
                onClick={logout}
                className="text-gray-600 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium flex items-center transition duration-150 ease-in-out"
              >
                <FaSignOutAlt className="h-5 w-5 mr-2" />
                Wyloguj się
              </button>
            )}
          </div>
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-blue-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
            >
              <Menu className="h-6 w-6" />
            </button>
          </div>
        </div>
      </div>
      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navItems.map((item, index) => (
              <NavLink key={index} to={item.to} icon={item.icon}>
                {item.text}
              </NavLink>
            ))}
            {token && (
              <button
                onClick={logout}
                className="w-full text-left text-gray-600 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium flex items-center transition duration-150 ease-in-out"
              >
                <FaSignOutAlt className="h-5 w-5 mr-2" />
                Wyloguj się
              </button>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
