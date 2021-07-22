import React, { useRef } from "react";
import { useHistory, Link } from "react-router-dom";

import { Container, Card, Row, Col, Button } from "react-bootstrap";

import MovieCard from "../../components/movie-card/movie-card";
import "./favorites-view.scss";

export default function FavoritesView({ favorites }) {
  const history = useHistory();
  const scrollContainer = useRef();

  const handleScroll = (scrollOffset) => {
    scrollContainer.current.scrollLeft += scrollOffset;
  };

  return (
    <Container>
      <div className="favorites-view">
        <Card className="favorites-view__card p-4">
          <Card.Header className="text-center">
            <h2>Favorite Movies</h2>
          </Card.Header>

          {favorites.length > 0 ? (
            <Container fluid className="favorite-list-container">
              <Button className="mr-4" onClick={() => handleScroll(-298)}>
                <i className="fas fa-chevron-left"></i>
              </Button>
              <Row ref={scrollContainer}>
                {favorites.map((movie) => (
                  <Col key={movie._id} md={6} lg={4}>
                    <MovieCard movie={movie} />
                  </Col>
                ))}
              </Row>
              <Button className="ml-4" onClick={() => handleScroll(298)}>
                <i className="fas fa-chevron-right"></i>
              </Button>
            </Container>
          ) : (
            <Container fluid className="no-favorites-container p-5">
              <p>You have no favorites</p>
            </Container>
          )}

          <div className="text-center pt-4">
            <Link to="/">
              <Button variant="dark" onClick={() => history.goBack()}>
                Back
              </Button>
            </Link>
          </div>
        </Card>
      </div>
    </Container>
  );
}
