import React, { useState } from 'react';
import { Container } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import { AiOutlineShoppingCart } from 'react-icons/ai';
import './ProductScreen.css'; 
import Cart from '../Cart/Cart';
import 'bootstrap/dist/css/bootstrap.min.css';


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
  const [cartElements, setCartElements] = useState([]);
  const [isCartOpen, setCartOpen] = useState(false);

  const addToCart = (product) => {
    const existingCartItemIndex = cartElements.findIndex(item => item.title === product.title);
  
    if (existingCartItemIndex !== -1) {
   
      const updatedCart = [...cartElements];
      updatedCart[existingCartItemIndex].quantity += 1;
      setCartElements(updatedCart);
    } else {
      setCartElements([...cartElements, { ...product, quantity: 1 }]);
    }
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
              <Button variant="primary" className="card-button" onClick={() => addToCart(product)}>
                Add to Cart
              </Button>
              </div>
      </div>
    </div>
  
))}
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