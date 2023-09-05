import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProductScreen from './Component/ProductScreen/ProductScreen';
import AboutUs from './Component/AboutUs/AboutUs'; 
import { CartProvider } from './Component/Cart/CartContext';
import Layout from './Component/Layout/Layout';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <CartProvider>
          <Router>
            <Layout>
              <Routes>
                <Route path="/about" element={<AboutUs />} />
                <Route path="/" element={<ProductScreen />} />
              </Routes>
            </Layout>
          </Router>
        </CartProvider>
      </header>
    </div>
  );
}
export default App;