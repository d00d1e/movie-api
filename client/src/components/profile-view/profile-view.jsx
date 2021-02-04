import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";

import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";

import './profile-view.scss';

export default class ProfileView extends React.Component {
  constructor() {
    super();

    this.state = {
      username: null,
      password: null,
      email: null,
      birthday: null,
      favorites: [],
      movies: [],
    };
  }

  componentDidMount() {
    const accessToken = localStorage.getItem("token");
    this.getUser(accessToken);
  }

  // get user info to set state
  getUser(token) {
    const username = localStorage.getItem("user");

    axios.get(`https://myflixj.herokuapp.com/users/${username}`, {
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

  deleteFavoriteMovie(movieid) {ss
    console.log(this.props.movies);
    axios.delete(`https://myflixj.herokuapp.com/users/${localStorage.getItem("user")}/movies/${movieid}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
      .then((res) => {
        alert("Removed movie from favorites");
      })
      .catch((e) => {
        alert("Eror removing movie: " + e);
      });
  }

  deleteUser(e) {
    axios.delete(`https://myflixj.herokuapp.com/users/${localStorage.getItem("user")}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
      .then((response) => {
        alert("Account deleted");
        localStorage.removeItem("token", "user");
        window.open("/");
      })
      .catch((event) => {
        alert("Failed to delete user");
      }
    );
  }

  render() {
    // const favorites = this.props.movies.filter(movie => this.state.favorites.includes(movie._id));

    return (
      <div className="profile-view">
        <Container>
          <br />
          <br />
          <h3>My Profile</h3>
          <br />
          <Card>
            <Card.Body>
              <Card.Text>Username: {this.state.username}</Card.Text>
              <Card.Text>Email: {this.state.email}</Card.Text>
              <Card.Text>Birthday: {this.state.birthday}</Card.Text>
              Favorite Movies:
              {/* {favorites.map((movie) => (
                <div key={movie._id} className="fav-movies-button">
                  <Link to={`/movies/${movie._id}`}>
                    <Button variant="link">{movie.Title}</Button>
                  </Link>
                  <Button variant="dark" onClick={(e) => this.deleteFavoriteMovie(movie._id)}>
                    Remove Favorite
                  </Button>
                </div>
              ))} */}
              <br />
              <br />
              <Link to={"/user/update"}>
                <Button variant="dark">Update Profile</Button>
                <br />
                <br />
              </Link>
              <Button variant="warning" onClick={() => this.deleteUser()}>
                Delete User
              </Button>
              <br />
              <br />
              <Link to={`/`}>
                <Button variant="dark">Back</Button>
              </Link>
            </Card.Body>
          </Card>

        </Container>
      </div>
    );
  }
}