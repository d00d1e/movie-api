import React, { Component } from "react";
import { Router, Route } from "react-router-dom";
import { createBrowserHistory } from "history";
import { connect } from "react-redux";
import axios from "axios";

import { setMovies, toggleFavorites } from "../../redux/actions/actions";

import LoginView from "../login-view/login-view";
import RegistrationView from "../registration-view/registration-view";
import MovieView from "../movie-view/movie-view";
import GenreView from "../genre-view/genre-view";
import DirectorView from "../director-view/director-view";
import ProfileView from "../profile-view/profile-view";
import MoviesList from "../movies-list/movies-list";
import NavigationBar from "../navigation-bar.js/navigation-bar";
import FavoritesView from "../favorites-view/favorites-view";

import "./main-view.scss";

// config apps basename in react-router
const history = createBrowserHistory({
  basename: "client",
});

class MainView extends Component {
  constructor() {
    super();
    this.state = {
      user: null,
      favorites: [],
      movies: [],
    };

    this.onLogout = this.onLogout.bind(this);
    this.onLoggedIn = this.onLoggedIn.bind(this);
    this.toggleFavoritedMovie = this.toggleFavoritedMovie.bind(this);
  }

  componentDidMount() {
    let accessToken = localStorage.getItem("token");
    if (accessToken !== null) {
      this.setState({ user: localStorage.getItem("user") });
      this.getMovies(accessToken);
      // this.getFavorites(accessToken)
    }
  }

  onLoggedIn(authData) {
    this.setState({ user: authData.user.username });

    localStorage.setItem("token", authData.token);
    localStorage.setItem("user", authData.user.username);
    this.getMovies(authData.token);
    // this.getFavorites(authData.token, authData.user.username)

    // console.log(authData);
  }

  onLogout() {
    this.setState({ user: null });

    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.open("/client", "_self");
  }

  getMovies(token) {
    axios
      .get(process.env.API_URI + "/movies", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        this.setState({ movies: response.data });
        this.props.setMovies(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  toggleFavoritedMovie(id) {
    if (this.state.favorites.includes(id)) {
      // remove movie from favorites list
      this.setState({
        favorites: this.state.favorites.filter((x) => x !== id),
      });
    } else {
      // add movie to favorites
      this.setState({
        favorites: [...this.state.favorites, id],
      });
    }
  }

  // getFavorites(token, user) {
  //   axios.get(`https://i-flix.herokuapp.com/users/${user}/favorites`, {
  //     headers: { Authorization: `Bearer ${token}` }
  //   })
  //   .then(response => {
  //     this.setState({ favorites: response.data})
  //     this.props.setFavorites(response.data)
  //   })
  // }

  render() {
    const { movies } = this.props;
    const { user, favorites } = this.state;

    const favoriteMovies = movies.filter((x) =>
      this.state.favorites.includes(x._id)
    );

    if (!movies) return <div className="main-view" />;

    return (
      <Router history={history}>
        <div className="main-view">
          <NavigationBar user={user} onLogout={this.onLogout} />
          <Route
            exact
            path="/"
            render={() => {
              if (!user)
                return (
                  <LoginView onLoggedIn={(user) => this.onLoggedIn(user)} />
                );
              return <MoviesList movies={movies} />;
            }}
          />
          <Route
            exact
            path="/users"
            render={() => <ProfileView movies={movies} />}
          />
          <Route exact path="/register" render={() => <RegistrationView />} />
          <Route
            exact
            path="/movies/:movieId"
            render={({ match }) => {
              const movie = movies.find((m) => m._id === match.params.movieId);
              const isFavorited = movie && favorites.includes(movie._id);
              return (
                <MovieView
                  isFavorited={isFavorited}
                  movie={movie}
                  onFavoriteClick={() => this.toggleFavoritedMovie(movie._id)}
                />
              );
            }}
          />
          <Route
            exact
            path="/genre/:genre"
            render={({ match }) => {
              if (!movies) return <div className="main-view" />;
              return (
                <GenreView
                  genre={movies.find(
                    (m) => m.Genre.Name === match.params.genre
                  )}
                />
              );
            }}
          />
          <Route
            exact
            path="/director/:director"
            render={({ match }) => {
              if (!movies) return <div className="main-view" />;
              return (
                <DirectorView
                  director={movies.find(
                    (m) => m.Director.Name === match.params.director
                  )}
                />
              );
            }}
          />
          <Route
            exact
            path="/users/favorites"
            render={() => <FavoritesView favorites={favoriteMovies} />}
          />
        </div>
      </Router>
    );
  }
}

//allow component to subscribe to updates
const mapStateToProps = (state) => {
  return { movies: state.movies };
};

// wrap stateful component to connect to a store, HOC returns new component
export default connect(mapStateToProps, { setMovies, toggleFavorites })(
  MainView
);
