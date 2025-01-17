import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Header from './products/header';
import SearchBar from './products/searchbar';
import ProductList from './products/productList';
import { fetchProducts } from './products/productsapi';
import CategoryFilter from './products/categoryFilter';
import ProductPage from './products/productPage';
import Login from './login/login';
import Register from './login/register';
import CartPage from './cart/cartPage';
import { CartProvider } from './cart/cartContext';
import ProtectedRoute from './auth/protectedRoute';
import './styles.css'

interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  image: string;
  category: string;
}

// Separate component for the main content
const MainContent: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [categories, setCategories] = useState<string[]>([]);
  
  const location = useLocation();
  const isProductPage = location.pathname.startsWith('/product/');
  const isLoginPage = location.pathname === '/login';
  const isRegisterPage = location.pathname === '/register';
  const isCartPage = location.pathname === '/cart';
  const shouldShowFilters = !isProductPage && !isLoginPage && !isRegisterPage && !isCartPage;

  // Fetch products and set categories
  useEffect(() => {
    fetchProducts()
      .then((data) => {
        setProducts(data);
        setFilteredProducts(data);

        // Get unique categories
        const uniqueCategories = Array.from(
          new Set(data.map((product: Product) => product.category))
        );
        setCategories(uniqueCategories);
      })
      .catch((err) => console.error('Error fetching data:', err));
  }, []);

  // Filter products by title and category
  useEffect(() => {
    const filtered = products.filter((product) => {
      const matchesTitle = product.title.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === '' || product.category === selectedCategory;

      return matchesTitle && matchesCategory;
    });
    setFilteredProducts(filtered);
  }, [searchTerm, selectedCategory, products]);

  return (
    <>
      <Header />
      {shouldShowFilters && (
        <>
          <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
          <CategoryFilter
            selectedCategory={selectedCategory}
            categories={categories}
            setSelectedCategory={setSelectedCategory}
          />
        </>
      )}
      <Routes>
        <Route path="/" element={<ProductList products={filteredProducts} />} />
        <Route path="/product/:productId" element={<ProductPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
            path="/cart"
            element={
              <ProtectedRoute>
                <CartPage />
              </ProtectedRoute>
            }
          />
      </Routes>
    </>
  );
};

// Main App component
const App: React.FC = () => {
  return (
    <CartProvider>
      <Router>
        <MainContent />
      </Router>

    </CartProvider>
  );
};

export default App;