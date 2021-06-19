import React from 'react';
import { useHistory } from 'react-router-dom';

import { Row, Col, Card, Button, Container } from 'react-bootstrap';
import './genre-view.scss';


export default function GenreView({genre}) {
  const history = useHistory();

  return (
    <Container>
      {genre &&
        <div className='genre-view'>
          <Card className="genre-view__card">
            <Card.Header className='text-center'>
              <h2>{genre.Genre.Name}</h2>
            </Card.Header>
            <Row>
              <Col className='text-center'>
                <span>{genre.Genre.Description}</span>
              </Col>
            </Row>
            <div className="text-center pt-4">
              <Button variant="dark" onClick={() => history.goBack()}>Back</Button>
            </div>
          </Card>
        </div>
      }
    </Container>
  );
}
