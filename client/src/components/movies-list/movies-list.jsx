import React from 'react';
import { connect } from 'react-redux';

import VisibilityFilterInput from '../visibility-filter-input/visibility-filter-input';
import MovieCard from '../movie-card/movie-card';

import { Container, Col, Row } from 'react-bootstrap';
import './movies-list.scss';


const mapStateToProps = state => {
  const { visibilityFilter } = state;
  return { visibilityFilter };
};

function MoviesList(props) {
  const { movies, visibilityFilter } = props;
  let filteredMovies = movies;

  if (visibilityFilter !== '') {
    filteredMovies = movies.filter(movie => movie.Title.toLowerCase().includes(visibilityFilter.toLowerCase()));
  }

  if (!movies) return <div className="main-view"/>;

  return (
    <div className="movies-filter">
      <VisibilityFilterInput visibilityFilter={visibilityFilter}/>
      <br/>
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

export default connect(mapStateToProps)(MoviesList);
