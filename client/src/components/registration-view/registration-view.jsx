import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import { Form, Button } from "react-bootstrap";
import "./registration-view.scss";


export default function RegistrationView() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [dob, setDob] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const createdUser = {
      Username: username,
      Password: password,
      Email: email,
      Birthday: dob,
    };

    axios
      .post(process.env.API_URI + "/users", createdUser)
      .then((response) => {
        // console.log(response);
        // console.log(response.data);
        alert("User created successfully");
        window.open("/client", "_self");
      })
      .catch((e) => {
        console.log(e.response);
        alert("Error processing request");
      });
  };

  return (
    <div className="registration-view__form">
      <h3>Sign Up</h3>
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

        <Form.Group controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            value={email}
            placeholder="Enter email"
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="formBasicDate">
          <Form.Label>Date of Birth</Form.Label>
          <Form.Control
            type="date"
            value={dob}
            placeholder="MM/DD/YYYY"
            onChange={(e) => setDob(e.target.value)}
          />
        </Form.Group>

        <div className="submit-button mt-5">
          <Button variant="primary btn-block" type="submit" onClick={handleSubmit}>Submit</Button>
        </div>

        <div className="login">
          <h6>Already have an account? &nbsp; <Link to={`/`}>Login here →</Link></h6>
        </div>
      </Form>
    </div>
  );
}