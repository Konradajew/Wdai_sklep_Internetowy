import React, { useState } from 'react';

const Register: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:5000/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage('Rejestracja zakończona sukcesem.');
      } else {
        setMessage(data.message || 'Błąd rejestracji.');
      }
    } catch (error) {
      console.error(error);
      setMessage('Błąd połączenia z serwerem.');
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
          Rejestracja
        </h2>
        <form onSubmit={handleRegister}>
          <div style={{ marginBottom: '15px' }}>
            <label
              style={{
                display: 'block',
                marginBottom: '5px',
                fontSize: '14px',
                color: '#555',
              }}
            >
              Email:
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={{
                width: '95%',
                padding: '10px',
                border: '1px solid #ddd',
                borderRadius: '5px',
                fontSize: '16px',
              }}
            />
          </div>
          <div style={{ marginBottom: '15px' }}>
            <label
              style={{
                display: 'block',
                marginBottom: '5px',
                fontSize: '14px',
                color: '#555',
              }}
            >
              Hasło:
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={{
                width: '95%',
                padding: '10px',
                border: '1px solid #ddd',
                borderRadius: '5px',
                fontSize: '16px',
              }}
            />
          </div>
          <button
            type="submit"
            style={{
              width: '100%',
              padding: '10px',
              backgroundColor: '#FF8C00',
              color: 'white',
              fontWeight: 'bold',
              borderRadius: '5px',
              border: 'none',
              fontSize: '16px',
              cursor: 'pointer',
              transition: 'background-color 0.3s',
            }}
            onMouseOver={(e) => (e.currentTarget.style.backgroundColor = '#E67300')}
            onMouseOut={(e) => (e.currentTarget.style.backgroundColor = '#FF8C00')}
          >
            Zarejestruj się
          </button>
        </form>
        {message && (
          <p
            style={{
              textAlign: 'center',
              color: message.includes('sukcesem') ? 'green' : 'red',
              marginTop: '15px',
            }}
          >
            {message}
          </p>
        )}
        <p
          style={{
            textAlign: 'center',
            fontSize: '14px',
            color: '#555',
            marginTop: '15px',
          }}
        >
          Masz już konto?{' '}
          <a
            href="/login"
            style={{
              color: '#FF8C00',
              textDecoration: 'none',
              fontWeight: 'bold',
            }}
          >
            Zaloguj się
          </a>
        </p>
      </div>
    </div>
  );
};

export default Register;
