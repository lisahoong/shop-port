import React from 'react';
import ReactDom from 'react-dom';
import { browserHistory, Router, Route, IndexRoute } from 'react-router';
import routes from './routes.js';

import Base from './components/Base.jsx';
import HomePage from './components/HomePage.jsx';
import Products from './components/Products.jsx';
import LOL from './components/LOL.jsx';
import rofl from './components/rofl.jsx';
import LaughAtSomeone from './components/LaughAtSomeone.jsx';
import LaughContainer from './components/LaughContainer.jsx';
import DashBoardPage from './containers/DashboardPage.jsx';
import ShoppingContainer from './containers/ShoppingContainer.jsx';
import ProductsDisplay from './components/ProductsDisplay.jsx';
import LoginPage from './containers/LoginPage.jsx';
import SignUpPage from './containers/SignUpPage.jsx';
import ShoppingPage from './containers/ShoppingPage.jsx';
import SelectMerchantPage from './containers/SelectMerchantPage.jsx';
import Auth from './modules/Auth';
import JoinCart from './components/JoinCart.jsx';
import JoinContainer from './containers/JoinContainer.jsx';

module.exports = (
  <Route path="/" component={Base}>
    <IndexRoute component={HomePage}/>
    <Route path="/shop2" component={SelectMerchantPage}>
      <IndexRoute component={SelectMerchantPage} /> //   /shop
      <Route path=":merchName" component={ShoppingPage}>
        <Route path=":testing" component={LaughAtSomeone}/>
      </Route>
    </Route>
    <Route path="/select" component={SelectMerchantPage}/>
    <Route path="/shop" component={ShoppingContainer}>
      <Route path=":person" component={LaughAtSomeone}>
          <Route path=":store" component={rofl}/>
      </Route>
    </Route>
    <Route path="/lol" component={LaughContainer}>
      <Route path=":person" component={LaughAtSomeone}>
          <Route path=":store" component={rofl}/>
      </Route>
    </Route>
    <Route path = "/join" component = {JoinContainer}>
      <Route path =":cart" component= {JoinCart}/>
    </Route>
    <Route path="/login" component={LoginPage}/>
    <Route path="/signup" component={SignUpPage}/>
    <Route path="/logout" onEnter={(nextState, replace) => {
        Auth.deauthenticateUser();
        replace('/');
      }} />
  </Route>
)
