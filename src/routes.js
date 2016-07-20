import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from './components/App';
import HomePage from './components/HomePage';
import ScoutViewPage from './containers/ScoutViewPage'; // eslint-disable-line import/no-named-as-default
import AboutPage from './components/AboutPage.js';
import NotFoundPage from './components/NotFoundPage.js';
import AddPage from './containers/AddPage.js'
import CustomerViewPage from './containers/CustomerViewPage'

export default (
  <Route path="/" component={App}>
    <IndexRoute component={HomePage}/>
    <Route path="fuel-savings" component={ScoutViewPage}/>
    <Route path="about" component={AboutPage}/>
    <Route path="edit" component={AddPage}/>
    <Route path="customers" component={CustomerViewPage}/>
    <Route path="*" component={NotFoundPage}/>
  </Route>
);
