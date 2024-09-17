import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import SubscriptionsPage from './pages/SubscriptionsPage';
import CreateSubscriptionPage from './pages/CreateSubscriptionPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/subscriptions" element={<SubscriptionsPage />} />
        <Route path="/create-subscription" element={<CreateSubscriptionPage />} />
      </Routes>
    </Router>
  );
}

export default App;
