import React, { useEffect } from 'react';
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
      <Sidebar/>
      <Route path="*">
        <Content/>
      </Route>
    </Router>
  );
}

export default App;
