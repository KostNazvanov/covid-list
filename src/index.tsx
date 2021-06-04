import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import './index.css';
import App from './containers/App';
import saga from './sagas';
import store, { sagaMiddleware } from './helpers/store';

sagaMiddleware.run(saga);
ReactDOM.render(
  <Provider store={store}>
    <App/>
  </Provider>,
  document.getElementById('root')
);
