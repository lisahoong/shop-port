import React from 'react';
import ReactDom from 'react-dom';
import { browserHistory, Router, Route, IndexRoute } from 'react-router';
import routes from './routes.js';

import Base from './components/Base.jsx';
import HomePage from './components/HomePage.jsx';
import Products from './components/Products.jsx';
import DashBoardPage from './containers/DashboardPage.jsx';
import LoginPage from './containers/LoginPage.jsx';
import SignUpPage from './containers/SignUpPage.jsx';
import ShoppingPage from './containers/ShoppingPage.jsx';
import SelectMerchantPage from './containers/SelectMerchantPage.jsx';
import Auth from './modules/Auth';

module.exports = (
  <Route path="/" component={Base}>
    <IndexRoute component={HomePage}/>
    <Route path="/shop" component={SelectMerchantPage}>
      <IndexRoute component={SelectMerchantPage} /> //   /shop
      <Route path=":merchName" component={ShoppingPage}/>
    </Route>
    <Route path="/lol" component={ShoppingPage}/>
    <Route path="/login" component={LoginPage}/>
    <Route path="/signup" component={SignUpPage}/>
    <Route path="/logout" onEnter={(nextState, replace) => {
        Auth.deauthenticateUser();
        replace('/');
      }} />
  </Route>
)
