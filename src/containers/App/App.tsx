import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Sidebar from '../../components/Sidebar';
import Content from '../Content';
import actions from '../../reducers/actions';
import './App.css';

const App = () => {
  useEffect(() => {
    actions.getCountries({});
  }, []);

  return (
    <div className="app">
      <Router>
        <Sidebar/>
        <Route path="*">
          <Content/>
        </Route>
      </Router>
    </div>
  );
}

export default App;
