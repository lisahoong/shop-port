import React from 'react';
import ReactDom from 'react-dom';
import { browserHistory, Router, Route, IndexRoute } from 'react-router';
import routes from './routes.js';

import Base from './components/Base.jsx';
import HomePage from './components/HomePage.jsx';
import LOL from './components/LOL.jsx';
import rofl from './components/rofl.jsx';
import LaughAtSomeone from './components/LaughAtSomeone.jsx';
import EmptyComponent from './components/EmptyComponent.jsx';
import LaughContainer from './components/LaughContainer.jsx';
import CartItems from './components/CartItems.jsx';
import DashBoardPage from './containers/DashboardPage.jsx';
import CartPage from './containers/CartPage.jsx';
import ShoppingContainer from './containers/ShoppingContainer.jsx';
import ProductsDisplay from './components/ProductsDisplay.jsx';
import LoginPage from './containers/LoginPage.jsx';
import SignUpPage from './containers/SignUpPage.jsx';
import SelectMerchantPage from './containers/SelectMerchantPage.jsx';
import Auth from './modules/Auth';
import JoinCart from './components/JoinCart.jsx';
import JoinContainer from './containers/JoinContainer.jsx';

module.exports = (
  <Route path="/" component={Base}>
    <IndexRoute component={HomePage}/>
    <Route path="/select" component={SelectMerchantPage}/>
    <Route path="/shop" component={ShoppingContainer}>
      <Route path=":person" component={EmptyComponent}>
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
    <Route path="/cart" component={CartPage}>
      <Route path=":clur" component={CartItems}/>
    </Route>
    <Route path="/login" component={LoginPage}>
      <Route path=":cartId" component={LoginPage}/>
    </Route>
    <Route path="/signup" component={SignUpPage}>
      <Route path=":cartId" component={SignUpPage}/>
    </Route>


    <Route path="/logout" onEnter={(nextState, replace) => {
        Auth.deauthenticateUser();
        replace('/');
      }} />
  </Route>
)
