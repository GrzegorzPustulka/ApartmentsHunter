import { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { FaArrowRight, FaArrowLeft } from 'react-icons/fa';

function CreateSubscriptionPage() {
  const { token } = useContext(AuthContext);
  const [step, setStep] = useState(1);
  const [city, setCity] = useState('');
  const [districts, setDistricts] = useState([]);
  const [selectedDistricts, setSelectedDistricts] = useState([]);
  const [selectedBuildingTypes, setSelectedBuildingTypes] = useState([]);
  const [selectedRooms, setSelectedRooms] = useState([]);
  const [selectedStandards, setSelectedStandards] = useState([]);
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [minArea, setMinArea] = useState('');
  const [maxArea, setMaxArea] = useState('');
  const [maxDeposit, setMaxDeposit] = useState('');
  const [floor, setFloor] = useState('');
  const [isFurnished, setIsFurnished] = useState(false);
  const [isPrivateOffer, setIsPrivateOffer] = useState(false);
  const [bedrooms, setBedrooms] = useState('');
  const navigate = useNavigate();

  const districtOptions = {
    Warszawa: ['Śródmieście', 'Mokotów', 'Wola', 'Praga Południe', 'Bielany'],
    Kraków: ['Stare Miasto', 'Podgórze', 'Nowa Huta', 'Krowodrza'],
    Wrocław: ['Krzyki', 'Psie Pole', 'Śródmieście', 'Fabryczna'],
  };

  const buildingTypes = [
    "Blok",
    "Kamienica",
    "Dom wolnostojący",
    "Szeregowiec",
    "Apartamentowiec",
    "Loft",
    "Pozostałe"
  ];

  const roomOptions = ["1 pokój", "2 pokoje", "3 pokoje", "4 i więcej"];
  const standardOptions = ["niski", "normalny", "wysoki"];

  const handleCityChange = (e) => {
    const selectedCity = e.target.value;
    setCity(selectedCity);
    setDistricts(districtOptions[selectedCity] || []);
    setSelectedDistricts([]);
    setStep(2);
  };

  const handleCheckboxChange = (setter, value) => {
    setter((prevSelected) =>
      prevSelected.includes(value)
        ? prevSelected.filter((item) => item !== value)
        : [...prevSelected, value]
    );
  };

  const handleSubmit = async () => {
    const payload = {
      city,
      districts: selectedDistricts,
      minPrice,
      maxPrice,
      minArea,
      maxArea,
      buildingTypes: selectedBuildingTypes,
      rooms: selectedRooms,
      standards: selectedStandards,
      maxDeposit,
      floor,
      isFurnished,
      isPrivateOffer,
      bedrooms,
    };
    const response = await fetch('http://127.0.0.1:8000/subscriptions', {
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

  const renderProgress = () => {
    const totalSteps = 13;
    const progressPercentage = Math.min((step / totalSteps) * 100, 100);

    return (
      <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4">
        <div
          className="bg-blue-500 h-2.5 rounded-full"
          style={{ width: `${progressPercentage}%` }}
        ></div>
      </div>
    );
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold text-center mb-4">Stwórz subskrypcję</h1>

        {renderProgress()}

        <div className="mb-6">
          <h2 className="text-xl font-semibold text-center mb-4">
            Krok {step} z 13
          </h2>
        </div>

        {step === 1 && (
          <div>
            <label className="block text-gray-700 text-lg font-bold mb-2">Wybierz miasto</label>
            <select
              className="w-full p-2 mb-4 border rounded"
              value={city}
              onChange={handleCityChange}
              required
            >
              <option value="">Wybierz miasto</option>
              <option value="Warszawa">Warszawa</option>
              <option value="Kraków">Kraków</option>
              <option value="Wrocław">Wrocław</option>
            </select>
          </div>
        )}

        {step === 2 && (
          <div>
            <label className="block text-gray-700 text-lg font-bold mb-2">Wybierz dzielnice</label>
            <div className="grid grid-cols-2 gap-2">
              {districts.map((district) => (
                <label key={district} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={selectedDistricts.includes(district)}
                    onChange={() => handleCheckboxChange(setSelectedDistricts, district)}
                  />
                  <span>{district}</span>
                </label>
              ))}
            </div>
          </div>
        )}

        {step === 3 && (
          <div>
            <label className="block text-gray-700 text-lg font-bold mb-2">Wybierz typ zabudowania</label>
            <div className="grid grid-cols-2 gap-2">
              {buildingTypes.map((type) => (
                <label key={type} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={selectedBuildingTypes.includes(type)}
                    onChange={() => handleCheckboxChange(setSelectedBuildingTypes, type)}
                  />
                  <span>{type}</span>
                </label>
              ))}
            </div>
          </div>
        )}

        {step === 4 && (
          <div>
            <label className="block text-gray-700 text-lg font-bold mb-2">Wybierz liczbę pokoi</label>
            <div className="grid grid-cols-2 gap-2">
              {roomOptions.map((room) => (
                <label key={room} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={selectedRooms.includes(room)}
                    onChange={() => handleCheckboxChange(setSelectedRooms, room)}
                  />
                  <span>{room}</span>
                </label>
              ))}
            </div>
          </div>
        )}

        {step === 5 && (
          <div>
            <label className="block text-gray-700 text-lg font-bold mb-2">Wybierz standard mieszkania</label>
            <div className="grid grid-cols-2 gap-2">
              {standardOptions.map((standard) => (
                <label key={standard} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={selectedStandards.includes(standard)}
                    onChange={() => handleCheckboxChange(setSelectedStandards, standard)}
                  />
                  <span>{standard}</span>
                </label>
              ))}
            </div>
          </div>
        )}

        {step === 6 && (
          <div>
            <label className="block text-gray-700 text-lg font-bold mb-2">Wybierz cenę</label>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Cena minimalna</label>
              <input
                type="number"
                className="w-full p-2 border rounded"
                value={minPrice}
                onChange={(e) => setMinPrice(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Cena maksymalna</label>
              <input
                type="number"
                className="w-full p-2 border rounded"
                value={maxPrice}
                onChange={(e) => setMaxPrice(e.target.value)}
              />
            </div>
          </div>
        )}

        {step === 7 && (
          <div>
            <label className="block text-gray-700 text-lg font-bold mb-2">Wybierz powierzchnię</label>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Powierzchnia minimalna</label>
              <input
                type="number"
                className="w-full p-2 border rounded"
                value={minArea}
                onChange={(e) => setMinArea(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Powierzchnia maksymalna</label>
              <input
                type="number"
                className="w-full p-2 border rounded"
                value={maxArea}
                onChange={(e) => setMaxArea(e.target.value)}
              />
            </div>
          </div>
        )}

        {step === 8 && (
          <div>
            <label className="block text-gray-700 text-lg font-bold mb-2">Wybierz maksymalną kaucję</label>
            <input
              type="number"
              className="w-full p-2 border rounded"
              value={maxDeposit}
              onChange={(e) => setMaxDeposit(e.target.value)}
            />
          </div>
        )}

        {step === 9 && (
          <div>
            <label className="block text-gray-700 text-lg font-bold mb-2">Wybierz piętro</label>
            <input
              type="number"
              className="w-full p-2 border rounded"
              value={floor}
              onChange={(e) => setFloor(e.target.value)}
            />
          </div>
        )}

        {step === 10 && (
          <div>
            <label className="block text-gray-700 text-lg font-bold mb-2">Czy mieszkanie umeblowane?</label>
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={isFurnished}
                onChange={() => setIsFurnished(!isFurnished)}
              />
              <span>Tylko mieszkania umeblowane</span>
            </label>
          </div>
        )}

        {step === 11 && (
          <div>
            <label className="block text-gray-700 text-lg font-bold mb-2">Czy oferta prywatna?</label>
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={isPrivateOffer}
                onChange={() => setIsPrivateOffer(!isPrivateOffer)}
              />
              <span>Tylko oferty prywatne</span>
            </label>
          </div>
        )}

        {step === 12 && (
          <div>
            <label className="block text-gray-700 text-lg font-bold mb-2">Wybierz liczbę sypialni</label>
            <input
              type="number"
              className="w-full p-2 border rounded"
              value={bedrooms}
              onChange={(e) => setBedrooms(e.target.value)}
            />
          </div>
        )}

        {step === 13 && (
          <div>
            <h2 className="text-xl font-bold text-gray-700 mb-4">Podsumowanie subskrypcji</h2>
            <div className="mb-4">
              <strong>Miasto:</strong> {city}
            </div>
            <div className="mb-4">
              <strong>Dzielnice:</strong> {selectedDistricts.join(', ')}
            </div>
            <div className="mb-4">
              <strong>Typ zabudowania:</strong> {selectedBuildingTypes.join(', ')}
            </div>
            <div className="mb-4">
              <strong>Liczba pokoi:</strong> {selectedRooms.join(', ')}
            </div>
            <div className="mb-4">
              <strong>Standard mieszkania:</strong> {selectedStandards.join(', ')}
            </div>
            <div className="mb-4">
              <strong>Cena:</strong> {minPrice} - {maxPrice} PLN
            </div>
            <div className="mb-4">
              <strong>Powierzchnia:</strong> {minArea} - {maxArea} m²
            </div>
            <div className="mb-4">
              <strong>Maksymalna kaucja:</strong> {maxDeposit} PLN
            </div>
            <div className="mb-4">
              <strong>Piętro:</strong> {floor}
            </div>
            <div className="mb-4">
              <strong>Mieszkanie umeblowane:</strong> {isFurnished ? "Tak" : "Nie"}
            </div>
            <div className="mb-4">
              <strong>Oferta prywatna:</strong> {isPrivateOffer ? "Tak" : "Nie"}
            </div>
            <div className="mb-4">
              <strong>Liczba sypialni:</strong> {bedrooms}
            </div>
          </div>
        )}

        {/* Przyciski nawigacyjne */}
        <div className="flex justify-between mt-6">
          {step > 1 && (
            <button
              className="p-2 text-white bg-gray-400 rounded hover:bg-gray-500 flex items-center"
              onClick={() => setStep(step - 1)}
            >
              <FaArrowLeft className="mr-2" /> Wstecz
            </button>
          )}

          {step < 13 ? (
            <button
              className="p-2 text-white bg-blue-500 rounded hover:bg-blue-600 flex items-center ml-auto"
              onClick={() => setStep(step + 1)}
            >
              Dalej <FaArrowRight className="ml-2" />
            </button>
          ) : (
            <button
              className="p-2 text-white bg-green-500 rounded hover:bg-green-600 flex items-center ml-auto"
              onClick={handleSubmit}
            >
              Utwórz Subskrypcję
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default CreateSubscriptionPage;
