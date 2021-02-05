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
          <Card className="card">
            <Card.Header className='text-center'>
              <h2>{director.Name}</h2>
            </Card.Header>
            <br/>
            <Row>
              <Col className='text-center'>
                <span>{director.Bio}</span>
              </Col>
            </Row>
            <br />
            <br />
            <Row>
              <div className="text-center">
                <Link to={`/`} className="director-view--button mx-auto">
                  <Button variant='dark link'>Back</Button>
                </Link>
              </div>
            </Row>
            <br />
            <br />
          </Card>
        </div>
      </Container>
    );
  }
}