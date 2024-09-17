import { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';

function CreateSubscriptionPage() {
  const { token } = useContext(AuthContext);
  const [city, setCity] = useState('');
  const [districts, setDistricts] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [minArea, setMinArea] = useState('');
  const [maxArea, setMaxArea] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      city,
      districts: districts.split(',').map((d) => d.trim()),
      minPrice,
      maxPrice,
      minArea,
      maxArea,
    };
    const response = await fetch('https://backend-url/subscriptions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(payload),
    });
    if (response.ok) {
      navigate('/subscriptions');
    } else {
      alert('Nie udało się utworzyć subskrypcji');
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="mb-6">
        <Link to="/subscriptions" className="text-blue-500 hover:underline">
          &larr; Powrót do subskrypcji
        </Link>
      </div>
      <form onSubmit={handleSubmit} className="p-6 bg-white rounded shadow-md">
        <h2 className="mb-4 text-xl font-bold text-center">Nowa Subskrypcja</h2>
        <div className="mb-4">
          <label className="block mb-1">Miasto</label>
          <input
            type="text"
            className="w-full p-2 border rounded"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1">Dzielnice (oddzielone przecinkami)</label>
          <input
            type="text"
            className="w-full p-2 border rounded"
            value={districts}
            onChange={(e) => setDistricts(e.target.value)}
          />
        </div>
        <div className="flex mb-4 space-x-4">
          <div className="w-1/2">
            <label className="block mb-1">Cena minimalna</label>
            <input
              type="number"
              className="w-full p-2 border rounded"
              value={minPrice}
              onChange={(e) => setMinPrice(e.target.value)}
            />
          </div>
          <div className="w-1/2">
            <label className="block mb-1">Cena maksymalna</label>
            <input
              type="number"
              className="w-full p-2 border rounded"
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
            />
          </div>
        </div>
        <div className="flex mb-4 space-x-4">
          <div className="w-1/2">
            <label className="block mb-1">Powierzchnia minimalna</label>
            <input
              type="number"
              className="w-full p-2 border rounded"
              value={minArea}
              onChange={(e) => setMinArea(e.target.value)}
            />
          </div>
          <div className="w-1/2">
            <label className="block mb-1">Powierzchnia maksymalna</label>
            <input
              type="number"
              className="w-full p-2 border rounded"
              value={maxArea}
              onChange={(e) => setMaxArea(e.target.value)}
            />
          </div>
        </div>
        <button className="w-full p-2 font-bold text-white bg-green-500 rounded hover:bg-green-600">
          Utwórz Subskrypcję
        </button>
      </form>
    </div>
  );
}

export default CreateSubscriptionPage;
