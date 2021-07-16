import React, { Component } from "react";
import { Link } from "react-router-dom";

import Card from "react-bootstrap/Card";
import "./movie-card.scss";

export default class MovieCard extends Component {
  render() {
    const { movie } = this.props;

    return (
      <div className="movie-card">
        <Card className="movie-card__card">
          <Link to={`/movies/${movie._id}`}>
            <Card.Img
              variant="top"
              src={movie.imageUrl}
              className="movie-card__image image-sponsive w-100"
            />
          </Link>
        </Card>
      </div>
    );
  }
}
