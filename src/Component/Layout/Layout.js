import React from 'react';
import { Nav, Navbar } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';
import { useCart } from '../Cart/CartContext';
import { AiOutlineShoppingCart } from 'react-icons/ai';

function Layout({ children }) {
  const { cartElements } = useCart();
  const location = useLocation();
  const isAboutPage = location.pathname === '/about';

  return (
    <>
      <Navbar variant="dark" expand="lg" className="mb-4" fixed="top">
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mx-auto">
            <Nav.Link as={Link} to="/">HOME</Nav.Link>
            <Nav.Link as={Link} to="/store">STORE</Nav.Link>
            <Nav.Link as={Link} to="/about">ABOUT</Nav.Link>
          </Nav>
        </Navbar.Collapse>
        {location.pathname === '/' && (
          <div className="cart-badge">
            <AiOutlineShoppingCart size={29} />
            <span className="cart-badge-text">Cart {cartElements.length}</span>
          </div>
        )}
      </Navbar>
      {isAboutPage && (
        <div className="generics-section">
          <h2 className="generics-title">The Generics</h2>
        </div>
      )}
      {children}
    </>
  );
}

export default Layout;
