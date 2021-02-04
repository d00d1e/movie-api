import React, { Component } from 'react';
import axios from 'axios';

import LoginView from '../login-view/login-view';
import MovieCard from '../movie-card/movie-card';
import MovieView from '../movie-view/movie-view';


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
    axios.get('https://i-flix.herokuapp.com/movies')
      .then(res => {
        this.setState({ movies: res.data });
      })
      .catch(err => {
        console.log(err)
      });
  }

  onMovieClick(movie) {
    this.setState({ selectedMovie: movie });
  }

  onLoggedIn(user) {
    this.setState({ user })
  }

  render() {
    const { movies, selectedMovie, user } = this.state;

    if (!user) return <LoginView onLoggedIn={user => this.onLoggedIn(user)} />

    if (!movies) return <div className="main-view"/>;

    return (
      <div className="main-view">
        { selectedMovie
          ? <MovieView movie={selectedMovie} />
          : movies.map(movie => (
              <MovieCard
                key={movie._id}
                movie={movie}
                onClick={movie => this.onMovieClick(movie)}
              />
            ))
        }
      </div>
    );
  }
}