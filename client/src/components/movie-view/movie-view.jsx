import React, { Component } from "react";
import { Link } from "react-router-dom";

import { Button, Container, Col, Row, Image } from "react-bootstrap";
import "./movie-view.scss";

export default class MovieView extends Component {
  render() {
    const { movie, isFavorited, onFavoriteClick } = this.props;

    if (!movie) return null;

    return (
      <Container fluid className="movie-view">
        <Row className="movie-view__content container">
          <Col className="movie-view__img d-flex justify-content-center m-5">
            <Image fluid alt="movie poster" src={movie.imageUrl} />
          </Col>
          <Col className="movie-view__body m-5">
            <Row className="text-right mb-5">
              <Button
                className="favorite-btn ml-auto"
                variant="danger"
                onClick={onFavoriteClick}
              >
                {isFavorited ? (
                  <i className="fas fa-heart"></i>
                ) : (
                  <i className="far fa-heart"></i>
                )}
              </Button>
            </Row>
            <Row>
              <h1 className="movie-view__title">{movie.Title}</h1>
            </Row>
            <Row>
              <h5 className="movie-view__genre mb-2 text-muted">
                <span>Genre:</span>&nbsp;
                <Link
                  to={`/genre/${movie.Genre.Name}`}
                  className="movie-view--link"
                >
                  {movie.Genre.Name}
                </Link>
              </h5>
            </Row>
            <Row>
              <h5 className="movie-view__director mb-2 text-muted">
                <span>Director:</span>&nbsp;
                <Link
                  to={`/director/${movie.Director.Name}`}
                  className="movie-view--link"
                >
                  {movie.Director.Name}
                </Link>
              </h5>
            </Row>
            <Row className="movie-view__description">
              <h5 className="text-muted">
                <span>Synopsis:</span>
              </h5>
              <p className="movie-view-__description ml-3">
                {movie.Description}
              </p>
            </Row>

            <Row className="text-center mt-5">
              <Link to={`/`}>
                <Button variant="dark">Back</Button>
              </Link>
            </Row>
          </Col>
        </Row>
      </Container>
    );
  }
}
