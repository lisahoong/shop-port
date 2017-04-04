import React, { PropTypes } from 'react';
import { Link } from 'react-router';

function shareLink(name){
  var sProp=encodeURIComponent(name.trim())
  return `/cart/${sProp}`;
}
const JoinCart = function(props){
  console.log('yoyo join da cart');
  return(<div>
  <h1>  join {props.user}'s cart </h1>
  <h1>here da link {props.cart}</h1>
  <div> <Link to={shareLink(props.cart)} id="nav-link"> click dis shit </Link></div>
  </div>)
}
export default JoinCart;
