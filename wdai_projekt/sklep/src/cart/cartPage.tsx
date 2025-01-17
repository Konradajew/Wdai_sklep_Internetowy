import React, { useContext } from 'react';
import { CartContext } from './cartContext';

const CartPage: React.FC = () => {
  const { cartItems, removeFromCart, increaseQuantity, decreaseQuantity } = useContext(CartContext);

  // Obliczanie łącznej sumy
  const total = cartItems.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  return (
    <div style={{ padding: '20px' }}>
      <h1 style={{ textAlign: 'center', marginBottom: '20px' }}>Twój Koszyk</h1>
      {cartItems.length === 0 ? (
        <p style={{ textAlign: 'center', fontSize: '18px' }}>Twój koszyk jest pusty</p>
      ) : (
        <div>
          {cartItems.map((item) => (
            <div
              key={item.product.id}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                borderBottom: '1px solid #ddd',
                padding: '10px 0',
              }}
            >
              <img
                src={item.product.image}
                alt={item.product.title}
                style={{ width: '80px', height: '80px', objectFit: 'cover', marginRight: '15px' }}
              />
              <div style={{ flex: 1 }}>
                <h3 style={{ margin: '0 0 10px' }}>{item.product.title}</h3>
                <p style={{ margin: '0' }}>Cena: ${item.product.price.toFixed(2)}</p>
              </div>
              <div>
                <button
                  onClick={() => decreaseQuantity(item.product.id)}
                  style={{
                    padding: '5px 10px',
                    marginRight: '5px',
                    backgroundColor: '#FF6347',
                    color: 'white',
                    border: 'none',
                    borderRadius: '5px',
                    cursor: 'pointer',
                  }}
                >
                  -
                </button>
                <span style={{ margin: '0 10px' }}>{item.quantity}</span>
                <button
                  onClick={() => increaseQuantity(item.product.id)}
                  style={{
                    padding: '5px 10px',
                    marginRight: '10px',
                    backgroundColor: '#32CD32',
                    color: 'white',
                    border: 'none',
                    borderRadius: '5px',
                    cursor: 'pointer',
                  }}
                >
                  +
                </button>
              </div>
              <button
                onClick={() => removeFromCart(item.product.id)}
                style={{
                  backgroundColor: '#FF4500',
                  color: 'white',
                  border: 'none',
                  padding: '8px 12px',
                  borderRadius: '5px',
                  cursor: 'pointer',
                }}
              >
                Usuń
              </button>
            </div>
          ))}
          <div style={{ textAlign: 'right', marginTop: '20px' }}>
            <h3>Łączna suma: ${total.toFixed(2)}</h3>
            <button
              style={{
                marginTop: '10px',
                padding: '10px 20px',
                backgroundColor: '#007BFF',
                color: 'white',
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer',
              }}
              onClick={() => alert('Zamówienie złożone!')}
            >
              Zamów
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;
