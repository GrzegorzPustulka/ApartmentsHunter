import { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

function LoginPage() {
  const { login } = useContext(AuthContext);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch('http://127.0.0.1:8000/users/access-token/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({
          username: username,
          password: password,
        }),
      });

    const data = await response.json();
    if (response.ok) {
      login(data.token);
      navigate('/subscriptions');
    } else {
      console.log(username, password)
      alert('Błędne dane logowania');
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <form onSubmit={handleSubmit} className="p-6 bg-white rounded shadow-md">
        <h2 className="mb-4 text-xl font-bold text-center">Logowanie</h2>
        <input
          type="email"
          placeholder="Email"
          className="w-full p-2 mb-4 border rounded"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Hasło"
          className="w-full p-2 mb-4 border rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="w-full p-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-600">
          Zaloguj się
        </button>
        <p className="mt-4 text-center">
          Nie masz konta?{' '}
          <a href="/register" className="text-blue-500 hover:underline">
            Zarejestruj się
          </a>
        </p>
      </form>
    </div>
  );
}

export default LoginPage;
