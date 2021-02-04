import React from 'react';
import { Container, Col, Row } from 'react-bootstrap';

import { MovieCard } from '../movie-card/movie-card';

import './movies-list.scss';


export default function MoviesList(props) {
  const { movies  } = props;

  if (!movies) return <div className="main-view"/>;

  return (
    <div className="movies-list">
      <Container fluid>
        <Row>
          {filteredMovies.map(movie => (
            <Col key={movie._id} >
              <MovieCard key={movie._id} movie={movie}/>
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
}


