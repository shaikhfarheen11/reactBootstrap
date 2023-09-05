import React, { useState } from 'react';
import { Container, Nav, Navbar } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import { AiOutlineShoppingCart } from 'react-icons/ai';
import './ProductScreen.css'; 
import Cart from '../Cart/Cart';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useCart } from '../Cart/CartContext';
import { Link, useLocation } from 'react-router-dom';

const productsArr = [
  {
    title: 'Album 1',
    price: 12.99,
    imageUrl: 'https://prasadyash2411.github.io/ecom-website/img/Album%201.png',
    quantity: 4,
  },
  {
    title: 'Album 2',
    price: 14.99,
    imageUrl: 'https://prasadyash2411.github.io/ecom-website/img/Album%202.png',
    quantity: 5,
  },
  {
    title: 'Album 3',
    price: 9.99,
    imageUrl: 'https://prasadyash2411.github.io/ecom-website/img/Album%203.png',
    quantity: 6,
  },
  {
    title: 'Album 4',
    price: 19.99,
    imageUrl: 'https://prasadyash2411.github.io/ecom-website/img/Album%204.png',
    quantity: 4,
  }
];

const ProductScreen = () => {
  const location = useLocation();
  const { cartElements, addToCart, setCartElements, removeFromCart } = useCart();
  const [isCartOpen, setCartOpen] = useState(false);

  console.log('Cart elements:', cartElements);
  console.log('Is cart open:', isCartOpen);
  console.log('Current location pathname:', location.pathname);

  
  const isHomePage = location.pathname === '/';
  const isAboutPage = location.pathname === '/about';
  return (
    <Container className="my-5">
      <Navbar variant="dark" expand="lg" className="mb-4" fixed="top">
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mx-auto">
            <Nav.Link as={Link} to="/">HOME</Nav.Link>
            <Nav.Link as={Link} to="/store">STORE</Nav.Link>
            <Nav.Link as={Link} to="/about">ABOUT</Nav.Link>
          </Nav>
        </Navbar.Collapse>
        {location.pathname === '/' ? (
          <div className="cart-badge" onClick={() => setCartOpen(!isCartOpen)}>
            <AiOutlineShoppingCart size={29} />
            <span className="cart-badge-text">Cart {cartElements.length}</span>
            {isCartOpen && (
              <div className="cart-preview">
                {cartElements.map((item, index) => (
                  <div key={index} className="cart-preview-item">
                    {item.title} - {item.quantity}
                  </div>
                ))}
              </div>
            )}
          </div>
        ) : null}
      </Navbar>
      {isHomePage && (
        <div className="home-section">
          <h2 className="home-title">The Generics</h2>
        </div>
      )}
      {isAboutPage && (
        <div className="generics-section">
          <h2 className="generics-title">The Generics</h2>
        </div>
      )}
      <div className="cart-badge" onClick={() => setCartOpen(!isCartOpen)} style={{ fontSize: '24px' }}>
        <AiOutlineShoppingCart size={32} />
        <span className="cart-badge-text">Cart {cartElements.length}</span>
        {isCartOpen && (
          <div className="cart-preview">
            {cartElements.map((item, index) => (
              <div key={index} className="cart-preview-item">
                {item.title} - {item.quantity}
              </div>
            ))}
          </div>
        )}
      </div>

      <h1 className="mb-4 music-title">MUSIC</h1>
      <div className="products">
        {productsArr.map((product, index) => (
          <div key={index} className="mb-4">
            <div className="card border-0">
              <h6 className="card-subtitle mb-2">{product.title}</h6>
              <img
                src={product.imageUrl}
                alt={product.title}
                className="card-img-top smaller-image"
              />
              <div className="card-body d-flex justify-content-between align-items-end">
                <p className="card-text">${product.price}</p>
                <Button
                  className="custom-add-to-cart-button"
                  onClick={() => addToCart(product)}
                >
                  ADD TO CART
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="text-center mt-4">
        <Button
          style={{
            backgroundColor: 'grey',
            color: 'rgb(109, 197, 231)',
            padding: '0.8rem',
            fontWeight: '800',
            fontSize: '1.2rem',
            width: '150px',
          }}
          onClick={() => setCartOpen(!isCartOpen)}
        >
          See the Cart
        </Button>
      </div>

      <Cart
        isOpen={isCartOpen}
        toggleCart={() => setCartOpen(!isCartOpen)}
        cartItems={cartElements}
        removeFromCart={removeFromCart}
        setCartItems={setCartElements}
      />
    </Container>
  );
};

export default ProductScreen;
