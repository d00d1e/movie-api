import React, { useState } from 'react';
import { Link } from "react-router-dom";
import { Button, Navbar } from "react-bootstrap";

import './navigation-bar.scss';

export default function NavigationBar({user, onLogout}) {
  function handleLogout () {
    onLogout()
  }

  return (
    <div>
    <Navbar className="navbar fixed-top" expand="lg">
      <Navbar.Brand className="navbar-brand">
        <Link to={`/`} className="navbar-brand__link">iflix</Link>
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" className="navbar-dark" />
      <Navbar.Collapse className="justify-content-end" id="basic-navbar-nav">
        {!user ? (
          <ul>
            <Link to={`/`}>
              <Button variant="link" className="navbar__button">Login</Button>
            </Link>
            <Link to={`/register`}>
              <Button variant="link" className="navbar__button">Register</Button>
            </Link>
          </ul>
        ) : (
          <ul>
            { user &&  <p id="username">Welcome &nbsp;<span>{user}</span></p> }
            <Link to={`/users/`} >
              <Button variant="link" className="navbar__button">Profile</Button>
            </Link>
            <Link to={`/`}>
              <Button variant="link" className="navbar__button" onClick={handleLogout}>Logout</Button>
            </Link>
          </ul>
        )}
      </Navbar.Collapse>
    </Navbar>
    </div>
  )
}
