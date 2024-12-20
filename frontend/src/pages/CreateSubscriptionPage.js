import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { FaArrowRight, FaArrowLeft, FaCheck } from 'react-icons/fa';
import Navbar from '../components/layout/Navbar';
import { createSubscription } from '../utils/api';

function CreateSubscriptionPage() {
  const { token } = useContext(AuthContext);
  const [step, setStep] = useState(1);
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
    deposit: null,
    is_furnished: null,
    is_private_offer: null,
    bedrooms: [],
    notification_destination: '',
    notification_endpoint: '',
  });
  const navigate = useNavigate();

  const districtOptions = {
    Kraków: ["Stare Miasto", "Grzegórzki", "Prądnik Czerwony", "Prądnik Biały", "Krowodrza", "Bronowice", "Zwierzyniec", "Dębniki", "Łagiewniki-Borek Fałęcki", "Swoszowice", "Podgórze Duchackie", "Bieżanów-Prokocim", "Podgórze", "Czyżyny", "Mistrzejowice", "Bieńczyce", "Wzgórza Krzesławickie", "Nowa Huta"],
  };

  const buildingTypes = ["Blok", "Kamienica", "Dom wolnostojący", "Szeregowiec", "Apartamentowiec", "Loft", "Pozostałe"];
  const roomOptions = ["1 pokój", "2 pokoje", "3 pokoje", "4 i więcej"];
  const standardOptions = ["niski", "normalny", "wysoki"];
  const bedroomOptions = ["1 sypialnia", "2 sypialnie", "3 sypialnie", "4 i więcej"];

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
      const dataToSend = {
        ...formData,
        minimum_price: formData.minimum_price ? parseInt(formData.minimum_price) : null,
        maximum_price: formData.maximum_price ? parseInt(formData.maximum_price) : null,
        minimum_area: formData.minimum_area ? parseFloat(formData.minimum_area) : null,
        maximum_area: formData.maximum_area ? parseFloat(formData.maximum_area) : null,
        deposit: formData.deposit ? parseInt(formData.deposit) : null,
      };

      await createSubscription(token, dataToSend);
      navigate('/subscriptions');
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
            <h2 className="text-xl font-semibold">Liczba sypialni</h2>
            <div className="grid grid-cols-2 gap-2">
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
case 12:
        return (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold">Wybierz sposób otrzymywania powiadomień</h2>

            <div className="space-y-4">
              {/* Wybór metody powiadomień */}
              <div>
                <select
                  name="notification_destination"
                  value={formData.notification_destination}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Wybierz metodę powiadomień</option>
                  <option value="email">Email</option>
                  <option value="discord">Discord</option>
                  <option value="telegram">Telegram</option>
                </select>
              </div>

              {/* Pole dla endpointu z odpowiednią instrukcją */}
              {formData.notification_destination && (
                <div className="space-y-3">
                  {formData.notification_destination === 'email' && (
                    <div>
                      <input
                        type="email"
                        name="notification_endpoint"
                        value={formData.notification_endpoint}
                        onChange={handleInputChange}
                        placeholder="Podaj adres email"
                        className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  )}

                  {formData.notification_destination === 'discord' && (
                    <div>
                      <div className="bg-gray-50 p-4 rounded-md mb-3">
                        <h3 className="font-semibold mb-2">Jak uzyskać Discord ID:</h3>
                        <ol className="list-decimal list-inside space-y-2 text-sm text-gray-600">
                          <li>Włącz tryb developera w Discord (Ustawienia → Zaawansowane → Tryb developera)</li>
                          <li>Kliknij prawym przyciskiem na swój profil</li>
                          <li>Wybierz "Kopiuj ID"</li>
                          <li>Dodaj naszego bota ApartmentsHunter do znajomych</li>
                        </ol>
                      </div>
                      <input
                        type="text"
                        name="notification_endpoint"
                        value={formData.notification_endpoint}
                        onChange={handleInputChange}
                        placeholder="Wklej swoje Discord ID"
                        className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  )}

                  {formData.notification_destination === 'telegram' && (
                    <div>
                      <div className="bg-gray-50 p-4 rounded-md mb-3">
                        <h3 className="font-semibold mb-2">Jak uzyskać Telegram Chat ID:</h3>
                        <ol className="list-decimal list-inside space-y-2 text-sm text-gray-600">
                          <li>Otwórz Telegram i wyszukaj bota: @ApartmentsHunterBot</li>
                          <li>Rozpocznij rozmowę z botem (kliknij START)</li>
                          <li>Bot wyśle ci twój Chat ID</li>
                          <li>Skopiuj otrzymany Chat ID i wklej poniżej</li>
                        </ol>
                      </div>
                      <input
                        type="text"
                        name="notification_endpoint"
                        value={formData.notification_endpoint}
                        onChange={handleInputChange}
                        placeholder="Wklej swoje Telegram Chat ID"
                        className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        );
      case 13:
        return (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Podsumowanie subskrypcji</h2>
            <div className="bg-gray-100 p-4 rounded-md">
              <p><strong>Miasto:</strong> {formData.city}</p>
              <p><strong>Dzielnice:</strong> {formData.district.join(', ')}</p>
              <p><strong>Typ zabudowania:</strong> {formData.building_type.join(', ')}</p>
              <p><strong>Liczba pokoi:</strong> {formData.number_of_rooms.join(', ')}</p>
              <p><strong>Standard:</strong> {formData.standard.join(', ')}</p>
              <p><strong>Cena:</strong> {formData.minimum_price} - {formData.maximum_price} PLN</p>
              <p><strong>Powierzchnia:</strong> {formData.minimum_area} - {formData.maximum_area} m²</p>
              <p><strong>Maksymalna kaucja:</strong> {formData.deposit} PLN</p>
              <p><strong>Umeblowane:</strong> {formData.is_furnished ? 'Tak' : 'Nie'}</p>
              <p><strong>Oferta prywatna:</strong> {formData.is_private_offer ? 'Tak' : 'Nie'}</p>
              <p><strong>Liczba sypialni:</strong> {formData.bedrooms.join(', ')}</p>
              <div className="mt-4">
                <h3 className="font-semibold">Powiadomienia:</h3>
                <p><strong>Metoda:</strong> {formData.notification_destination}</p>
                <p><strong>Adres:</strong> {formData.notification_endpoint}</p>
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
      <div className="min-h-screen bg-gray-100">
        <Navbar/>
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="px-4 py-6 sm:px-0">
            <h1 className="text-3xl font-bold text-gray-900 mb-6">Stwórz subskrypcję</h1>
          <div className="bg-white shadow-xl rounded-lg overflow-hidden">
            <div className="px-8 py-6">
              <div className="mb-8">
                <div className="relative pt-1">
                  <div className="flex mb-2 items-center justify-between">
                    <div>
                      <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-blue-600 bg-blue-200">
                        Krok {step} z 13
                      </span>
                    </div>
                    <div className="text-right">
                      <span className="text-xs font-semibold inline-block text-blue-600">
                        {Math.round((step / 13) * 100)}%
                      </span>
                    </div>
                  </div>
                  <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-blue-200">
                    <div
                      style={{ width: `${(step / 13) * 100}%` }}
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
                {step < 13 ? (
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
    </div>
  );
}

export default CreateSubscriptionPage;
