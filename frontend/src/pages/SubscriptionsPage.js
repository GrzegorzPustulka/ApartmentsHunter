import React, { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { FaHome, FaPlus, FaEdit, FaTrash } from 'react-icons/fa';

function SubscriptionsPage() {
  const { token, logout } = useContext(AuthContext);
  const [subscriptions, setSubscriptions] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate('/');
    } else {
      fetchSubscriptions();
    }
  }, [token, navigate]);

  const fetchSubscriptions = async () => {
    try {
      const response = await fetch('http://127.0.0.1:8000/subscriptions', {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await response.json();
      if (Array.isArray(data)) {
        setSubscriptions(data);
      } else {
        console.error("Otrzymane dane nie są tablicą:", data);
        setSubscriptions([]);
      }
    } catch (error) {
      console.error("Błąd podczas pobierania subskrypcji:", error);
      setSubscriptions([]);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Jednolity pasek nawigacyjny */}
      <nav className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <Link to="/" className="flex-shrink-0 flex items-center">
                <FaHome className="h-8 w-8 text-blue-600" />
                <span className="ml-2 text-2xl font-bold text-blue-600">ApartmentsHunter</span>
              </Link>
              <div className="ml-6 flex items-center">
                <Link to="/subscriptions" className="text-gray-900 hover:text-gray-700 px-3 py-2 rounded-md text-sm font-medium">
                  Moje subskrypcje
                </Link>
                <Link to="/subscriptions/create" className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium">
                  Nowa subskrypcja
                </Link>
              </div>
            </div>
            <div className="flex items-center">
              <button
                onClick={handleLogout}
                className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
              >
                Wyloguj się
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Zawartość strony */}
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
                <div key={sub.id} className="bg-white overflow-hidden shadow rounded-lg">
                  <div className="px-4 py-5 sm:p-6">
                    <h3 className="text-lg font-medium text-gray-900 mb-2">Subskrypcja #{sub.id}</h3>
                    <p className="text-sm text-gray-600">Miasto: {sub.city}</p>
                    <p className="text-sm text-gray-600">Dzielnice: {sub.districts.join(', ')}</p>
                    <p className="text-sm text-gray-600">Cena: {sub.minPrice} - {sub.maxPrice} PLN</p>
                    <p className="text-sm text-gray-600">Powierzchnia: {sub.minArea} - {sub.maxArea} m²</p>
                  </div>
                  <div className="px-4 py-4 sm:px-6 bg-gray-50 flex justify-end space-x-2">
                    <button className="text-blue-600 hover:text-blue-800">
                      <FaEdit />
                    </button>
                    <button className="text-red-600 hover:text-red-800">
                      <FaTrash />
                    </button>
                  </div>
                </div>
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
