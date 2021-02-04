import React, { useState } from 'react';
import axios from 'axios';

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

import './login-view.scss'


export default function LoginView(props) {
  const [ username, setUsername ] = useState('');
  const [ password, setPassword ] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    /* Send a request to the server for authentication */
    axios.post('https://i-flix.herokuapp.com/login', {
      username: username,
      password: password
    })
    .then(response => {
      const data = response.data;
      props.onLoggedIn(data); //update user state of MainView
    })
    .catch(e => {
      console.log('no such user')
    });
  };

  return (
    <div className="login-form">
      <h3>Login</h3>
      <Form>
        <br />
        <Form.Group controlId="formBasicUsername">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter username"
            value={username}
            onChange={e => setUsername(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)} />
        </Form.Group>

        <div className="submit-button">
          <Button variant="primary btn-block" type="submit" onClick={handleSubmit}>Submit</Button>
        </div>

        {/* <div className="register">
          <h5>Are you new? <Link to={`/register`}>Register Here</Link></h5>
        </div> */}
      </Form>
    </div>
  )
}
