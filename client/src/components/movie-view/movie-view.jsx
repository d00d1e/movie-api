import React, { Component } from 'react';
import { Link } from "react-router-dom";

import { Button, Media } from 'react-bootstrap';


import './movie-view.scss';

export default class MovieView extends Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    const { movie } = this.props;

    if(!movie) return null;

    return (
      <div className="movie-view">
        <h1 className="movie-view--title">{movie.Title}</h1>
        <Media className="d-flex flex-md-row align-items-center">
          <img width={280} height={400} className="m-5" alt="movie poster" src={movie.imageUrl}/>
          <Media.Body className="movie-view mr-5">
            <h5 className="movie-genre mb-2 text-muted">Genre:&nbsp;
              <Link to={`/genre/${movie.Genre.Name}`} className="movie-view--link">{movie.Genre.Name}</Link>
            </h5>
            <h5 className="movie-director mb-2 text-muted">Director:&nbsp;
              <Link to={`/director/${movie.Director.Name}`} className="movie-view--link">{movie.Director.Name}</Link>
            </h5>
            <h5 className="text-muted"> Description:&nbsp;</h5>
            <p>{movie.Description}</p>
            <Link to={`/`}>
              <Button variant="dark">Back</Button>
            </Link>
          </Media.Body>
        </Media>

      </div>
    );
  }
}