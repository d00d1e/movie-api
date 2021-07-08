import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import { Container, Card, Button } from "react-bootstrap";
import './profile-view.scss';


export default class ProfileView extends Component {
  constructor(props) {
    super(props);
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

    axios.get(process.env.API_URI + `/users/${username}`, {
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

  // deleteFavorite(movieId) {
  //   // console.log(this.props.movies);
  //   axios.delete(`https://i-flix.herokuapp.com/users/${localStorage.getItem("user")}/favorites/${movieId}`, {
  //     headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
  //   })
  //   .then(res => {
  //     alert("Removed movie from favorites");
  //   })
  //   .catch(e => {
  //     alert("Error removing movie: " + e);
  //   });
  // }

  deleteUser(e) {
    axios.delete(process.env.API_URI + `/users/${localStorage.getItem("user")}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    })
    .then(response => {
      alert("Account deleted");
      localStorage.removeItem("token", "user");
      window.open("/");
    })
    .catch(e => {
      alert("Failed to delete user");
    });
  }

  render() {
    const { username, email, birthday, movies, favorites } = this.state;
    // const favoritesList = movies.filter((m) => favorites.includes(m._id));

    return (
      <Container>
        <div className="profile-view">
          <Card>
            <h3 className="text-center mt-5">My Profile</h3>
            <Card.Body>
              <Card.Text><span>Username:</span>&nbsp; {username}</Card.Text>
              <Card.Text><span>Email:</span>&nbsp; {email}</Card.Text>
              <Card.Text><span>Birthday:</span>&nbsp; {birthday && birthday.substring(0,10)}</Card.Text>
              {/* <Card.Text>
                <span>Favorites: </span>
                  {favoritesList.map((movie) => (
                    <div key={movie._id} className="fav-movies-button">
                      <Link to={`/movies/${movie._id}`}>
                        <Button variant="link">{movie.Title}</Button>
                      </Link>
                      <Button variant="dark" onClick={e => this.deleteFavorite(movie._id)}>Remove</Button>
                    </div>
                  ))}
              </Card.Text> */}
              <div className="profile-view__btns pt-4">
                {/* <Link to={"/user/update"}>
                  <Button variant="dark">Update Profile</Button>
                </Link> */}
                <Link to={`/`}>
                  <Button variant="dark">Back</Button>
                </Link>
                <Button variant="warning" onClick={() => this.deleteUser()}>Delete User</Button>
              </div>
            </Card.Body>
          </Card>
        </div>
      </Container>
    );
  }
}