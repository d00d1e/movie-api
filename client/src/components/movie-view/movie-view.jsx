import React, { Component } from 'react';
import { Link } from "react-router-dom";

import { Button, Media } from 'react-bootstrap';
import './movie-view.scss';


export default class MovieView extends Component {
  render() {
    const { movie } = this.props;

    if(!movie) return null;

    return (
      <div className="movie-view row">
        <Media className="align-items-center justify-content-center ">
          <img className="m-5" alt="movie poster" src={movie.imageUrl}/>
          <Media.Body className="mr-5">
            <h1 className="movie-view--title">{movie.Title}</h1>
            <h5 className="movie-genre mb-2 text-muted">Genre:&nbsp;
              <Link to={`/genre/${movie.Genre.Name}`} className="movie-view--link">{movie.Genre.Name}</Link>
            </h5>
            <h5 className="movie-director mb-2 text-muted">Director:&nbsp;
              <Link to={`/director/${movie.Director.Name}`} className="movie-view--link">{movie.Director.Name}</Link>
            </h5>
            <div className="movie-view--description">
              <h5 className="text-muted">Description:</h5>
              <p className="movie-view--description">{movie.Description}</p>
            </div>

            <div className="text-center">
              <Link to={`/`}>
                <Button variant="dark">Back</Button>
              </Link>
            </div>
          </Media.Body>
        </Media>
      </div>
    );
  }
}