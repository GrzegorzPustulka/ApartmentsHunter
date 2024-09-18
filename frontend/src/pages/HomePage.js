import React, { useState } from 'react';
import { FaFilter, FaBell, FaUserFriends, FaMapMarkerAlt, FaRegBuilding, FaHome } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const HomePage = () => {
  const [search, setSearch] = useState('');

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Nawigacja */}
      <nav className="bg-white shadow-md fixed w-full z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <FaHome className="text-blue-600 text-2xl mr-2" />
              <span className="text-2xl font-bold text-gray-800">ApartmentsHunter</span>
            </div>
            <div className="flex space-x-4">
              <Link to="/register">
                <button className="bg-white text-blue-600 border border-blue-600 px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-50 transition duration-300">Zarejestruj się</button>
              </Link>
              <Link to="/login">
                <button className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700 transition duration-300">Zaloguj się</button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Główna sekcja */}
      <div className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <h1 className="text-5xl font-extrabold text-gray-800 text-center mb-6">Znajdź swoje wymarzone mieszkanie z ApartmentsHunter</h1>
        <p className="text-xl text-gray-600 text-center mb-12 max-w-3xl mx-auto">
          Odkryj idealne miejsce do życia, dopasowane do Twoich potrzeb. Nasz zaawansowany system wyszukiwania i powiadomień zapewnia, że nigdy nie przegapisz swojego idealnego mieszkania.
        </p>
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center bg-white rounded-lg p-1 shadow-lg">
            <input
              type="text"
              placeholder="Wpisz miasto, dzielnicę lub adres"
              className="w-full py-3 px-4 rounded-lg focus:outline-none"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition duration-300 ml-2">
              Szukaj
            </button>
          </div>
        </div>
      </div>

      {/* Sekcja funkcji */}
      <div className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-800 text-center mb-12">Dlaczego warto wybrać ApartmentsHunter?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <FeatureCard
              icon={<FaFilter className="text-blue-600 text-4xl mb-4" />}
              title="Zaawansowane Filtry"
              description="Dostosuj swoje wyszukiwanie dzięki naszym potężnym opcjom filtrowania, aby znaleźć mieszkania idealnie dopasowane do Twoich preferencji."
            />
            <FeatureCard
              icon={<FaBell className="text-blue-600 text-4xl mb-4" />}
              title="Natychmiastowe Powiadomienia"
              description="Bądź na bieżąco dzięki powiadomieniom w czasie rzeczywistym o nowych ofertach spełniających Twoje kryteria, aby nigdy nie przegapić okazji."
            />
            <FeatureCard
              icon={<FaUserFriends className="text-blue-600 text-4xl mb-4" />}
              title="Przyjazny Interfejs"
              description="Poruszaj się po naszej platformie z łatwością, dzięki intuicyjnemu designowi i płynnej obsłudze użytkownika."
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
              icon={<FaFilter className="text-5xl text-blue-600 mb-4" />}
              title="Wyszukaj"
              description="Wprowadź swoje preferencje i przeglądaj naszą obszerną bazę danych mieszkań."
              step="1"
            />
            <StepCard
              icon={<FaMapMarkerAlt className="text-5xl text-blue-600 mb-4" />}
              title="Przeglądaj"
              description="Przeglądaj oferty w wybranych lokalizacjach i porównuj je ze sobą."
              step="2"
            />
            <StepCard
              icon={<FaRegBuilding className="text-5xl text-blue-600 mb-4" />}
              title="Wybierz"
              description="Wybierz idealne mieszkanie, skontaktuj się z właścicielem i umów na oglądanie."
              step="3"
            />
          </div>
        </div>
      </div>

      {/* Sekcja CTA */}
      <div className="bg-blue-600 py-20">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-white mb-6">Gotowy znaleźć swoje idealne mieszkanie?</h2>
          <p className="text-xl text-white mb-8">Dołącz do tysięcy zadowolonych użytkowników, którzy znaleźli swoje idealne miejsce do życia z ApartmentsHunter.</p>
          <button className="bg-white text-blue-600 px-8 py-4 rounded-full text-lg font-semibold hover:bg-gray-100 transition duration-300">
            Rozpocznij wyszukiwanie
          </button>
        </div>
      </div>

      {/* Stopka */}
      <footer className="bg-gray-800 text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">ApartmentsHunter</h3>
              <p className="text-sm text-gray-400">Znajdowanie idealnego mieszkania stało się łatwe.</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Szybkie linki</h3>
              <ul className="space-y-2">
                <li><button className="text-sm text-gray-400 hover:text-white">Najnowsze oferty</button></li>
                <li><button className="text-sm text-gray-400 hover:text-white">Popularne lokalizacje</button></li>
                <li><button className="text-sm text-gray-400 hover:text-white">Dodaj ogłoszenie</button></li>
                <li><button className="text-sm text-gray-400 hover:text-white">Pomoc</button></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Informacje</h3>
              <ul className="space-y-2">
                <li><button className="text-sm text-gray-400 hover:text-white">O nas</button></li>
                <li><button className="text-sm text-gray-400 hover:text-white">Regulamin</button></li>
                <li><button className="text-sm text-gray-400 hover:text-white">Polityka prywatności</button></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Połącz się z nami</h3>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-white">facebook<i className="fab fa-facebook-f"></i></a>
                <a href="#" className="text-gray-400 hover:text-white">Twitter<i className="fab fa-twitter"></i></a>
                <a href="#" className="text-gray-400 hover:text-white">Instagram<i className="fab fa-instagram"></i></a>
                <a href="#" className="text-gray-400 hover:text-white">Linkedin<i className="fab fa-linkedin-in"></i></a>
              </div>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-700 text-center">
            <p className="text-sm text-gray-400">&copy; {new Date().getFullYear()} ApartmentsHunter. Wszelkie prawa zastrzeżone.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

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

export default HomePage;
