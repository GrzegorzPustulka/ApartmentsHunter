import React from 'react';
import Navbar from '../components/layout/Navbar';
import SearchApartments from '../components/search/SearchApartments';

const SearchApartmentsPage = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <SearchApartments />
    </div>
  );
};

export default SearchApartmentsPage;
