import React, { Component } from 'react';
import PropTypes from 'prop-types';


export default class MovieCard extends Component {
  render() {
    const { movie, onClick } = this.props;

    return (
      <div
        className="movie-card"
        onClick={() => onClick(movie)}
      >
        {movie.Title}
      </div>
    )
  }
}