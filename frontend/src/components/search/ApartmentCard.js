import React, { useState } from 'react';

const formatDate = (dateString) => {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('pl-PL', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit'
  }).format(date);
};

const ApartmentCard = ({ apartment }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const nextImage = (e) => {
    e.stopPropagation();
    setCurrentImageIndex((prevIndex) =>
      prevIndex === apartment.images_url.length - 1 ? 0 : prevIndex + 1
    );
  };

  const previousImage = (e) => {
    e.stopPropagation();
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? apartment.images_url.length - 1 : prevIndex - 1
    );
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col h-full">
      <div className="relative h-48">
        {apartment.images_url && apartment.images_url.length > 0 && (
          <>
            <img
              src={apartment.images_url[currentImageIndex]}
              alt={`${apartment.title} - zdjęcie ${currentImageIndex + 1}`}
              className="w-full h-48 object-cover"
            />
            {apartment.images_url.length > 1 && (
              <>
                <button
                  onClick={previousImage}
                  className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white rounded-full p-2 hover:bg-opacity-75 transition-all"
                >
                  &#x2190;
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white rounded-full p-2 hover:bg-opacity-75 transition-all"
                >
                  &#x2192;
                </button>
                <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-2">
                  {apartment.images_url.map((_, index) => (
                    <button
                      key={index}
                      onClick={(e) => {
                        e.stopPropagation();
                        setCurrentImageIndex(index);
                      }}
                      className={`w-2 h-2 rounded-full ${
                        index === currentImageIndex ? 'bg-white' : 'bg-white bg-opacity-50'
                      }`}
                    />
                  ))}
                </div>
              </>
            )}
          </>
        )}
      </div>

      <div className="p-4 flex-grow flex flex-col">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-semibold text-gray-900 flex-grow">
            {apartment.title}
          </h3>
          <span className="text-sm text-gray-500 whitespace-nowrap ml-2">
            {formatDate(apartment.date)}
          </span>
        </div>

        <p className="text-gray-600 mb-2">{apartment.city}, {apartment.district}</p>

        <div className="flex justify-between items-center mb-2">
          <span className="text-lg font-bold text-blue-600">{apartment.price} PLN</span>
          <span className="text-sm text-gray-500">{apartment.area} m²</span>
        </div>

        <div className="flex flex-wrap gap-2 mb-4">
          {apartment.building_type && (
            <span className="px-2 py-1 bg-gray-100 text-sm rounded-full">
              {apartment.building_type}
            </span>
          )}
          <span className="px-2 py-1 bg-gray-100 text-sm rounded-full">
            {apartment.number_of_rooms}
          </span>
          {apartment.bedrooms && (
            <span className="px-2 py-1 bg-gray-100 text-sm rounded-full">
              {apartment.bedrooms}
            </span>
          )}
          {apartment.is_furnished && (
            <span className="px-2 py-1 bg-gray-100 text-sm rounded-full">
              Umeblowane
            </span>
          )}
          {apartment.is_private_offer && (
            <span className="px-2 py-1 bg-gray-100 text-sm rounded-full">
              Oferta prywatna
            </span>
          )}
          {apartment.standard && (
            <span className="px-2 py-1 bg-gray-100 text-sm rounded-full">
              Standard: {apartment.standard}
            </span>
          )}
          {apartment.deposit !== null && apartment.deposit !== undefined && (
            <span className="px-2 py-1 bg-gray-100 text-sm rounded-full">
              Kaucja: {apartment.deposit} PLN
            </span>
          )}
        </div>

        <div className="mt-auto">
          <a
            href={apartment.link}
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full text-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Zobacz ofertę
          </a>
        </div>
      </div>
    </div>
  );
};

export default ApartmentCard;
