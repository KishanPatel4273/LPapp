import React from 'react';

import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';


const MainNavbar = () => {
    return (
      <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand onClick={() => {console.log('test')}} href="#home"> Home </Navbar.Brand>
        <Navbar.Brand href=""> Stores </Navbar.Brand>
        <Navbar.Brand href=""> R&M </Navbar.Brand>
      </Container>
    </Navbar>
  );
}

export default MainNavbar;