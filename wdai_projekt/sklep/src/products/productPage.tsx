import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { CartContext } from '../cart/cartContext';

interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  image: string;
  category: string;
}

const ProductPage: React.FC = () => {
  const { productId } = useParams<{ productId: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const { addToCart } = useContext(CartContext);

  useEffect(() => {
    const fetchProduct = async () => {
      const response = await fetch(`https://fakestoreapi.com/products/${productId}`);
      const data: Product = await response.json();
      setProduct(data);
    };

    fetchProduct();
  }, [productId]);

  if (!product) {
    return <p>Ładowanie produktu...</p>;
  }

  return (
    <div style={{
      marginTop: '0px',
      padding: '20px',
      textAlign: 'center',
      width: '100%'
    }}>
      <h1 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '20px' }}>{product.title}</h1>
      <img 
        src={product.image} 
        alt={product.title} 
        style={{ 
          width: '300px', 
          height: '300px', 
          objectFit: 'contain', 
          marginBottom: '20px' 
        }} 
      />
      <p style={{ fontSize: '16px', marginBottom: '10px' }}><strong>Kategoria:</strong> {product.category}</p>
      <p style={{ fontSize: '16px', marginBottom: '10px' }}><strong>Opis:</strong> {product.description}</p>
      <p style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '20px' }}><strong>Cena:</strong> ${product.price}</p>
      <button 
        onClick={() => addToCart(product)} 
        style={{ 
          backgroundColor: '#febd69', 
          border: 'none', 
          color: '#111', 
          padding: '10px 20px', 
          fontSize: '16px', 
          cursor: 'pointer', 
          borderRadius: '5px', 
          transition: 'background-color 0.3s'
        }}
      >
        Dodaj do koszyka
      </button>
    </div>
  );
};

export default ProductPage;
