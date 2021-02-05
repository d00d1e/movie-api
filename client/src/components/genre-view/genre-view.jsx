import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Row, Col, Card, Button, Container } from 'react-bootstrap';

import './genre-view.scss';

export default class GenreView extends Component {
  render() {
    const { genre } = this.props;

    if (!genre) return null;

    return (
      <Container>
        <div className='genre-view'>
          <Card className="card">
            <Card.Header className='text-center mb-2'>
              <h2>{genre.Name}</h2>
            </Card.Header>
            <br />
            <Row>
              <Col className='text-center'>
                <span>{genre.Description}</span>
              </Col>
            </Row>
            <br />
            <br />
            <Row className="genre-view--button">
              <Link to={`/`}>
                <Button variant='dark'>Back</Button>
              </Link>
            </Row>
            <br />
            <br />
          </Card>
        </div>
      </Container>
    );
  }
}