import React, { Component } from 'react';
import { BrowserRouter, Route} from "react-router-dom";
import axios from 'axios';

import LoginView from '../login-view/login-view';
import MovieCard from '../movie-card/movie-card';
import MovieView from '../movie-view/movie-view';
import GenreView from '../genre-view/genre-view';
import DirectorView from '../director-view/director-view';
import ProfileView from '../profile-view/profile-view';


import './main-view.scss';


export default class MainView extends Component {
  constructor() {
    super();
    this.state = {
      movies: null,
      selectedMovie: null,
      user: null
    };
  }

  componentDidMount() {
    let accessToken = localStorage.getItem('token');
    if (accessToken !== null) {
      this.setState({ user: localStorage.getItem('user') });
      this.getMovies(accessToken);
    };
  }

  onMovieClick(movie) {
    this.setState({ selectedMovie: movie });
  }

  onLoggedIn(authData) {
    this.setState({ user: authData.user.username });

    localStorage.setItem('token', authData.token);
    localStorage.setItem('user', authData.user.username);
    this.getMovies(authData.token);
    // console.log(authData);
  }

  onLogout(){
    this.setState({ user: null });

    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.open("/", "_self");
  }

  getMovies(token) {
    axios.get('https://i-flix.herokuapp.com/movies', {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(response => {
      this.setState({ movies: response.data });
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  render() {
    const { movies, selectedMovie, user } = this.state;

    if (!user) return <LoginView onLoggedIn={user => this.onLoggedIn(user)} />

    if (!movies) return <div className="main-view"/>;

    return (
      <BrowserRouter>
        <div className="main-view">
          <Route
            exact
            path="/"
            render={() => movies.map(m => <MovieCard key={m._id} movie={m}/>)}
          />
          <Route
            exact path="/users"
            render={() => <ProfileView movies={movies} />}
          />
          <Route
            path="/register"
            render={() => <RegistrationView />}
          />
          <Route
            exact
            path="/movies/:movieId"
            render={({match}) => (
              <MovieView movie={movies.find(m => m._id === match.params.movieId)}/>
            )}
          />
          <Route
            exact
            path="/movies/director/:director"
            render={({ match }) => {
              if (!movies) return <div className="main-view" />;
              return (
                <DirectorView director={movies.find((m) => m.Director.Name === match.params.director).Director} />
              );
            }}
          />
          <Route
            exact
            path="/movies/genre/:genre"
            render={({ match }) => {
              if (!movies) return <div className="main-view" />;
              return (
                <GenreView genre={movies.find((m) => m.Genre.Name === match.params.genre).Genre}/>
              );
            }}
          />
        </div>
      </BrowserRouter>
    );
  }
}