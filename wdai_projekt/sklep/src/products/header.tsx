import React from 'react';
import { Link } from 'react-router-dom';

const Header: React.FC = () => {
  return (
    <header style={{
      position: 'fixed', // Przykleja do góry ekranu
      top: 0,
      left: 0,
      width: '100vw', // Rozciąga na całą szerokość ekranu
      backgroundColor: '#232f3e',
      color: '#fff',
      padding: '10px 20px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      zIndex: 1000, // Upewnia się, że nagłówek jest na wierzchu
    }}>
      <h1 style={{ fontSize: '20px', fontWeight: 'bold' }}>FakeStore</h1>
      <nav>
        <Link to="/" style={{ marginRight: '10px', color: '#fff', textDecoration: 'none' }}>Strona główna</Link>
        <Link to="/cart" style={{ marginRight: '10px', color: '#fff', textDecoration: 'none' }}>Koszyk</Link>
        <Link to="/login" style={{ marginRight: '10px', color: '#fff', textDecoration: 'none' }}>Logowanie</Link>
        <Link to="/register" style={{ marginRight: '50px', color: '#fff', textDecoration: 'none' }}>Rejestracja</Link>
      </nav>
    </header>
  );
};

export default Header;
