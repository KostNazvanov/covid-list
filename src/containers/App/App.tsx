import React, { useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Sidebar from '../../components/Sidebar';
import Content from '../Content';
import actions from '../../reducers/actions';

const App = () => {
  useEffect(() => {
    actions.getCountries({});
  }, []);

  return (
    <Router>
      <Container fluid>
        <Row>
          <Col xs={2} id="sidebar-wrapper">
            <Sidebar/>
          </Col>
          <Col xs={10}>
            <Route path="*">
              <Content/>
            </Route>
          </Col>
        </Row>
      </Container>
    </Router>
  );
}

export default App;
