import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Sidebar from '../../components/Sidebar';
import Content from '../Content';
import actions from '../../reducers/actions';
import './App.css';
import Header from '../Header';

const App = () => {
  useEffect(() => {
    actions.getCountries({});
  }, []);

  return (
    <div className="app">
      <Header/>
      <div className="app__content">
        <Router>
          <Sidebar/>
          <Route path="*">
            <Content/>
          </Route>
        </Router>
      </div>
    </div>
  );
}

export default App;
