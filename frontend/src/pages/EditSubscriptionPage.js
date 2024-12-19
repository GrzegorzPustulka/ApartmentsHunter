import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { getSubscription, updateSubscription } from '../utils/api';
import Navbar from '../components/layout/Navbar';

const EditSubscriptionPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { token } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    city: '',
    district: [],
    building_type: [],
    number_of_rooms: [],
    standard: [],
    minimum_price: '',
    maximum_price: '',
    minimum_area: '',
    maximum_area: '',
    deposit: '',
    is_furnished: false,
    is_private_offer: false,
    bedrooms: [],
    user_email: '',
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const districtOptions = {
    Kraków: ["Stare Miasto", "Grzegórzki", "Prądnik Czerwony", "Prądnik Biały", "Krowodrza", "Bronowice", "Zwierzyniec", "Dębniki", "Łagiewniki-Borek Fałęcki", "Swoszowice", "Podgórze Duchackie", "Bieżanów-Prokocim", "Podgórze", "Czyżyny", "Mistrzejowice", "Bieńczyce", "Wzgórza Krzesławickie", "Nowa Huta"],
  };

  const buildingTypes = ["Blok", "Kamienica", "Dom wolnostojący", "Szeregowiec", "Apartamentowiec", "Loft", "Pozostałe"];
  const roomOptions = ["1 pokój", "2 pokoje", "3 pokoje", "4 i więcej"];
  const standardOptions = ["niski", "normalny", "wysoki"];
  const bedroomOptions = ["1 sypialnia", "2 sypialnie", "3 sypialnie", "4 i więcej"];

  useEffect(() => {
    const fetchSubscription = async () => {
      setLoading(true);
      try {
        const data = await getSubscription(token, id);
        setFormData(data);
      } catch (error) {
        console.error('Failed to fetch subscription:', error);
        setError('Nie udało się pobrać danych subskrypcji. Spróbuj ponownie później.');
      } finally {
        setLoading(false);
      }
    };

    fetchSubscription();
  }, [token, id]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleArrayInputChange = (name, value) => {
    setFormData(prev => ({
      ...prev,
      [name]: prev[name].includes(value)
        ? prev[name].filter(item => item !== value)
        : [...prev[name], value]
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { status, user_id, id: subscriptionId, ...dataToUpdate } = formData;

      const numericFields = ['minimum_price', 'maximum_price', 'minimum_area', 'maximum_area', 'deposit'];
      numericFields.forEach(field => {
        if (dataToUpdate[field]) {
          dataToUpdate[field] = Number(dataToUpdate[field]);
        }
      });

      await updateSubscription(token, id, dataToUpdate);
      navigate('/subscriptions');
    } catch (error) {
      console.error('Failed to update subscription:', error);
      setError('Nie udało się zaktualizować subskrypcji. Spróbuj ponownie później.');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div>Ładowanie...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">Edytuj Subskrypcję</h1>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="city" className="block text-sm font-medium text-gray-700">Miasto</label>
              <select
                id="city"
                name="city"
                value={formData.city}
                onChange={handleInputChange}
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
              >
                <option value="">Wybierz miasto</option>
                {Object.keys(districtOptions).map(city => (
                  <option key={city} value={city}>{city}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Dzielnice</label>
              <div className="mt-1 grid grid-cols-2 gap-2">
                {districtOptions[formData.city]?.map(district => (
                  <label key={district} className="inline-flex items-center">
                    <input
                      type="checkbox"
                      checked={formData.district.includes(district)}
                      onChange={() => handleArrayInputChange('district', district)}
                      className="form-checkbox h-4 w-4 text-blue-600 transition duration-150 ease-in-out"
                    />
                    <span className="ml-2">{district}</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Typ budynku</label>
              <div className="mt-1 grid grid-cols-2 gap-2">
                {buildingTypes.map(type => (
                  <label key={type} className="inline-flex items-center">
                    <input
                      type="checkbox"
                      checked={formData.building_type.includes(type)}
                      onChange={() => handleArrayInputChange('building_type', type)}
                      className="form-checkbox h-4 w-4 text-blue-600 transition duration-150 ease-in-out"
                    />
                    <span className="ml-2">{type}</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Liczba pokoi</label>
              <div className="mt-1 grid grid-cols-2 gap-2">
                {roomOptions.map(option => (
                  <label key={option} className="inline-flex items-center">
                    <input
                      type="checkbox"
                      checked={formData.number_of_rooms.includes(option)}
                      onChange={() => handleArrayInputChange('number_of_rooms', option)}
                      className="form-checkbox h-4 w-4 text-blue-600 transition duration-150 ease-in-out"
                    />
                    <span className="ml-2">{option}</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Standard</label>
              <div className="mt-1 grid grid-cols-2 gap-2">
                {standardOptions.map(option => (
                  <label key={option} className="inline-flex items-center">
                    <input
                      type="checkbox"
                      checked={formData.standard.includes(option)}
                      onChange={() => handleArrayInputChange('standard', option)}
                      className="form-checkbox h-4 w-4 text-blue-600 transition duration-150 ease-in-out"
                    />
                    <span className="ml-2">{option}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="minimum_price" className="block text-sm font-medium text-gray-700">Cena minimalna</label>
                <input
                  type="number"
                  name="minimum_price"
                  id="minimum_price"
                  value={formData.minimum_price}
                  onChange={handleInputChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              </div>
              <div>
                <label htmlFor="maximum_price" className="block text-sm font-medium text-gray-700">Cena maksymalna</label>
                <input
                  type="number"
                  name="maximum_price"
                  id="maximum_price"
                  value={formData.maximum_price}
                  onChange={handleInputChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="minimum_area" className="block text-sm font-medium text-gray-700">Powierzchnia minimalna</label>
                <input
                  type="number"
                  name="minimum_area"
                  id="minimum_area"
                  value={formData.minimum_area}
                  onChange={handleInputChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              </div>
              <div>
                <label htmlFor="maximum_area" className="block text-sm font-medium text-gray-700">Powierzchnia maksymalna</label>
                <input
                  type="number"
                  name="maximum_area"
                  id="maximum_area"
                  value={formData.maximum_area}
                  onChange={handleInputChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              </div>
            </div>

            <div>
              <label htmlFor="deposit" className="block text-sm font-medium text-gray-700">Kaucja</label>
              <input
                type="number"
                name="deposit"
                id="deposit"
                value={formData.deposit}
                onChange={handleInputChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>

            <div>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  name="is_furnished"
                  checked={formData.is_furnished}
                  onChange={handleInputChange}
                  className="form-checkbox h-4 w-4 text-blue-600 transition duration-150 ease-in-out"
                />
                <span className="ml-2 block text-sm text-gray-900">Umeblowane</span>
              </label>
            </div>

            <div>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  name="is_private_offer"
                  checked={formData.is_private_offer}
                  onChange={handleInputChange}
                  className="form-checkbox h-4 w-4 text-blue-600 transition duration-150 ease-in-out"
                />
                <span className="ml-2 block text-sm text-gray-900">Oferta prywatna</span>
              </label>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Liczba sypialni</label>
              <div className="mt-1 grid grid-cols-2 gap-2">
                {bedroomOptions.map(option => (
                  <label key={option} className="inline-flex items-center">
                    <input
                      type="checkbox"
                      checked={formData.bedrooms.includes(option)}
                      onChange={() => handleArrayInputChange('bedrooms', option)}
                      className="form-checkbox h-4 w-4 text-blue-600 transition duration-150 ease-in-out"
                    />
                    <span className="ml-2">{option}</span>
                  </label>
                ))}
              </div>
            </div>
            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Zapisz zmiany
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditSubscriptionPage;
