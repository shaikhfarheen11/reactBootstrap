import React, { useState } from 'react';
import { Container, Card } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import { AiOutlineShoppingCart } from 'react-icons/ai';
import './ProductScreen.css'; 
import Cart from '../Cart/Cart';

const productsArr = [
  {
    title: 'Album 1',
    price: 12.99,
    imageUrl: 'https://prasadyash2411.github.io/ecom-website/img/Album%201.png',
  },
  {
    title: 'Album 2',
    price: 14.99,
    imageUrl: 'https://prasadyash2411.github.io/ecom-website/img/Album%202.png',
  },
  {
    title: 'Album 3',
    price: 9.99,
    imageUrl: 'https://prasadyash2411.github.io/ecom-website/img/Album%203.png',
  },
  {
    title: 'Album 4',
    price: 19.99,
    imageUrl: 'https://prasadyash2411.github.io/ecom-website/img/Album%204.png',
  }
];

const ProductScreen = () => {
  const [cartElements, setCartElements] = useState([]);
  const [isCartOpen, setCartOpen] = useState(false);

  const addToCart = (product) => {
    setCartElements([...cartElements, product]);
  };

  const removeFromCart = (index) => {
    const updatedCart = cartElements.filter((_, i) => i !== index);
    setCartElements(updatedCart);
  };

  return (
    <Container className="my-5">
      <div className="cart-badge" onClick={() => setCartOpen(!isCartOpen)}>
        <AiOutlineShoppingCart size={24} />
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
      <h1 className="mb-4">Music</h1>
      <div className="products">
        {productsArr.map((product, index) => (
          <div key={index} className="col-md-6 col-lg-4 mb-4">
            <Card>
              <div className="product-title">{product.title}</div>
              <Card.Img variant="top" src={product.imageUrl} alt={product.title} />
              <Card.Body>
                <Card.Text>${product.price}</Card.Text>
                <Button variant="primary" onClick={() => addToCart(product)}>
                  Add to Cart
                </Button>
              </Card.Body>
            </Card>
          </div>
        ))}
      </div>
      <Cart
        isOpen={isCartOpen}
        toggleCart={() => setCartOpen(!isCartOpen)}
        cartItems={cartElements}
        removeFromCart={removeFromCart}
      />
    </Container>
  );
};

export default ProductScreen;