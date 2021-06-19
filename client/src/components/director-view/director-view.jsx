import React from 'react';
import { useHistory } from 'react-router-dom';

import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import './director-view.scss';

export default function DirectorView({director}) {
  const history = useHistory();

  return (
    <Container>
      {director &&
        <div className='director-view'>
          <Card className="director-view__card">
            <Card.Header className='text-center'>
              <h2>{director.Director.Name}</h2>
            </Card.Header>
            <Row>
              <Col className='text-center'>
                <span>{director.Director.Bio}</span>
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
