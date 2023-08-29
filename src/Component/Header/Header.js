import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';

const Header = () => {
    return (
        <Navbar bg="dark" variant="dark">
            <Navbar.Brand href="#home">The Generics</Navbar.Brand>
            <Nav className="mr-auto">
                <Nav.Link href="#music">Music</Nav.Link>
                <Nav.Link href="#merch">Merch</Nav.Link>
                <Nav.Link href="#cart">Cart</Nav.Link>
            </Nav>
        </Navbar>
    );
};

export default Header;
