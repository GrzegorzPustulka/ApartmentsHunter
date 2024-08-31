import React from 'react';

function Footer() {
  return (
    <footer className="bg-gray-800 p-4 mt-8 text-center text-gray-300">
      <p>&copy; {new Date().getFullYear()} ApartmentsHunter. All rights reserved.</p>
    </footer>
  );
}

export default Footer;
