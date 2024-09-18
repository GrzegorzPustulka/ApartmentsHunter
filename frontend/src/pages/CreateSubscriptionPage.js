import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { FaArrowRight, FaArrowLeft, FaCheck, FaHome } from 'react-icons/fa';

function CreateSubscriptionPage() {
  const { token } = useContext(AuthContext);
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    city: '',
    district: [],
    building_type: [],
    number_of_rooms: [],
    standard: [],
    minimum_price: 0,
    maximum_price: 99999999999,
    minimum_area: 0,
    maximum_area: 99999999999,
    deposit: null,
    floor_level: [],
    is_furnished: null,
    is_private_offer: null,
    bedrooms: [],
    user_email: '',
  });
  const navigate = useNavigate();

  const districtOptions = {
    Warszawa: ['Śródmieście', 'Mokotów', 'Wola', 'Praga Południe', 'Bielany'],
    krakow: ["Stare Miasto", "Grzegórzki", "Prądnik Czerwony", "Prądnik Biały", "Krowodrza", "Bronowice", "Zwierzyniec", "Dębniki", "Łagiewniki-Borek Fałęcki", "Swoszowice", "Podgórze Duchackie", "Bieżanów-Prokocim", "Podgórze", "Czyżyny", "Mistrzejowice", "Bieńczyce", "Wzgórza Krzesławickie", "Nowa Huta"],
    Wrocław: ['Krzyki', 'Psie Pole', 'Śródmieście', 'Fabryczna'],
  };

  const buildingTypes = ["Blok", "Kamienica", "Dom wolnostojący", "Szeregowiec", "Apartamentowiec", "Loft", "Pozostałe"];
  const roomOptions = ["1 pokój", "2 pokoje", "3 pokoje", "4 i więcej"];
  const standardOptions = ["niski", "normalny", "wysoki"];
  const floorOptions = ["suterena", "parter", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10 i powyżej"];
  const bedroomOptions = ["1", "2", "3", "4", "5", "6", "6 i więcej"];

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

  const handleSubmit = async () => {
    try {
      const response = await fetch('http://127.0.0.1:8000/subscriptions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        navigate('/subscriptions');
      } else {
        throw new Error('Nie udało się utworzyć subskrypcji');
      }
    } catch (error) {
      alert(error.message);
    }
  };

  const renderStepContent = () => {
    switch(step) {
      case 1:
        return (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Wybierz miasto</h2>
            <select
              name="city"
              value={formData.city}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Wybierz miasto</option>
              {Object.keys(districtOptions).map(city => (
                <option key={city} value={city}>{city}</option>
              ))}
            </select>
          </div>
        );
      case 2:
        return (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Wybierz dzielnice</h2>
            <div className="grid grid-cols-2 gap-2">
              {districtOptions[formData.city]?.map(district => (
                <label key={district} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={formData.district.includes(district)}
                    onChange={() => handleArrayInputChange('district', district)}
                    className="form-checkbox text-blue-600"
                  />
                  <span>{district}</span>
                </label>
              ))}
            </div>
          </div>
        );
      case 3:
        return (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Wybierz typ zabudowania</h2>
            <div className="grid grid-cols-2 gap-2">
              {buildingTypes.map(type => (
                <label key={type} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={formData.building_type.includes(type)}
                    onChange={() => handleArrayInputChange('building_type', type)}
                    className="form-checkbox text-blue-600"
                  />
                  <span>{type}</span>
                </label>
              ))}
            </div>
          </div>
        );
      case 4:
        return (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Wybierz liczbę pokoi</h2>
            <div className="grid grid-cols-2 gap-2">
              {roomOptions.map(room => (
                <label key={room} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={formData.number_of_rooms.includes(room)}
                    onChange={() => handleArrayInputChange('number_of_rooms', room)}
                    className="form-checkbox text-blue-600"
                  />
                  <span>{room}</span>
                </label>
              ))}
            </div>
          </div>
        );
      case 5:
        return (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Wybierz standard mieszkania</h2>
            <div className="grid grid-cols-2 gap-2">
              {standardOptions.map(standard => (
                <label key={standard} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={formData.standard.includes(standard)}
                    onChange={() => handleArrayInputChange('standard', standard)}
                    className="form-checkbox text-blue-600"
                  />
                  <span>{standard}</span>
                </label>
              ))}
            </div>
          </div>
        );
      case 6:
        return (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Wybierz zakres cenowy</h2>
            <div className="flex space-x-4">
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700">Cena minimalna</label>
                <input
                  type="number"
                  name="minimum_price"
                  value={formData.minimum_price}
                  onChange={handleInputChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700">Cena maksymalna</label>
                <input
                  type="number"
                  name="maximum_price"
                  value={formData.maximum_price}
                  onChange={handleInputChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>
          </div>
        );
      case 7:
        return (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Wybierz powierzchnię</h2>
            <div className="flex space-x-4">
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700">Powierzchnia minimalna</label>
                <input
                  type="number"
                  name="minimum_area"
                  value={formData.minimum_area}
                  onChange={handleInputChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700">Powierzchnia maksymalna</label>
                <input
                  type="number"
                  name="maximum_area"
                  value={formData.maximum_area}
                  onChange={handleInputChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>
          </div>
        );
      case 8:
        return (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Umeblowanie</h2>
            <div className="flex space-x-4">
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  name="is_furnished"
                  value="true"
                  checked={formData.is_furnished === true}
                  onChange={() => setFormData({...formData, is_furnished: true})}
                  className="form-radio text-blue-600"
                />
                <span className="ml-2">Tak</span>
              </label>
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  name="is_furnished"
                  value="false"
                  checked={formData.is_furnished === false}
                  onChange={() => setFormData({...formData, is_furnished: false})}
                  className="form-radio text-blue-600"
                />
                <span className="ml-2">Nie</span>
              </label>
            </div>
          </div>
        );
      case 9:
        return (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Oferta prywatna</h2>
            <div className="flex space-x-4">
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  name="is_private_offer"
                  value="true"
                  checked={formData.is_private_offer === true}
                  onChange={() => setFormData({...formData, is_private_offer: true})}
                  className="form-radio text-blue-600"
                />
                <span className="ml-2">Tak</span>
              </label>
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  name="is_private_offer"
                  value="false"
                  checked={formData.is_private_offer === false}
                  onChange={() => setFormData({...formData, is_private_offer: false})}
                  className="form-radio text-blue-600"
                />
                <span className="ml-2">Nie</span>
              </label>
            </div>
          </div>
        );
      case 10:
        return (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Maksymalna kaucja</h2>
            <input
              type="number"
              name="deposit"
              value={formData.deposit}
              onChange={handleInputChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        );
      case 11:
        return (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Preferowane piętro</h2>
            <div className="grid grid-cols-3 gap-2">
              {floorOptions.map(floor => (
                <label key={floor} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={formData.floor_level.includes(floor)}
                    onChange={() => handleArrayInputChange('floor_level', floor)}
                    className="form-checkbox text-blue-600"
                  />
                  <span>{floor}</span>
                </label>
              ))}
            </div>
          </div>
        );
      case 12:
        return (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Liczba sypialni</h2>
            <div className="grid grid-cols-3 gap-2">
              {bedroomOptions.map(bedroom => (
                <label key={bedroom} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={formData.bedrooms.includes(bedroom)}
                    onChange={() => handleArrayInputChange('bedrooms', bedroom)}
                    className="form-checkbox text-blue-600"
                  />
                  <span>{bedroom}</span>
                </label>
              ))}
            </div>
          </div>
        );
      case 13:
        return (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Podaj adres e-mail</h2>
            <input
              type="email"
              name="user_email"
              value={formData.user_email}
              onChange={handleInputChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        );
      case 14:
        return (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Podsumowanie subskrypcji</h2>
            <div className="bg-gray-100 p-4 rounded-md">
              <p><strong>Email:</strong> {formData.user_email}</p>
              <p><strong>Miasto:</strong> {formData.city}</p>
              <p><strong>Dzielnice:</strong> {formData.district.join(', ')}</p>
              <p><strong>Typ zabudowania:</strong> {formData.building_type.join(', ')}</p>
              <p><strong>Liczba pokoi:</strong> {formData.number_of_rooms.join(', ')}</p>
              <p><strong>Standard:</strong> {formData.standard.join(', ')}</p>
              <p><strong>Cena:</strong> {formData.minimum_price} - {formData.maximum_price} PLN</p>
              <p><strong>Powierzchnia:</strong> {formData.minimum_area} - {formData.maximum_area} m²</p>
              <p><strong>Maksymalna kaucja:</strong> {formData.deposit} PLN</p>
              <p><strong>Preferowane piętra:</strong> {formData.floor_level.join(', ')}</p>
              <p><strong>Umeblowane:</strong> {formData.is_furnished ? 'Tak' : 'Nie'}</p>
              <p><strong>Oferta prywatna:</strong> {formData.is_private_offer ? 'Tak' : 'Nie'}</p>
              <p><strong>Liczba sypialni:</strong> {formData.bedrooms.join(', ')}</p>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <Link to="/" className="flex-shrink-0 flex items-center">
                <FaHome className="h-8 w-8 text-blue-600" />
                <span className="ml-2 text-2xl font-bold text-blue-600">ApartmentsHunter</span>
              </Link>
            </div>
            <div className="flex items-center">
              <Link to="/subscriptions" className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium">
                Moje subskrypcje
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-3xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="bg-white shadow-xl rounded-lg overflow-hidden">
          <div className="px-8 py-6">
            <h1 className="text-3xl font-bold text-gray-900 mb-6">Stwórz subskrypcję</h1>
            <div className="mb-8">
              <div className="relative pt-1">
                <div className="flex mb-2 items-center justify-between">
                  <div>
                    <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-blue-600 bg-blue-200">
                      Krok {step} z 14
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="text-xs font-semibold inline-block text-blue-600">
                      {Math.round((step / 14) * 100)}%
                    </span>
                  </div>
                </div>
                <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-blue-200">
                  <div
                    style={{ width: `${(step / 14) * 100}%` }}
                    className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-blue-600"
                  ></div>
                </div>
              </div>
            </div>

            {renderStepContent()}

            <div className="mt-8 flex justify-between">
              {step > 1 && (
                <button
                  onClick={() => setStep(step - 1)}
                  className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition duration-300 flex items-center"
                >
                  <FaArrowLeft className="mr-2" /> Wstecz
                </button>
              )}
              {step < 14 ? (
                <button
                  onClick={() => setStep(step + 1)}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-300 flex items-center ml-auto"
                >
                  Dalej <FaArrowRight className="ml-2" />
                </button>
              ) : (
                <button
                  onClick={handleSubmit}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-300 flex items-center ml-auto"
                >
                  <FaCheck className="mr-2" /> Utwórz Subskrypcję
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreateSubscriptionPage;
