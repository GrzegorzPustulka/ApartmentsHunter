// src/pages/SubscriptionsPage.js
import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/layout/Navbar';
import SubscriptionCard from '../components/subscriptions/SubscriptionCard';
import useSubscriptions from '../hooks/useSubscriptions';
import { FaPlus } from 'react-icons/fa';

function SubscriptionsPage() {
  const { subscriptions, handleDelete, handleToggleStatus } = useSubscriptions();

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">Twoje Subskrypcje</h1>

          <div className="mb-6">
            <Link
              to="/subscriptions/create"
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              <FaPlus className="mr-2" /> Dodaj Subskrypcję
            </Link>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {subscriptions.length > 0 ? (
              subscriptions.map((sub) => (
                <SubscriptionCard
                  key={sub.id}
                  subscription={sub}
                  onDelete={() => handleDelete(sub.id)}
                  onToggleStatus={handleToggleStatus}
                />
              ))
            ) : (
              <p className="col-span-full text-center text-gray-600">Brak subskrypcji do wyświetlenia</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default SubscriptionsPage;
