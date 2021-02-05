import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import './director-view.scss';

export default class DirectorView extends Component {
  render() {
    const { director } = this.props;

    if (!director) return null;

    return (
      <Container>
        <div className='director-view'>
          <Card className="director-view--card">
            <Card.Header className='text-center'>
              <h2>{director.Name}</h2>
            </Card.Header>
            <Row>
              <Col className='text-center'>
                <span>{director.Bio}</span>
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