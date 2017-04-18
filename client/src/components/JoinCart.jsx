import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import SignUpPage from '../containers/SignUpPage.jsx';


// <div>
// <h1>  join {props.user}&#39;s cart </h1>
// <div> <Link to={shareLink(props.cart)} id="nav-link"> Make your friend click this</Link></div>
// <br/>
// <c>Sorry this page looks like ass. It&#39;s just temporary &hearts;</c>
// </div>

function shareLink(name){
  var sProp=encodeURIComponent(name.trim())
  return `/signup/${sProp}`;
}
const JoinCart = function(props){
  console.log('user:', props.user, 'cart: ', props.cart);
  return(<div className="container">
  <br/>

  <h10>Hello there. Your friend Moose has invited you to shop!</h10>
  <span><h7>In order to join, please sign up for an account below!</h7></span>
  <span><h7>Already have an account? Log in here</h7></span>

  </div>)
}
export default JoinCart;
