import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError('Wszystkie pola są wymagane');
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch('http://localhost:5000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok && data.token) {
        sessionStorage.setItem('authToken', data.token);
        alert('Udane logowanie');
        navigate('/'); // Przekierowanie na stronę główną po zalogowaniu
      } else {
        setError(data.message || 'Nieprawidłowe dane logowania');
      }
    } catch (err) {
      console.error('Błąd połączenia z serwerem:', err);
      setError('Błąd połączenia z serwerem');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      style={{
        minHeight: '50vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '200vh',
        padding: '20px',
      }}
    >
      <div
        style={{
          width: '25%',
          backgroundColor: 'white',
          borderRadius: '10px',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
          padding: '20px',
        }}
      >
        <h2
          style={{
            textAlign: 'center',
            fontSize: '24px',
            fontWeight: 'bold',
            color: '#333',
            marginBottom: '20px',
          }}
        >
          Zaloguj się
        </h2>
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '15px' }}>
            <input
              type="email"
              placeholder="Adres email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{
                width: '95%',
                padding: '10px',
                border: '1px solid #ddd',
                borderRadius: '5px',
                fontSize: '16px',
              }}
              required
            />
          </div>
          <div style={{ marginBottom: '15px' }}>
            <input
              type="password"
              placeholder="Hasło"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{
                width: '95%',
                padding: '10px',
                border: '1px solid #ddd',
                borderRadius: '5px',
                fontSize: '16px',
              }}
              required
            />
          </div>
          {error && (
            <p style={{ color: 'red', fontSize: '14px', marginBottom: '15px' }}>
              {error}
            </p>
          )}
          <button
            type="submit"
            disabled={isLoading}
            style={{
              width: '100%',
              padding: '10px',
              backgroundColor: '#FF8C00',
              color: 'white',
              fontWeight: 'bold',
              borderRadius: '5px',
              border: 'none',
              fontSize: '16px',
              cursor: isLoading ? 'not-allowed' : 'pointer',
              opacity: isLoading ? 0.7 : 1,
            }}
          >
            {isLoading ? 'Logowanie...' : 'Zaloguj się'}
          </button>
        </form>
        <p
          style={{
            textAlign: 'center',
            fontSize: '14px',
            color: '#555',
            marginTop: '15px',
          }}
        >
          Nie masz konta?{' '}
          <a
            href="/register"
            style={{
              color: '#FF8C00',
              textDecoration: 'none',
              fontWeight: 'bold',
            }}
          >
            Zarejestruj się
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;
