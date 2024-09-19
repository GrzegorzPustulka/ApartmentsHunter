// src/components/subscriptions/SubscriptionCard.js
import React from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';

const SubscriptionCard = ({ subscription, onEdit, onDelete }) => {
  return (
    <div className="bg-white overflow-hidden shadow rounded-lg">
      <div className="px-4 py-5 sm:p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-2">Subskrypcja</h3>
        <p className="text-sm text-gray-600">Miasto: {subscription.city}</p>
        <p className="text-sm text-gray-600">
          Dzielnice: {subscription.district ? subscription.district.join(', ') : 'Brak dzielnic'}
        </p>
        <p className="text-sm text-gray-600">Cena: {subscription.minimum_price} - {subscription.maximum_price} PLN</p>
        <p className="text-sm text-gray-600">Powierzchnia: {subscription.minimum_area} - {subscription.maximum_area} m²</p>
        <p className="text-sm text-gray-600">Maksymalna kaucja: {subscription.deposit ? subscription.deposit + ' PLN' : 'Brak'}</p>
        <p className="text-sm text-gray-600">Typ budynku: {subscription.building_type ? subscription.building_type.join(', ') : 'Brak'}</p>
        <p className="text-sm text-gray-600">Liczba pokoi: {subscription.number_of_rooms ? subscription.number_of_rooms.join(', ') : 'Brak'}</p>
        <p className="text-sm text-gray-600">Umeblowanie: {subscription.is_furnished ? 'Tak' : 'Nie'}</p>
        <p className="text-sm text-gray-600">Oferta prywatna: {subscription.is_private_offer ? 'Tak' : 'Nie'}</p>
        <p className="text-sm text-gray-600">Liczba sypialni: {subscription.bedrooms ? subscription.bedrooms.join(', ') : 'Brak'}</p>
        <p className="text-sm text-gray-600">Standard: {subscription.standard ? subscription.standard.join(', ') : 'Brak'}</p>
      </div>
      <div className="px-4 py-4 sm:px-6 bg-gray-50 flex justify-end space-x-2">
        <button onClick={onEdit} className="text-blue-600 hover:text-blue-800">
          <FaEdit />
        </button>
        <button onClick={onDelete} className="text-red-600 hover:text-red-800">
          <FaTrash />
        </button>
      </div>
    </div>
  );
};

export default SubscriptionCard;
