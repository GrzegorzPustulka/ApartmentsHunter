import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { requestPasswordReset } from '../utils/api';
import Navbar from '../components/layout/Navbar';

const AccountManagementPage = () => {
  const { token } = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handlePasswordResetRequest = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');

    try {
      await requestPasswordReset(token, email);
      setMessage('Jeśli konto istnieje, wiadomość z linkiem do resetowania hasła została wysłana na podany adres email.');
    } catch (err) {
      setError('Wystąpił błąd podczas wysyłania prośby o reset hasła. Spróbuj ponownie później.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">Zarządzanie Kontem</h1>

          {message && <div className="mb-4 p-2 bg-green-100 text-green-700 rounded">{message}</div>}
          {error && <div className="mb-4 p-2 bg-red-100 text-red-700 rounded">{error}</div>}

          <div>
            <h2 className="text-xl font-semibold mb-4">Resetuj hasło</h2>
            <p className="mb-4 text-sm text-gray-600">
              Aby zresetować hasło, wprowadź swój adres email poniżej. Wyślemy Ci link umożliwiający zmianę hasła.
            </p>
            <form onSubmit={handlePasswordResetRequest} className="space-y-6">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">Adres email</label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              </div>
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Wyślij link do resetowania hasła
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountManagementPage;
