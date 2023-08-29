import React from 'react';
import { Card, Button } from 'react-bootstrap';

const ProductCard = ({ title, price, imageUrl, addToCart }) => {
    return (
        <Card>
            <div className="image-container">
                <Card.Img variant="top" src={imageUrl} alt="" />
            </div>
            <Card.Body>
                <Card.Title>{title}</Card.Title>
                <Card.Text>${price}</Card.Text>
                <Button variant="primary" onClick={addToCart}>ADD TO CART</Button>
            </Card.Body>
        </Card>
    );
};

export default ProductCard;
