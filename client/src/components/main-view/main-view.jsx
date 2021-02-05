import React, { Component } from 'react';
import { BrowserRouter, Route, Link } from "react-router-dom";
import { connect } from 'react-redux';
import axios from 'axios';

import { setMovies } from '../../actions/actions';

import LoginView from '../login-view/login-view';
import RegistrationView from '../registration-view/registration-view';
import MovieView from '../movie-view/movie-view';
import GenreView from '../genre-view/genre-view';
import DirectorView from '../director-view/director-view';
import ProfileView from '../profile-view/profile-view';
import MoviesList from '../movies-list/movies-list';

import { Navbar, Button } from "react-bootstrap";
import './main-view.scss';


class MainView extends Component {
  constructor() {
    super();
    this.state = {
      user: ''
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
      // this.setState({ movies: response.data });
      this.props.setMovies(response.data);
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  render() {
   const { movies } = this.props;
   const { user } = this.state;

    if (!movies) return <div className="main-view"/>;

    return (
      <BrowserRouter>
        <div className="main-view">
          <Navbar className="navbar" sticky="top" expand="lg">
            <Navbar.Brand className="navbar-brand">
              <Link to={`/`} className="navbar-brand--link"><sup>i</sup>flix</Link>
            </Navbar.Brand>
            <div>
              { user &&  <h6 id="username">Welcome,&nbsp;<span>{user}</span>!</h6> }
            </div>
            <Navbar.Toggle aria-controls="basic-navbar-nav" className="navbar-dark" />
            <Navbar.Collapse className="justify-content-end" id="basic-navbar-nav">
              {!user ? (
                <ul>
                  <Link to={`/`}>
                    <Button variant="link" className="main-view--button">Login</Button>
                  </Link>
                  <Link to={`/register`}>
                    <Button variant="link" className="main-view--button">Register</Button>
                  </Link>
                </ul>
              ) : (
                <ul>
                  <Link to={`/`}>
                    <Button variant="link" className="main-view--button" onClick={() => this.onLogout()}>Logout</Button>
                  </Link>
                  <Link to={`/users/`} >
                    <Button variant="link" className="main-view--button">Account</Button>
                  </Link>
                </ul>
              )}
            </Navbar.Collapse>
          </Navbar>

          <Route
            exact path="/"
            render={() => {
              if (!user) return <LoginView onLoggedIn={user => this.onLoggedIn(user)} />;
                return <MoviesList movies={movies}/>;
            }}
          />
          <Route
            exact path="/users"
            render={() => <ProfileView movies={movies} />}
          />
          <Route
            exact path="/register"
            render={() => <RegistrationView />}
          />
          <Route
            exact path="/movies/:movieId"
            render={({match}) => (
              <MovieView movie={movies.find(m => m._id === match.params.movieId)} />
            )}
          />
           <Route
            exact path="/movies/genre/:genre"
            render={({ match }) => {
              return (
                <GenreView genre={movies.find((m) => m.Genre.Name === match.params.genre).Genre} />
              );
            }}
          />
          <Route
            exact path="/movies/director/:director"
            render={({ match }) => {
              return (
                <DirectorView director={movies.find((m) => m.Director === match.params.director.Director)} />
              );
            }}
          />
        </div>
      </BrowserRouter>
    );
  }
}

//allow component to subscribe to updates
const mapStateToProps = state => {
  return { movies: state.movies }
}

// wrap stateful component to connect to a store, HOC returns new component
export default connect(mapStateToProps, { setMovies })(MainView);