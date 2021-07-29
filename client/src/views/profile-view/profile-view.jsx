import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Moment from "react-moment";

import { Container, Card, Button, Form } from "react-bootstrap";
import "./profile-view.scss";

export default class ProfileView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      email: "",
      birthday: "",
      favorites: [],
      isEditing: false,
    };
  }

  componentDidMount() {
    const accessToken = localStorage.getItem("token");

    axios.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
    this.getUser(accessToken);
  }

  // get user info to set state
  getUser(token) {
    const username = localStorage.getItem("user");

    axios
      .get(`${process.env.API_URI}/users/${username}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        this.setState({
          username: res.data.username,
          password: res.data.password,
          email: res.data.email,
          birthday: res.data.birthday,
          favorites: res.data.favorites,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  updateUser() {
    const username = localStorage.getItem("user");
    const accessToken = localStorage.getItem("token");

    const updatedUser = {
      username: this.state.username,
      email: this.state.email,
      birthday: this.state.birthday,
    };

    axios
      .put(`${process.env.API_URI}/users/${username}`, updatedUser)
      .then((response) => {
        alert("Profile updated successfully");

        localStorage.setItem("user", response.data.username);
      })
      .catch((err) => {
        console.log(err.response);
        alert("Error processing request");
      });

    this.getUser(accessToken);
  }

  deleteUser(e) {
    axios
      .delete(`${process.env.API_URI}/users/${localStorage.getItem("user")}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
      .then((response) => {
        alert("Account deleted");
        localStorage.removeItem("token", "user");
        window.open("/client", "_self");
      })
      .catch((err) => {
        alert("Failed to delete user");
        console.log("Failed to delete user: ", err);
      });
  }

  render() {
    const { username, email, birthday, isEditing } = this.state;

    return (
      <Container>
        <div className="profile-view">
          {isEditing ? (
            <Card>
              <h2 className="text-center mt-5">My Profile</h2>
              <Card.Body>
                <Form className="profile-form">
                  <Form.Group controlId="formBasicUsername">
                    <Form.Label>Username</Form.Label>
                    <Form.Control
                      type="text"
                      value={username}
                      onChange={(e) =>
                        this.setState({ username: e.target.value })
                      }
                    />
                  </Form.Group>
                  <Form.Group controlId="formBasicEmail">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                      type="email"
                      value={email}
                      onChange={(e) => setState({ email: e.target.value })}
                    />
                  </Form.Group>
                  <Form.Group controlId="formBasicBirthday">
                    <Form.Label>Birthday</Form.Label>
                    <Form.Control
                      type="date"
                      value={birthday && birthday.substring(0, 10)}
                      placeholder="MM/DD/YYY"
                      onChange={(e) =>
                        this.setState({ birthday: e.target.value })
                      }
                    />
                  </Form.Group>
                </Form>
                <div className="profile-view__btns pt-4">
                  <Button
                    className="m-2"
                    variant="dark"
                    onClick={() => this.setState({ isEditing: false })}
                  >
                    Cancel
                  </Button>
                  <Link to={`/`}>
                    <Button
                      className="m-2"
                      variant="warning"
                      onClick={() => this.updateUser()}
                    >
                      Update Profile
                    </Button>
                  </Link>
                  <Button
                    className="m-2"
                    variant="danger"
                    onClick={() => this.deleteUser()}
                  >
                    Delete
                  </Button>
                </div>
              </Card.Body>
            </Card>
          ) : (
            <Card>
              <h2 className="text-center mt-5">My Profile</h2>
              <Card.Body>
                <Card.Text>
                  <span>Username:</span>&nbsp; {username}
                </Card.Text>
                <Card.Text>
                  <span>Email:</span>&nbsp; {email}
                </Card.Text>
                <Card.Text>
                  <span>Birthday:</span>&nbsp;
                  <Moment format="MMMM DD, YYYY" date={birthday} />
                </Card.Text>
                <div className="profile-view__btns pt-4">
                  <Link to={`/`}>
                    <Button className="m-2" variant="dark">
                      Back
                    </Button>
                  </Link>
                  <Button
                    className="m-2"
                    variant="info"
                    onClick={() => this.setState({ isEditing: true })}
                  >
                    Edit
                  </Button>
                  {/* <Button
                    className="m-2"
                    variant="danger"
                    onClick={() => this.deleteUser()}
                  >
                    Delete
                  </Button> */}
                </div>
              </Card.Body>
            </Card>
          )}
        </div>
      </Container>
    );
  }
}
