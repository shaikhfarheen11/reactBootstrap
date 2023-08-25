import React from 'react';
import { Button } from 'react-bootstrap';

const Cart = ({ isOpen, toggleCart, cartItems, removeFromCart }) => {
    const getTotalPrice = () => {
        return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
    };

    return (
        <section id="cart" className={`container ${isOpen ? 'open' : ''}`}>
            <h2>CART</h2>
            <button className="cancel" onClick={toggleCart}>X</button>
            <div className="cart-row cart-header">
                <span className='cart-item cart-column'>ITEM</span>
                <span className='cart-price cart-column'>PRICE</span>
                <span className='cart-quantity cart-column'>QUANTITY</span>
            </div>
            <div className='cart-items'>
                {cartItems.map((item, index) => (
                    <div className="cart-row" key={index}>
                        <span className='cart-item cart-column'>
                            <img className='cart-img' src={item.imageUrl} alt={item.title} />
                            <span>{item.title}</span>
                        </span>
                        <span className='cart-price cart-column'>$ {item.price}</span>
                        <span className='cart-quantity cart-column'>
                            {item.quantity}
                            <Button variant="danger" onClick={() => removeFromCart(index)}>REMOVE</Button>
                        </span>
                    </div>
                ))}
            </div>
            <div className="cart-total">
                <span>
                    <span className='total-title'><strong>Total</strong></span>
                    $<span id='total-value'>{getTotalPrice()}</span>
                </span>
            </div>
            <button className='purchase-btn' type='button'>PURCHASE</button>
        </section>
    );
};

export default Cart;
