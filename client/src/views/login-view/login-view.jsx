import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import { Form, Button } from "react-bootstrap";

import "./login-view.scss";

export default function LoginView(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    /* Send a request to the server for authentication */
    axios
      .post(process.env.API_URI + "/login", {
        username: username,
        password: password,
      })
      .then((response) => {
        const data = response.data;
        props.onLoggedIn(data); //update user state of MainView
      })
      .catch((e) => {
        console.log("No such user");
      });
  };

  return (
    <div className="login-view__form">
      <h2>Login</h2>
      <Form>
        <Form.Group controlId="formBasicUsername">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>

        <div className="submit-button mt-5">
          <Button
            variant="primary btn-block"
            type="submit"
            onClick={handleSubmit}
          >
            Submit
          </Button>
        </div>

        <div className="register">
          <h6>
            Don't have an account? &nbsp; <Link to={`/register`}>Sign Up</Link>
          </h6>
        </div>
      </Form>
    </div>
  );
}
