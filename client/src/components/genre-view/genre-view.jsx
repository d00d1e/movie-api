import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { Row, Col, Card, Button, Container } from 'react-bootstrap';
import './genre-view.scss';


export default class GenreView extends Component {
  render() {
    const { genre  } = this.props;

    if (!genre) return null;

    return (
      <Container>
        <div className='genre-view'>
          <Card className="genre-view--card">
            <Card.Header className='text-center'>
              <h2>{genre.Name}</h2>
            </Card.Header>
            <Row>
              <Col className='text-center'>
                <span>{genre.Description}</span>
              </Col>
            </Row>
            <div className="text-center pt-4">
              <Link to={`/`}>
                <Button variant="dark">Back</Button>
              </Link>
            </div>
          </Card>
        </div>
      </Container>
    );
  }
}