import React, { useState } from 'react';

import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';


const MainNavbar = () => {

    return (
      <Navbar expand="lg" className="bg-body-tertiary">
        <Container>
          <Navbar.Brand onClick={() => {console.log('test')}} href="/"> Home </Navbar.Brand>
          <Navbar.Brand href="/stores"> Stores </Navbar.Brand>
          <Navbar.Brand href="/rm"> R&M </Navbar.Brand>
          <Navbar.Brand href="/faq"> FAQ </Navbar.Brand>
        </Container>
      </Navbar>
  );
}

export default MainNavbar;