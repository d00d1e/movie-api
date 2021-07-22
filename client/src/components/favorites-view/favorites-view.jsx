import React from "react";
import { useHistory, Link } from "react-router-dom";

import { Container, Card, Row, Col, Button } from "react-bootstrap";

import "./favorites-view.scss";
import MovieCard from "../movie-card/movie-card";

export default function FavoritesView({ favorites }) {
  const history = useHistory();

  return (
    <Container>
      <div className="favorites-view">
        <Card className="favorites-view__card">
          <Card.Header className="text-center">
            <h2>Favorite Movies</h2>
          </Card.Header>
          <Row>
            {favorites.map((fav) => (
              <Col key={fav}>
                <p>{fav}</p>
              </Col>
            ))}
          </Row>
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
