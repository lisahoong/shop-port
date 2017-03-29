import React from 'react';
import ReactDom from 'react-dom';
import { browserHistory, Router, Route } from 'react-router';
import routes from './routes.js';

import Base from './components/Base.jsx';
import HomePage from './components/HomePage.jsx';
import DashBoardPage from './containers/DashboardPage.jsx';
import LoginPage from './containers/LoginPage.jsx';
import SignUpPage from './containers/SignUpPage.jsx';
import ShoppingPage from './containers/ShoppingPage.jsx';
import SelectMerchantPage from './containers/SelectMerchantPage.jsx';
import Auth from './modules/Auth';

ReactDom.render(
  (
    <Router history={browserHistory} routes={routes} />
), document.getElementById('app'));
