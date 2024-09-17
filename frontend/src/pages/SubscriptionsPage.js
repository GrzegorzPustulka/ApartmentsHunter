import { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

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
      setSubscriptions([]);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="flex justify-between mb-6">
        <h1 className="text-2xl font-bold">Twoje Subskrypcje</h1>
        <button onClick={handleLogout} className="text-red-500 hover:underline">
          Wyloguj się
        </button>
      </div>
      <div className="mb-4">
        <Link
          to="/create-subscription"
          className="px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-600"
        >
          Dodaj Subskrypcję
        </Link>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        {subscriptions.length > 0 ? (
          subscriptions.map((sub) => (
            <div key={sub.id} className="p-4 bg-white rounded shadow">
              <h2 className="mb-2 text-xl font-bold">Subskrypcja #{sub.id}</h2>
              <p>Miasto: {sub.city}</p>
              <p>Dzielnice: {sub.districts.join(', ')}</p>
              <p>Cena: {sub.minPrice} - {sub.maxPrice} PLN</p>
              <p>Powierzchnia: {sub.minArea} - {sub.maxArea} m²</p>
            </div>
          ))
        ) : (
          <p>Brak subskrypcji do wyświetlenia</p>
        )}
      </div>
    </div>
  );
}

export default SubscriptionsPage;
