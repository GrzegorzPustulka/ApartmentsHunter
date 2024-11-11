import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/layout/Navbar';
import {
  FaFilter, FaBell, FaSearch, FaMapMarkerAlt, FaRegBuilding,
  FaUserPlus, FaHome, FaArrowRight, FaCheck, FaStar
} from 'react-icons/fa';

const HomePage = () => {
  const [scrolled, setScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      setIsVisible(window.scrollY > 300);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const FeatureCard = ({ icon, title, description }) => (
    <div className="group relative bg-gradient-to-br from-white to-blue-50/50 backdrop-blur-lg rounded-3xl p-8 hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-blue-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      <div className="absolute -right-20 -top-20 w-40 h-40 bg-blue-100 rounded-full opacity-0 group-hover:opacity-20 transform group-hover:scale-150 transition-all duration-700"></div>

      <div className="relative">
        <div className="flex justify-center mb-8">
          <div className="relative">
            <div className="absolute inset-0 bg-blue-100 rounded-2xl blur-lg opacity-40 group-hover:opacity-60 transition-opacity duration-300"></div>
            <div className="relative bg-gradient-to-br from-blue-50 to-white rounded-2xl p-4 group-hover:scale-110 transition-transform duration-300">
              {React.cloneElement(icon, { className: "w-8 h-8 text-blue-600" })}
            </div>
          </div>
        </div>
        <h3 className="text-xl font-bold text-gray-800 mb-4 group-hover:text-blue-600 transition-colors duration-300">{title}</h3>
        <p className="text-gray-600 leading-relaxed">{description}</p>
      </div>
    </div>
  );

  const StepCard = ({ icon, title, description, step }) => (
    <div className="group relative bg-white rounded-3xl p-8 hover:shadow-2xl transition-all duration-500">
      <div className="absolute -top-6 -left-6">
        <div className="relative">
          <div className="absolute inset-0 bg-blue-400 rounded-2xl blur-lg opacity-40"></div>
          <div className="relative bg-gradient-to-br from-blue-600 to-blue-500 text-white w-12 h-12 rounded-2xl flex items-center justify-center transform rotate-12 group-hover:rotate-0 transition-transform duration-500">
            {step}
          </div>
        </div>
      </div>

      <div className="relative">
        <div className="flex justify-center mb-8">
          <div className="relative">
            <div className="absolute inset-0 bg-blue-100 rounded-2xl blur-lg opacity-40 group-hover:opacity-60 transition-opacity duration-300"></div>
            <div className="relative bg-gradient-to-br from-blue-50 to-white rounded-2xl p-4 group-hover:scale-110 transition-transform duration-300">
              {React.cloneElement(icon, { className: "w-8 h-8 text-blue-600" })}
            </div>
          </div>
        </div>
        <h3 className="text-xl font-bold text-gray-800 mb-4 group-hover:text-blue-600 transition-colors duration-300">{title}</h3>
        <p className="text-gray-600 leading-relaxed">{description}</p>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-blue-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 rounded-full"></div>
    </div>
  );

  const StatCard = ({ value, label }) => (
    <div className="group relative bg-gradient-to-br from-white to-blue-50 rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500">
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-blue-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl"></div>
      <div className="relative">
        <div className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-blue-500 mb-2 transform group-hover:scale-110 transition-transform duration-300">
          {value}
        </div>
        <div className="text-sm text-gray-500 group-hover:text-gray-600 transition-colors duration-300">{label}</div>
      </div>
    </div>
  );

  return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
        <Navbar/>

        {/* Hero Section with Enhanced Animation */}
        <div className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
          {/* Animated Background Elements */}
          <div className="absolute inset-0 overflow-hidden">
            <div
                className="absolute w-[800px] h-[800px] -top-40 -left-40 bg-gradient-to-br from-blue-50 to-blue-100/50 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
            <div
                className="absolute w-[600px] h-[600px] -top-20 right-0 bg-gradient-to-bl from-blue-100 to-blue-50/50 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
            <div
                className="absolute w-[600px] h-[600px] top-1/2 left-1/4 bg-gradient-to-tr from-blue-50 to-blue-100/50 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div>
          </div>

          <div className="relative max-w-6xl mx-auto">
            {/* Enhanced Animated Logo */}
            <div className="flex justify-center mb-16">
              <div className="relative w-24 h-24">
                <div
                    className="absolute inset-0 bg-gradient-to-r from-blue-400 to-blue-300 rounded-full animate-ping opacity-20"></div>
                <div
                    className="absolute inset-0 bg-gradient-to-r from-blue-100 to-blue-50 rounded-full animate-pulse opacity-70"></div>
                <div className="relative bg-white rounded-full p-5 shadow-xl">
                  <div
                      className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-full p-3 transform hover:rotate-180 transition-transform duration-700">
                    <FaHome className="w-7 h-7 text-white"/>
                  </div>
                </div>
              </div>
            </div>

            {/* Enhanced Hero Content */}
            <div className="text-center mb-20">
              <h1 className="text-6xl font-extrabold text-gray-900 mb-8 leading-tight tracking-tight">
                Automatyczne wyszukiwanie mieszkań z{' '}
                <span className="relative inline-block">
                <span
                    className="relative z-10 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-blue-500">
                  ApartmentsHunter
                </span>
                <div className="absolute left-0 bottom-0 w-full h-3 bg-blue-100 transform -skew-x-12 -z-10"></div>
              </span>
              </h1>

              <p className="text-xl text-gray-600 mb-16 max-w-3xl mx-auto leading-relaxed">
                Nie trać czasu na ciągłe przeglądanie ofert. Ustaw swoje kryteria raz i otrzymuj
                powiadomienia o nowych mieszkaniach spełniających Twoje wymagania.
              </p>

              {/* Enhanced Stats Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-3xl mx-auto mb-16">
                <StatCard value="1000+" label="Użytkowników"/>
                <StatCard value="24/7" label="Monitoring"/>
                <StatCard value="100+" label="Ofert dziennie"/>
              </div>

              {/* Enhanced CTA Buttons */}
              <div className="max-w-xl mx-auto space-y-6">
                <Link
                    to="/register"
                    className="group flex items-center justify-center space-x-3 bg-gradient-to-r from-blue-600 to-blue-500 text-white px-8 py-4 rounded-full text-lg font-semibold hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 relative overflow-hidden"
                >
                  <div
                      className="absolute inset-0 bg-gradient-to-r from-blue-400 to-blue-300 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
                  <FaUserPlus className="text-xl group-hover:rotate-12 transition-transform duration-300"/>
                  <span>Załóż konto i stwórz pierwszą subskrypcję</span>
                  <FaArrowRight
                      className="text-xl opacity-0 group-hover:opacity-100 group-hover:translate-x-2 transition-all duration-300"/>
                </Link>

                <div className="flex space-x-4">
                  <Link
                      to="/search"
                      className="flex-1 group flex items-center justify-center space-x-2 bg-white text-blue-600 px-6 py-3 rounded-full hover:shadow-lg transition-all duration-300 border border-blue-100 hover:border-blue-200 relative overflow-hidden"
                  >
                    <div
                        className="absolute inset-0 bg-blue-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <FaSearch className="text-sm group-hover:scale-110 transition-transform duration-300"/>
                    <span className="font-medium relative z-10">Przeglądaj katalog</span>
                  </Link>

                  <Link
                      to="/subscriptions/create"
                      className="flex-1 group flex items-center justify-center space-x-2 bg-white text-blue-600 px-6 py-3 rounded-full hover:shadow-lg transition-all duration-300 border border-blue-100 hover:border-blue-200 relative overflow-hidden"
                  >
                    <div
                        className="absolute inset-0 bg-blue-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <FaBell className="text-sm group-hover:scale-110 transition-transform duration-300"/>
                    <span className="font-medium relative z-10">Stwórz subskrypcję</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Features Section with Glass Effect */}
        <div className="relative bg-gradient-to-b from-white to-gray-50 py-32">
          <div className="absolute inset-0">
            <div
                className="absolute inset-0 bg-grid-gray-100 bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]"></div>
          </div>

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-20">
              <h2 className="text-4xl font-bold text-gray-900 mb-6">
                Dlaczego warto wybrać{' '}
                <span className="relative inline-block">
                <span
                    className="relative z-10 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-blue-500">
                  ApartmentsHunter
                </span>
                <div className="absolute left-0 bottom-0 w-full h-3 bg-blue-100 transform -skew-x-12 -z-10"></div>
              </span>
                ?
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Oszczędzaj czas i nie przegap żadnej okazji dzięki naszym zaawansowanym funkcjom
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <FeatureCard
                  icon={<FaFilter/>}
                  title="Precyzyjne Subskrypcje"
                  description="Określ dokładne kryteria swojego wymarzonego mieszkania - lokalizację, cenę, metraż i wiele innych. System będzie szukał dla Ciebie 24/7."
              />
              <FeatureCard
                  icon={<FaBell/>}
                  title="Błyskawiczne Powiadomienia"
                  description="Otrzymuj natychmiastowe powiadomienia, gdy pojawi się mieszkanie spełniające Twoje kryteria. Bądź pierwszy i nie przegap okazji."
              />
              <FeatureCard
                  icon={<FaRegBuilding/>}
                  title="Aktualny Katalog"
                  description="Przeglądaj regularnie aktualizowaną bazę mieszkań z różnych źródeł. Wszystkie oferty w jednym miejscu, bez duplikatów."
              />
            </div>
          </div>
        </div>

        {/* How it Works Section with Enhanced Design */}
        <div className="relative bg-white py-32">
          <div className="absolute inset-0">
            <div
                className="absolute inset-0 bg-grid-gray-100 bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]"></div>
          </div>

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-20">
              <h2 className="text-4xl font-bold text-gray-900 mb-6">
                Jak to
                <span className="relative inline-block mx-2">
                <span
                    className="relative z-10 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-blue-500">
                  działa
                </span>
                <div className="absolute left-0 bottom-0 w-full h-3 bg-blue-100 transform -skew-x-12 -z-10"></div>
              </span>
                ?
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Trzy proste kroki do znalezienia wymarzonego mieszkania
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              <StepCard
                  icon={<FaUserPlus/>}
                  title="Załóż Konto"
                  description="Zarejestruj się za darmo i zyskaj dostęp do wszystkich funkcji systemu automatycznego wyszukiwania."
                  step="1"
              />
              <StepCard
                  icon={<FaBell/>}
                  title="Stwórz Subskrypcje"
                  description="Określ swoje preferencje i stwórz spersonalizowane subskrypcje. Możesz mieć ich kilka dla różnych kryteriów."
                  step="2"
              />
              <StepCard
                  icon={<FaMapMarkerAlt/>}
                  title="Odbieraj Powiadomienia"
                  description="Otrzymuj powiadomienia o nowych mieszkaniach i przeglądaj je w wygodnym katalogu. Wszystko w jednym miejscu."
                  step="3"
              />
            </div>
          </div>
        </div>

        {/* Enhanced Testimonials Section */}
        <div className="relative bg-gradient-to-b from-gray-50 to-white py-32">
          <div className="absolute inset-0 overflow-hidden">
            <div
                className="absolute w-[600px] h-[600px] -top-20 -left-20 bg-blue-50 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
            <div
                className="absolute w-[500px] h-[500px] top-1/2 right-0 bg-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
          </div>

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-20">
              <h2 className="text-4xl font-bold text-gray-900 mb-6">
                Co mówią
                <span className="relative inline-block mx-2">
              <span className="relative z-10 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-blue-500">
                nasi użytkownicy
              </span>
              <div className="absolute left-0 bottom-0 w-full h-3 bg-blue-100 transform -skew-x-12 -z-10"></div>
            </span>
                ?
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  name: "Marta Zawadzka",
                  text: "Szukałam mieszkania na Mokotowie z możliwością szybkiego najmu. Zamiast tracić czas na przeglądanie różnych portali, ustawiłam filtry i dostałam powiadomienie już drugiego dnia. Po obejrzeniu drugiego mieszkania znalazłam idealne!"
                },
                {
                  name: "Tomasz Witkowski",
                  text: "Jako student potrzebowałem czegoś blisko Politechniki w rozsądnej cenie. ApartmentsHunter naprawdę ułatwił sprawę - wszystkie oferty w jednym miejscu, bez duplikatów. Super sprawa!"
                },
                {
                  name: "Anna Michalska",
                  text: "Przeprowadzka do Warszawy była stresująca, ale dzięki aplikacji mogłam monitorować rynek jeszcze z Poznania. Zaoszczędziłam sporo czasu i nerwów."
                }
              ].map((testimonial, index) => (
                  <div key={index}
                       className="group relative bg-white rounded-3xl p-8 hover:shadow-xl transition-all duration-500">
                    <div className="absolute top-4 right-4">
                      <div className="flex space-x-1">
                        {[1, 2, 3, 4, 5].map((star) => (
                            <FaStar key={star} className="text-yellow-400 w-5 h-5"/>
                        ))}
                      </div>
                    </div>
                    <div className="mb-6">
                      <div className="flex items-center space-x-4">
                        <div
                            className="w-12 h-12 bg-gradient-to-br from-blue-100 to-blue-50 rounded-full flex items-center justify-center">
                          <FaUserPlus className="w-6 h-6 text-blue-600"/>
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900">{testimonial.name}</h3>
                        </div>
                      </div>
                    </div>
                    <p className="text-gray-600 leading-relaxed">
                      "{testimonial.text}"
                    </p>
                    <div
                        className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-blue-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 rounded-full"></div>
                  </div>
              ))}
            </div>
          </div>
        </div>

        {/* Enhanced Final CTA Section */}
        <div className="relative bg-gradient-to-r from-blue-600 to-blue-500 py-32">
          <div className="absolute inset-0 overflow-hidden">
            <div
                className="absolute w-[800px] h-[800px] -top-40 -left-40 bg-white rounded-full mix-blend-overlay filter blur-3xl opacity-10 animate-blob"></div>
            <div
                className="absolute w-[600px] h-[600px] top-1/2 right-0 bg-white rounded-full mix-blend-overlay filter blur-3xl opacity-10 animate-blob animation-delay-2000"></div>
          </div>

          <div className="relative max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
            <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-12 shadow-xl">
              <h2 className="text-4xl font-bold text-white mb-8">
                Przestań marnować czas na ciągłe odświeżanie ofert
              </h2>
              <p className="text-xl text-blue-50 mb-12">
                Dołącz do tysięcy użytkowników, którzy już korzystają z automatycznego wyszukiwania mieszkań.
              </p>
              <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-6">
                <Link
                    to="/register"
                    className="group inline-flex items-center justify-center space-x-2 bg-white text-blue-600 px-8 py-4 rounded-full text-lg font-semibold hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300"
                >
                  <FaUserPlus className="text-xl group-hover:rotate-12 transition-transform duration-300"/>
                  <span>Załóż darmowe konto</span>
                  <FaArrowRight
                      className="text-xl opacity-0 group-hover:opacity-100 group-hover:translate-x-2 transition-all duration-300"/>
                </Link>
                <Link
                    to="/subscriptions/create"
                    className="group inline-flex items-center justify-center space-x-2 bg-transparent text-white px-8 py-4 rounded-full text-lg font-semibold border-2 border-white hover:bg-white hover:text-blue-600 transition-all duration-300"
                >
                  <span>Stwórz subskrypcję</span>
                  <FaArrowRight
                      className="text-xl opacity-0 group-hover:opacity-100 group-hover:translate-x-2 transition-all duration-300"/>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Footer */}
        <footer className="relative bg-gray-900 pt-20 pb-12 overflow-hidden">
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-grid-gray-900/10 bg-center"></div>
          </div>

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
              <div>
                <div className="flex items-center space-x-3 mb-6">
                  <div
                      className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
                    <FaHome className="w-6 h-6 text-white"/>
                  </div>
                  <h3 className="text-white text-xl font-bold">ApartmentsHunter</h3>
                </div>
                <p className="text-gray-400 leading-relaxed mb-6">
                  Automatyczne wyszukiwanie i monitorowanie ofert mieszkań.
                </p>
                <div className="flex space-x-4">
                  {[FaHome, FaBell, FaSearch].map((Icon, index) => (
                      <a
                          key={index}
                          href="#"
                          className="group bg-gray-800 p-2 rounded-lg hover:bg-blue-600 transition-colors duration-300"
                      >
                        <Icon className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors duration-300"/>
                      </a>
                  ))}
                </div>
              </div>

              {[
                {
                  title: "Funkcje",
                  links: [
                    {label: "Wyszukiwarka", to: "/search"},
                    {label: "Subskrypcje", to: "/subscriptions"},
                    {label: "Nowa subskrypcja", to: "/subscriptions/create"}
                  ]
                },
                {
                  title: "Konto",
                  links: [
                    {label: "Logowanie", to: "/login"},
                    {label: "Rejestracja", to: "/register"}
                  ]
                },
                {
                  title: "Kontakt",
                  content: (
                      <div
                          className="bg-gray-800 rounded-2xl p-6 transform hover:-translate-y-1 transition-all duration-300">
                        <p className="text-gray-400 mb-4">
                          Masz pytania? Skontaktuj się z nami.
                        </p>
                        <Link
                            to="/contact"
                            className="inline-flex items-center justify-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-300"
                        >
                          <span>Napisz do nas</span>
                          <FaArrowRight className="w-4 h-4"/>
                        </Link>
                      </div>
                  )
                }
              ].map((section, index) => (
                  <div key={index}>
                    <h3 className="text-white text-lg font-semibold mb-6">{section.title}</h3>
                    {section.links ? (
                        <ul className="space-y-4">
                          {section.links.map((link, linkIndex) => (
                              <li key={linkIndex}>
                                <Link
                                    to={link.to}
                                    className="group flex items-center text-gray-400 hover:text-white transition-colors duration-300"
                                >
                                  <FaArrowRight
                                      className="w-4 h-4 mr-2 opacity-0 -ml-6 group-hover:opacity-100 group-hover:ml-0 transition-all duration-300"/>
                                  <span>{link.label}</span>
                                </Link>
                              </li>
                          ))}
                        </ul>
                    ) : section.content}
                  </div>
              ))}
            </div>

            {/* Footer Bottom */}
            <div className="border-t border-gray-800 mt-12 pt-8">
              <div className="flex flex-col md:flex-row justify-between items-center">
                <p className="text-gray-400 text-sm mb-4 md:mb-0">
                  © {new Date().getFullYear()} ApartmentsHunter. Wszystkie prawa zastrzeżone.
                </p>
                <div className="flex space-x-6">
                  {["Polityka prywatności", "Regulamin", "Polityka cookies"].map((item, index) => (
                      <Link
                          key={index}
                          to={`/${item.toLowerCase().replace(/\s+/g, '-')}`}
                          className="text-gray-400 hover:text-white text-sm transition-colors duration-300"
                      >
                        {item}
                      </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </footer>

        {/* Enhanced Scroll to Top Button */}
        {isVisible && (
            <button
                onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}
                className="fixed bottom-8 right-8 bg-gradient-to-r from-blue-600 to-blue-500 text-white p-4 rounded-full shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 group z-50"
            >
              <FaArrowRight
                  className="w-6 h-6 transform rotate-270 group-hover:-translate-y-1 transition-transform duration-300"/>
            </button>
        )}
      </div>
  );
};

export default HomePage;
