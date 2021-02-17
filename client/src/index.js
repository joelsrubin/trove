import React from 'react';
import ReactDOM from 'react-dom';
import GlobalStyle from './theme/globalStyle.js';
import data from './fakeData.js';

import App from './components/App.jsx'

ReactDOM.render(
  <App data={data}/>,
  document.getElementById('root')
);