import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Button, Navbar } from "react-bootstrap";

import "./navigation-bar.scss";

export default function NavigationBar({ user, onLogout }) {
  const location = useLocation();

  const handleLogout = () => {
    onLogout();
  };

  return (
    <div>
      <Navbar className="navbar" expand="lg">
        <Navbar.Brand className="navbar-brand">
          <Link to={`/`} className="navbar-brand__link">
            iflix
          </Link>
        </Navbar.Brand>
        {user && (
          <p id="username">
            Welcome &nbsp;<span>{user}</span>
          </p>
        )}
        <Navbar.Toggle
          aria-controls="basic-navbar-nav"
          className="navbar-dark"
        />
        <Navbar.Collapse className="justify-content-end" id="basic-navbar-nav">
          {!user ? (
            <ul>
              {location.pathname === "/" && (
                <Link to={`/register`}>
                  <Button variant="link" className="navbar__button">
                    Sign Up
                  </Button>
                </Link>
              )}
              {location.pathname === "/register" && (
                <Link to={`/`}>
                  <Button variant="link" className="navbar__button">
                    Login
                  </Button>
                </Link>
              )}
            </ul>
          ) : (
            <ul>
              <Link to={`/users/`}>
                <Button variant="link" className="navbar__button">
                  Profile
                </Button>
              </Link>
              <Link to={"/users/favorites"}>
                <Button variant="link" className="navbar__button">
                  Favorites
                </Button>
              </Link>
              <Link to={`/`}>
                <Button
                  variant="link"
                  className="navbar__button"
                  onClick={handleLogout}
                >
                  Logout
                </Button>
              </Link>
            </ul>
          )}
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
}
