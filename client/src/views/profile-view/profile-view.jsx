import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Moment from "react-moment";

import { Container, Card, Button } from "react-bootstrap";
import "./profile-view.scss";

export default class ProfileView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: null,
      password: null,
      email: null,
      birthday: null,
      favorites: [],
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

    axios.put(`${process.env.API_URI}/users/${username}`);
  }

  deleteUser(e) {
    axios
      .delete(`${process.env.API_URI}/users/${localStorage.getItem("user")}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
      .then((response) => {
        alert("Account deleted");
        localStorage.removeItem("token", "user");
        window.open("/");
      })
      .catch((err) => {
        alert("Failed to delete user");
        console.log("Failed to delete user: ", err);
      });
  }

  render() {
    const { username, email, birthday } = this.state;

    console.log(birthday);
    return (
      <Container>
        <div className="profile-view">
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
                <Moment format="MMMM DD, YYYY">{birthday}</Moment>
              </Card.Text>
              <div className="profile-view__btns pt-4">
                {/* <Link to={"/user/update"}>
                  <Button variant="dark">Update Profile</Button>
                </Link> */}
                <Link to={`/`}>
                  <Button variant="dark">Back</Button>
                </Link>
                <Button variant="warning" onClick={() => this.deleteUser()}>
                  Delete User
                </Button>
              </div>
            </Card.Body>
          </Card>
        </div>
      </Container>
    );
  }
}
