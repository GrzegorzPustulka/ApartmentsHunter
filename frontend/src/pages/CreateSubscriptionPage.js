import { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { FaArrowRight, FaArrowLeft, FaCheck, FaHome } from 'react-icons/fa';

function CreateSubscriptionPage() {
  const { token } = useContext(AuthContext);
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    city: '',
    districts: [],
    buildingTypes: [],
    rooms: [],
    standards: [],
    minPrice: '',
    maxPrice: '',
    minArea: '',
    maxArea: '',
    maxDeposit: '',
    floor: '',
    isFurnished: false,
    isPrivateOffer: false,
    bedrooms: '',
  });
  const navigate = useNavigate();

  const districtOptions = {
    Warszawa: ['Śródmieście', 'Mokotów', 'Wola', 'Praga Południe', 'Bielany'],
    Kraków: ["Stare Miasto", "Grzegórzki", "Prądnik Czerwony", "Prądnik Biały", "Krowodrza", "Bronowice", "Zwierzyniec", "Dębniki", "Łagiewniki-Borek Fałęcki", "Swoszowice", "Podgórze Duchackie", "Bieżanów-Prokocim", "Podgórze", "Czyżyny", "Mistrzejowice", "Bieńczyce", "Wzgórza Krzesławickie", "Nowa Huta"],
    Wrocław: ['Krzyki', 'Psie Pole', 'Śródmieście', 'Fabryczna'],
  };

  const buildingTypes = ["Blok", "Kamienica", "Dom wolnostojący", "Szeregowiec", "Apartamentowiec", "Loft", "Pozostałe"];
  const roomOptions = ["1 pokój", "2 pokoje", "3 pokoje", "4 i więcej"];
  const standardOptions = ["niski", "normalny", "wysoki"];

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
                    checked={formData.districts.includes(district)}
                    onChange={() => handleArrayInputChange('districts', district)}
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
                    checked={formData.buildingTypes.includes(type)}
                    onChange={() => handleArrayInputChange('buildingTypes', type)}
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
                    checked={formData.rooms.includes(room)}
                    onChange={() => handleArrayInputChange('rooms', room)}
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
                    checked={formData.standards.includes(standard)}
                    onChange={() => handleArrayInputChange('standards', standard)}
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
                  name="minPrice"
                  value={formData.minPrice}
                  onChange={handleInputChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700">Cena maksymalna</label>
                <input
                  type="number"
                  name="maxPrice"
                  value={formData.maxPrice}
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
                  name="minArea"
                  value={formData.minArea}
                  onChange={handleInputChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700">Powierzchnia maksymalna</label>
                <input
                  type="number"
                  name="maxArea"
                  value={formData.maxArea}
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
            <h2 className="text-xl font-semibold">Dodatkowe preferencje</h2>
            <div className="space-y-2">
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  name="isFurnished"
                  checked={formData.isFurnished}
                  onChange={handleInputChange}
                  className="form-checkbox text-blue-600"
                />
                <span>Tylko mieszkania umeblowane</span>
              </label>
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  name="isPrivateOffer"
                  checked={formData.isPrivateOffer}
                  onChange={handleInputChange}
                  className="form-checkbox text-blue-600"
                />
                <span>Tylko oferty prywatne</span>
              </label>
            </div>
            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700">Maksymalna kaucja</label>
              <input
                type="number"
                name="maxDeposit"
                value={formData.maxDeposit}
                onChange={handleInputChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700">Preferowane piętro</label>
              <input
                type="number"
                name="floor"
                value={formData.floor}
                onChange={handleInputChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700">Liczba sypialni</label>
              <input
                type="number"
                name="bedrooms"
                value={formData.bedrooms}
                onChange={handleInputChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>
        );
      case 9:
        return (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Podsumowanie subskrypcji</h2>
            <div className="bg-gray-100 p-4 rounded-md">
              <p><strong>Miasto:</strong> {formData.city}</p>
              <p><strong>Dzielnice:</strong> {formData.districts.join(', ')}</p>
              <p><strong>Typ zabudowania:</strong> {formData.buildingTypes.join(', ')}</p>
              <p><strong>Liczba pokoi:</strong> {formData.rooms.join(', ')}</p>
              <p><strong>Standard:</strong> {formData.standards.join(', ')}</p>
              <p><strong>Cena:</strong> {formData.minPrice} - {formData.maxPrice} PLN</p>
              <p><strong>Powierzchnia:</strong> {formData.minArea} - {formData.maxArea} m²</p>
              <p><strong>Maksymalna kaucja:</strong> {formData.maxDeposit} PLN</p>
              <p><strong>Piętro:</strong> {formData.floor}</p>
              <p><strong>Umeblowane:</strong> {formData.isFurnished ? 'Tak' : 'Nie'}</p>
              <p><strong>Oferta prywatna:</strong> {formData.isPrivateOffer ? 'Tak' : 'Nie'}</p>
              <p><strong>Liczba sypialni:</strong> {formData.bedrooms}</p>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

   return (
    <div className="min-h-screen bg-gray-100">
      {/* Pasek nawigacyjny */}
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

      {/* Zawartość strony */}
      <div className="max-w-3xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="bg-white shadow-xl rounded-lg overflow-hidden">
          <div className="px-8 py-6">
            <h1 className="text-3xl font-bold text-gray-900 mb-6">Stwórz subskrypcję</h1>
            <div className="mb-8">
              <div className="relative pt-1">
                <div className="flex mb-2 items-center justify-between">
                  <div>
                    <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-blue-600 bg-blue-200">
                      Krok {step} z 9
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="text-xs font-semibold inline-block text-blue-600">
                      {Math.round((step / 9) * 100)}%
                    </span>
                  </div>
                </div>
                <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-blue-200">
                  <div
                    style={{ width: `${(step / 9) * 100}%` }}
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
              {step < 9 ? (
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
