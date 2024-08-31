import React, { useState } from 'react';
import FilterForm from '../components/forms/FilterForm';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';

function Dashboard() {
  const [subscriptions, setSubscriptions] = useState([]);

  const handleFilter = (filters) => {
    setSubscriptions([...subscriptions, filters]);
    // Możesz wysłać `filters` do backendu w celu zapisania subskrypcji
    console.log('New subscription:', filters);
  };

  return (
    <>
      <Navbar />
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold mb-4">Znajdź swoje mieszkanie</h1>
        <FilterForm onFilter={handleFilter} />
        <div className="mt-8">
          <h2 className="text-2xl font-semibold">Twoje subskrypcje</h2>
          <ul className="list-disc list-inside">
            {subscriptions.map((sub, index) => (
              <li key={index} className="mt-2">
                {sub.city}, {sub.district} - {sub.price} PLN, {sub.area} m², {sub.standard}
              </li>
            ))}
          </ul>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Dashboard;
