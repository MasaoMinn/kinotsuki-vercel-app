"use client";
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { useState } from 'react';
import { useTheme ,lightTheme ,darkTheme } from "@/components/boxed/ThemeProvider";
function BasicExample() {
  const { theme, toggleTheme } = useTheme();

  return (
    <Navbar expand="lg" className="bg-body-tertiary" bg={theme} data-bs-theme={theme}>
      <Container>
        <Navbar.Brand href="./">Masaaominn's Personal Website</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            
          </Nav><Nav>
            <Nav.Link href='./About'>ABOUT</Nav.Link>
            <NavDropdown title="Dropdown" id="basic-nav-dropdown">
              <NavDropdown.Item><Button onClick={toggleTheme}>
                {`切换${theme === "light" ? "深色" : "浅色"}模式`}{theme === "light" ? "🌙" : "☀️"}
              </Button></NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="https://github.com/MasaoMinn/ACTracker">See me on Github</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default BasicExample;