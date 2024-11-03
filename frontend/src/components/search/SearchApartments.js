// src/components/search/SearchApartments.js
import React, { useState, useEffect } from 'react';
import { FaSearch, FaFilter } from 'react-icons/fa';
import ApartmentCard from './ApartmentCard';

const SearchApartments = () => {
  const [filters, setFilters] = useState({
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
  });

  const [showFilters, setShowFilters] = useState(false);
  const [apartments, setApartments] = useState([]);
  const [loading, setLoading] = useState(true);

  const API_URL = 'http://127.0.0.1:8080/api/v1/apartments';

  useEffect(() => {
    fetchAllApartments();
  }, []);

  const fetchAllApartments = async () => {
    setLoading(true);
    try {
      const response = await fetch(API_URL, {
        headers: {
          'Accept': 'application/json',
        }
      });

      if (!response.ok) {
        if (response.status === 404) {
          setApartments([]);
          return;
        }
        throw new Error('Nie udało się pobrać mieszkań');
      }
      const data = await response.json();
      setApartments(Array.isArray(data) ? data : [data]);
    } catch (error) {
      console.error('Błąd podczas pobierania mieszkań:', error);
      setApartments([]);
    } finally {
      setLoading(false);
    }
  };

  const districtOptions = {
    Kraków: ["Stare Miasto", "Grzegórzki", "Prądnik Czerwony", "Prądnik Biały", "Krowodrza",
             "Bronowice", "Zwierzyniec", "Dębniki", "Łagiewniki-Borek Fałęcki", "Swoszowice",
             "Podgórze Duchackie", "Bieżanów-Prokocim", "Podgórze", "Czyżyny", "Mistrzejowice",
             "Bieńczyce", "Wzgórza Krzesławickie", "Nowa Huta"],
  };

  const buildingTypes = ["Blok", "Kamienica", "Dom wolnostojący", "Szeregowiec", "Apartamentowiec", "Loft", "Pozostałe"];
  const roomOptions = ["1 pokój", "2 pokoje", "3 pokoje", "4 i więcej"];
  const standardOptions = ["niski", "normalny", "wysoki"];
  const bedroomOptions = ["1 sypialnia", "2 sypialnie", "3 sypialnie", "4 i więcej"];

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleArrayInputChange = (name, value) => {
    setFilters(prev => ({
      ...prev,
      [name]: prev[name].includes(value)
        ? prev[name].filter(item => item !== value)
        : [...prev[name], value]
    }));
  };

  const searchApartments = async () => {
    setLoading(true);
    try {
      const cleanFilters = Object.fromEntries(
        Object.entries(filters).filter(([_, value]) => {
          if (Array.isArray(value)) {
            return value.length > 0;
          }
          return value !== '' && value !== null;
        })
      );

      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(cleanFilters)
      });

      if (!response.ok) {
        if (response.status === 404) {
          setApartments([]);
          return;
        }
        throw new Error('Nie udało się wyszukać mieszkań');
      }

      const data = await response.json();
      setApartments(Array.isArray(data) ? data : [data]);
    } catch (error) {
      console.error('Błąd podczas wyszukiwania:', error);
      setApartments([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold text-gray-900">Wyszukiwarka mieszkań</h2>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            <FaFilter className="mr-2" />
            {showFilters ? 'Ukryj filtry' : 'Pokaż filtry'}
          </button>
        </div>

        {showFilters && (
          <div className="bg-white p-6 rounded-lg shadow-md mb-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Miasto */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Miasto</label>
                <select
                  name="city"
                  value={filters.city}
                  onChange={handleInputChange}
                  className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                >
                  <option value="">Wybierz miasto</option>
                  <option value="Kraków">Kraków</option>
                </select>
              </div>

              {/* Dzielnice */}
              {filters.city && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Dzielnice</label>
                  <div className="space-y-2 max-h-48 overflow-y-auto">
                    {districtOptions[filters.city]?.map(district => (
                      <label key={district} className="flex items-center">
                        <input
                          type="checkbox"
                          checked={filters.district.includes(district)}
                          onChange={() => handleArrayInputChange('district', district)}
                          className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                        />
                        <span className="ml-2 text-sm text-gray-600">{district}</span>
                      </label>
                    ))}
                  </div>
                </div>
              )}

              {/* Cena */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Cena (PLN)</label>
                <div className="flex space-x-2">
                  <input
                    type="number"
                    name="minimum_price"
                    value={filters.minimum_price}
                    onChange={handleInputChange}
                    placeholder="Od"
                    className="w-1/2 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                  <input
                    type="number"
                    name="maximum_price"
                    value={filters.maximum_price}
                    onChange={handleInputChange}
                    placeholder="Do"
                    className="w-1/2 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
              </div>

              {/* Powierzchnia */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Powierzchnia (m²)</label>
                <div className="flex space-x-2">
                  <input
                    type="number"
                    name="minimum_area"
                    value={filters.minimum_area}
                    onChange={handleInputChange}
                    placeholder="Od"
                    className="w-1/2 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                  <input
                    type="number"
                    name="maximum_area"
                    value={filters.maximum_area}
                    onChange={handleInputChange}
                    placeholder="Do"
                    className="w-1/2 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
              </div>

              {/* Typ budynku */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Typ budynku</label>
                <div className="space-y-2">
                  {buildingTypes.map(type => (
                    <label key={type} className="flex items-center">
                      <input
                        type="checkbox"
                        checked={filters.building_type.includes(type)}
                        onChange={() => handleArrayInputChange('building_type', type)}
                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                      <span className="ml-2 text-sm text-gray-600">{type}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Liczba pokoi */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Liczba pokoi</label>
                <div className="space-y-2">
                  {roomOptions.map(room => (
                    <label key={room} className="flex items-center">
                      <input
                        type="checkbox"
                        checked={filters.number_of_rooms.includes(room)}
                        onChange={() => handleArrayInputChange('number_of_rooms', room)}
                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                      <span className="ml-2 text-sm text-gray-600">{room}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Sypialnie */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Sypialnie</label>
                <div className="space-y-2">
                  {bedroomOptions.map(bedroom => (
                    <label key={bedroom} className="flex items-center">
                      <input
                        type="checkbox"
                        checked={filters.bedrooms.includes(bedroom)}
                        onChange={() => handleArrayInputChange('bedrooms', bedroom)}
                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                      <span className="ml-2 text-sm text-gray-600">{bedroom}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Standard */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Standard</label>
                <div className="space-y-2">
                  {standardOptions.map(standard => (
                    <label key={standard} className="flex items-center">
                      <input
                        type="checkbox"
                        checked={filters.standard.includes(standard)}
                        onChange={() => handleArrayInputChange('standard', standard)}
                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                      <span className="ml-2 text-sm text-gray-600">{standard}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Kaucja */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Maksymalna kaucja (PLN)</label>
                <input
                  type="number"
                  name="deposit"
                  value={filters.deposit || ''}
                  onChange={handleInputChange}
                  placeholder="Maksymalna kaucja"
                  className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>

              {/* Dodatkowe opcje */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Dodatkowe opcje</label>
                <div className="space-y-2">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      name="is_furnished"
                      checked={filters.is_furnished || false}
                      onChange={handleInputChange}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="ml-2 text-sm text-gray-600">Umeblowane</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      name="is_private_offer"
                      checked={filters.is_private_offer || false}
                      onChange={handleInputChange}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="ml-2 text-sm text-gray-600">Oferta prywatna</span>
                  </label>
                </div>
              </div>
            </div>

            <div className="mt-6 flex justify-end">
              <button
                onClick={searchApartments}
                disabled={loading}
                className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
              >
                <FaSearch className="mr-2" />
                {loading ? 'Wyszukiwanie...' : 'Wyszukaj'}
              </button>
            </div>
          </div>
        )}
      </div>

      {loading && (
        <div className="text-center py-12">
          <p className="text-gray-600">Ładowanie...</p>
        </div>
      )}

      {/* Wyniki wyszukiwania */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {apartments.map(apartment => (
          <ApartmentCard key={apartment.id} apartment={apartment} />
        ))}
      </div>

      {!loading && apartments.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-600">Brak wyników wyszukiwania</p>
        </div>
      )}
    </div>
  );
};

export default SearchApartments;