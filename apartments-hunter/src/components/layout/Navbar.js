import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-white text-lg font-bold">ApartmentsHunter</Link>
        <div>
          <Link to="/dashboard" className="text-gray-300 hover:text-white mx-2">Dashboard</Link>
          <Link to="/logout" className="text-gray-300 hover:text-white mx-2">Logout</Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
