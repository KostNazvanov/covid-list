import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { BrowserRouter as Router } from 'react-router-dom';

import Sidebar from '../../components/Sidebar';

function App() {
  return (
    <Router>
      <Container fluid>
        <Row>
          <Col xs={2} id="sidebar-wrapper">
            <Sidebar/>
          </Col>
        </Row>
      </Container>
    </Router>
  );
}

export default App;