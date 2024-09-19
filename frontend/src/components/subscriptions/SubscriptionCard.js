// src/components/subscriptions/SubscriptionCard.js
import React from 'react';
import { FaEdit, FaTrash, FaPause, FaPlay } from 'react-icons/fa';

const SubscriptionCard = ({ subscription, onEdit, onDelete, onToggleStatus }) => {
  return (
    <div className={`bg-white overflow-hidden shadow rounded-lg ${subscription.is_paused ? 'opacity-70' : ''}`}>
      <div className="px-4 py-5 sm:p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-medium text-gray-900">Subskrypcja</h3>
          {subscription.is_paused && (
            <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
              ZATRZYMANA
            </span>
          )}
        </div>
        <div className="space-y-2">
          <p className="text-sm text-gray-600"><span className="font-medium">Miasto:</span> {subscription.city}</p>
          <p className="text-sm text-gray-600"><span className="font-medium">Dzielnice:</span> {subscription.district ? subscription.district.join(', ') : 'Brak'}</p>
          <p className="text-sm text-gray-600"><span className="font-medium">Typ budynku:</span> {subscription.building_type ? subscription.building_type.join(', ') : 'Brak'}</p>
          <p className="text-sm text-gray-600"><span className="font-medium">Liczba pokoi:</span> {subscription.number_of_rooms ? subscription.number_of_rooms.join(', ') : 'Brak'}</p>
          <p className="text-sm text-gray-600"><span className="font-medium">Standard:</span> {subscription.standard ? subscription.standard.join(', ') : 'Brak'}</p>
          <p className="text-sm text-gray-600"><span className="font-medium">Cena:</span> {subscription.minimum_price} - {subscription.maximum_price} PLN</p>
          <p className="text-sm text-gray-600"><span className="font-medium">Powierzchnia:</span> {subscription.minimum_area} - {subscription.maximum_area} m²</p>
          <p className="text-sm text-gray-600"><span className="font-medium">Maksymalna kaucja:</span> {subscription.deposit ? `${subscription.deposit} PLN` : 'Brak'}</p>
          <p className="text-sm text-gray-600"><span className="font-medium">Umeblowanie:</span> {subscription.is_furnished ? 'Tak' : 'Nie'}</p>
          <p className="text-sm text-gray-600"><span className="font-medium">Oferta prywatna:</span> {subscription.is_private_offer ? 'Tak' : 'Nie'}</p>
          <p className="text-sm text-gray-600"><span className="font-medium">Liczba sypialni:</span> {subscription.bedrooms ? subscription.bedrooms.join(', ') : 'Brak'}</p>
        </div>
      </div>
      <div className="px-4 py-4 sm:px-6 bg-gray-50 flex justify-end space-x-2">
        <button
          onClick={() => onToggleStatus(subscription.id, !subscription.is_paused)}
          className="text-blue-600 hover:text-blue-800 transition-colors duration-200"
          title={subscription.is_paused ? "Wznów subskrypcję" : "Zatrzymaj subskrypcję"}
        >
          {subscription.is_paused ? <FaPlay /> : <FaPause />}
        </button>
        <button
          onClick={() => onEdit(subscription.id)}
          className="text-blue-600 hover:text-blue-800 transition-colors duration-200"
          title="Edytuj subskrypcję"
        >
          <FaEdit />
        </button>
        <button
          onClick={() => onDelete(subscription.id)}
          className="text-red-600 hover:text-red-800 transition-colors duration-200"
          title="Usuń subskrypcję"
        >
          <FaTrash />
        </button>
      </div>
    </div>
  );
};

export default SubscriptionCard;
