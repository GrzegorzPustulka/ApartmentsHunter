import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/layout/Navbar';
import { FaFilter, FaBell, FaSearch, FaMapMarkerAlt, FaRegBuilding, FaUserPlus, FaHome } from 'react-icons/fa';

const HomePage = () => {
  const FeatureCard = ({ icon, title, description }) => (
    <div className="bg-gray-100 rounded-lg p-6 text-center hover:shadow-lg transition duration-300">
      <div className="flex justify-center">{icon}</div>
      <h3 className="text-xl font-semibold text-gray-800 mb-4">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );

  const StepCard = ({ icon, title, description, step }) => (
    <div className="relative bg-white rounded-lg p-6 text-center hover:shadow-lg transition duration-300">
      <div className="absolute top-0 left-0 bg-blue-600 text-white w-8 h-8 rounded-full flex items-center justify-center -mt-4 -ml-4">
        {step}
      </div>
      <div className="flex justify-center">{icon}</div>
      <h3 className="text-xl font-semibold text-gray-800 mb-4">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />

      {/* Główna sekcja */}
<div className="relative pt-24 pb-16 px-4 sm:px-6 lg:px-8">
  {/* Tło z gradientem i animowanymi elementami */}
  <div className="absolute inset-0 overflow-hidden">
    <div className="absolute left-0 right-0 top-0 h-px bg-gradient-to-r from-transparent via-blue-200 to-transparent"></div>
    <div className="absolute w-96 h-96 -top-10 -left-10 bg-blue-50 rounded-full mix-blend-multiply filter blur-xl opacity-50 animate-blob"></div>
    <div className="absolute w-96 h-96 -top-10 -right-10 bg-blue-100 rounded-full mix-blend-multiply filter blur-xl opacity-50 animate-blob animation-delay-2000"></div>
    <div className="absolute w-96 h-96 top-20 left-1/3 bg-blue-50 rounded-full mix-blend-multiply filter blur-xl opacity-50 animate-blob animation-delay-4000"></div>
  </div>

  <div className="relative max-w-6xl mx-auto">
    {/* Logo z okręgiem - poprawione pozycjonowanie */}
    <div className="flex justify-center mb-8">
      <div className="relative w-16 h-16">
        <div className="absolute inset-0 bg-blue-100 rounded-full animate-ping opacity-20"></div>
        <div className="relative bg-white rounded-full p-3 shadow-lg">
          <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-full p-2">
            <FaHome className="w-6 h-6 text-white" />
          </div>
        </div>
      </div>
    </div>

          {/* Treść */}
    <div className="bg-white/70 backdrop-blur-md rounded-3xl p-8 shadow-xl"><h1
        className="text-4xl font-bold text-gray-800 text-center mb-4">
              Automatyczne wyszukiwanie mieszkań z{' '}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-blue-500">
                ApartmentsHunter
              </span>
            </h1>
            <p className="text-lg text-gray-600 text-center mb-10 max-w-2xl mx-auto">
              Nie trać czasu na ciągłe przeglądanie ofert. Ustaw swoje kryteria raz i otrzymuj
              powiadomienia o nowych mieszkaniach spełniających Twoje wymagania.
            </p>

            {/* Statystyki */}
            <div className="grid grid-cols-3 gap-8 mb-10 max-w-3xl mx-auto">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600 mb-1">1000+</div>
                <div className="text-sm text-gray-500">Użytkowników</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600 mb-1">24/7</div>
                <div className="text-sm text-gray-500">Monitoring</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600 mb-1">100+</div>
                <div className="text-sm text-gray-500">Ofert dziennie</div>
              </div>
            </div>

            {/* Przyciski */}
            <div className="max-w-lg mx-auto space-y-4">
              <Link
                to="/register"
                className="group w-full flex items-center justify-center space-x-2 bg-gradient-to-r from-blue-600 to-blue-500 text-white px-6 py-3 rounded-xl hover:from-blue-700 hover:to-blue-600 transition-all duration-300 shadow-md transform hover:-translate-y-0.5"
              >
                <FaUserPlus className="text-xl group-hover:scale-110 transition-transform duration-300" />
                <span className="font-medium">Załóż konto i stwórz pierwszą subskrypcję</span>
              </Link>
              <div className="flex space-x-4">
                <Link
                  to="/search"
                  className="flex-1 flex items-center justify-center space-x-2 bg-white text-blue-600 px-4 py-2.5 rounded-xl hover:bg-blue-50 transition-all duration-300 shadow-sm border border-blue-200 hover:border-blue-300 transform hover:-translate-y-0.5"
                >
                  <FaSearch className="text-sm" />
                  <span className="text-sm font-medium">Przeglądaj katalog</span>
                </Link>
                <Link
                  to="/subscriptions/create"
                  className="flex-1 flex items-center justify-center space-x-2 bg-white text-blue-600 px-4 py-2.5 rounded-xl hover:bg-blue-50 transition-all duration-300 shadow-sm border border-blue-200 hover:border-blue-300 transform hover:-translate-y-0.5"
                >
                  <FaBell className="text-sm" />
                  <span className="text-sm font-medium">Stwórz subskrypcję</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Sekcja funkcji */}
      <div className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-800 text-center mb-12">
            Dlaczego warto wybrać ApartmentsHunter?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <FeatureCard
              icon={<FaFilter className="text-blue-600 text-4xl mb-4" />}
              title="Precyzyjne Subskrypcje"
              description="Określ dokładne kryteria swojego wymarzonego mieszkania - lokalizację, cenę, metraż i wiele innych. System będzie szukał dla Ciebie 24/7."
            />
            <FeatureCard
              icon={<FaBell className="text-blue-600 text-4xl mb-4" />}
              title="Błyskawiczne Powiadomienia"
              description="Otrzymuj natychmiastowe powiadomienia, gdy pojawi się mieszkanie spełniające Twoje kryteria. Bądź pierwszy i nie przegap okazji."
            />
            <FeatureCard
              icon={<FaRegBuilding className="text-blue-600 text-4xl mb-4" />}
              title="Aktualny Katalog"
              description="Przeglądaj regularnie aktualizowaną bazę mieszkań z różnych źródeł. Wszystkie oferty w jednym miejscu, bez duplikatów."
            />
          </div>
        </div>
      </div>

      {/* Sekcja "Jak to działa" */}
      <div className="bg-gray-100 py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-800 text-center mb-12">Jak to działa</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <StepCard
              icon={<FaUserPlus className="text-5xl text-blue-600 mb-4" />}
              title="Załóż Konto"
              description="Zarejestruj się za darmo i zyskaj dostęp do wszystkich funkcji systemu automatycznego wyszukiwania."
              step="1"
            />
            <StepCard
              icon={<FaBell className="text-5xl text-blue-600 mb-4" />}
              title="Stwórz Subskrypcje"
              description="Określ swoje preferencje i stwórz spersonalizowane subskrypcje. Możesz mieć ich kilka dla różnych kryteriów."
              step="2"
            />
            <StepCard
              icon={<FaMapMarkerAlt className="text-5xl text-blue-600 mb-4" />}
              title="Odbieraj Powiadomienia"
              description="Otrzymuj powiadomienia o nowych mieszkaniach i przeglądaj je w wygodnym katalogu. Wszystko w jednym miejscu."
              step="3"
            />
          </div>
        </div>
      </div>

      {/* Sekcja CTA */}
      <div className="bg-blue-600 py-20">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-white mb-6">
            Przestań marnować czas na ciągłe odświeżanie ofert
          </h2>
          <p className="text-xl text-white mb-8">
            Dołącz do tysięcy użytkowników, którzy już korzystają z automatycznego wyszukiwania mieszkań.
          </p>
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <Link
              to="/register"
              className="inline-block bg-white text-blue-600 px-8 py-4 rounded-full text-lg font-semibold hover:bg-gray-100 transition duration-300"
            >
              Załóż darmowe konto
            </Link>
            <Link
              to="/subscriptions/create"
              className="inline-block bg-transparent text-white px-8 py-4 rounded-full text-lg font-semibold border-2 border-white hover:bg-white hover:text-blue-600 transition duration-300"
            >
              Stwórz subskrypcję
            </Link>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-800 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-white text-lg font-semibold mb-4">ApartmentsHunter</h3>
              <p className="text-gray-400 text-sm">
                Automatyczne wyszukiwanie i monitorowanie ofert mieszkań.
              </p>
            </div>
            <div>
              <h3 className="text-white text-lg font-semibold mb-4">Funkcje</h3>
              <ul className="space-y-2">
                <li><Link to="/search" className="text-gray-400 hover:text-white">Wyszukiwarka</Link></li>
                <li><Link to="/subscriptions" className="text-gray-400 hover:text-white">Subskrypcje</Link></li>
                <li><Link to="/subscriptions/create" className="text-gray-400 hover:text-white">Nowa subskrypcja</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-white text-lg font-semibold mb-4">Konto</h3>
              <ul className="space-y-2">
                <li><Link to="/login" className="text-gray-400 hover:text-white">Logowanie</Link></li>
                <li><Link to="/register" className="text-gray-400 hover:text-white">Rejestracja</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-white text-lg font-semibold mb-4">Kontakt</h3>
              <p className="text-gray-400 text-sm">
                Masz pytania? Skontaktuj się z nami.
              </p>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-8 text-center">
            <p className="text-gray-400 text-sm">
              © {new Date().getFullYear()} ApartmentsHunter. Wszystkie prawa zastrzeżone.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
