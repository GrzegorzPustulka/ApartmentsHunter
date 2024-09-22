import React, { useState, useContext, useEffect } from 'react';
import { AuthContext } from '../context/AuthContext';
import { requestPasswordReset, getUserInfo } from '../utils/api';
import Navbar from '../components/layout/Navbar';

const AccountManagementPage = () => {
  const { token } = useContext(AuthContext);
  const [userInfo, setUserInfo] = useState(null);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const info = await getUserInfo(token);
        setUserInfo(info);
      } catch (err) {
        setError('Nie udało się pobrać informacji o użytkowniku');
      }
    };

    fetchUserInfo();
  }, [token]);

  const handlePasswordResetRequest = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');
    setIsLoading(true);

    try {
      await requestPasswordReset(token, userInfo.email);
      setMessage('Link do resetowania hasła został wysłany na Twój adres email.');
    } catch (err) {
      setError(err.message || 'Wystąpił błąd podczas wysyłania prośby o reset hasła. Spróbuj ponownie później.');
    } finally {
      setIsLoading(false);
    }
  };

  if (!userInfo) {
    return <div>Ładowanie...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="bg-white shadow overflow-hidden sm:rounded-lg">
            <div className="px-4 py-5 sm:px-6">
              <h1 className="text-2xl font-bold text-gray-900">Zarządzanie Kontem</h1>
              <p className="mt-1 max-w-2xl text-sm text-gray-500">Informacje o koncie i opcje zarządzania</p>
            </div>
            <div className="border-t border-gray-200">
              <dl>
                <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">ID użytkownika</dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{userInfo.id}</dd>
                </div>
                <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">Adres email</dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{userInfo.email}</dd>
                </div>
                <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">Limit subskrypcji</dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{userInfo.subscription_limit}</dd>
                </div>
                <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">Reset hasła</dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    <button
                      onClick={handlePasswordResetRequest}
                      disabled={isLoading}
                      className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      {isLoading ? 'Wysyłanie...' : 'Wyślij link do resetowania hasła'}
                    </button>
                    {message && <p className="mt-2 text-sm text-green-600">{message}</p>}
                    {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
                  </dd>
                </div>
              </dl>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountManagementPage;
