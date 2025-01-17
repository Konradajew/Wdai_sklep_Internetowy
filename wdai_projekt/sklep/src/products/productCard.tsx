import React from 'react'; 
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { CartContext } from '../cart/cartContext';

interface ProductProps {
  id: number;
  title: string;
  image: string;
  price: number;
  description: string;
  category: string;
}

const ProductCard: React.FC<ProductProps> = ({ id, title, image, price, description, category }) => {
  const { addToCart } = useContext(CartContext);

  return (
    <Link 
      to={`/product/${id}`} 
      style={{ textDecoration: 'none', color: 'inherit', width: '100%' }}
    >
      <div 
        style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          border: '1px solid #ddd',
          borderRadius: '10px',
          padding: '15px',
          backgroundColor: 'white',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
          transition: 'transform 0.2s ease-in-out',
          width: '100%',
          maxWidth: '1200px',
          margin: '10px auto',
        }}
        className="product-card"
      >
        {/* Obraz po lewej */}
        <img
          src={image}
          alt={title}
          style={{
            width: '250px',
            height: '250px',
            objectFit: 'cover',
            borderRadius: '10px',
            marginRight: '20px',
          }}
        />
        
        {/* Sekcja tekstowa po prawej */}
        <div style={{ flex: 1 }}>
          <h3 
            style={{
              fontSize: '24px',
              fontWeight: 'bold',
              color: '#232f3e',
              marginBottom: '10px',
            }}
          >
            {title}
          </h3>

          <p 
            style={{
              fontSize: '16px',
              color: '#555',
              marginBottom: '10px',
              lineHeight: '1.5',
              maxHeight: '80px',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
            }}
          >
            {description}
          </p>

          <p 
            style={{
              fontSize: '14px',
              color: '#888',
              marginBottom: '10px',
            }}
          >
            Kategoria: {category}
          </p>

          <p 
            style={{
              fontSize: '20px',
              fontWeight: 'bold',
              color: '#febd69',
              marginBottom: '20px',
            }}
          >
            ${price.toFixed(2)}
          </p>

          <button
            onClick={(e) => {
              e.preventDefault();
              addToCart({ id, title, image, price });
            }}
            style={{
              backgroundColor: '#febd69',
              border: 'none',
              color: '#111',
              padding: '10px 20px',
              fontSize: '16px',
              cursor: 'pointer',
              borderRadius: '5px',
              transition: 'background-color 0.3s',
              width: '100%',
            }}
          >
            Dodaj do koszyka
          </button>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
