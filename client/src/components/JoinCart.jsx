import React, { PropTypes } from 'react';
import { Link } from 'react-router';

function shareLink(name){
  var sProp=encodeURIComponent(name.trim())
  return `/signup/${sProp}`;
}
const JoinCart = function(props){
  console.log('yoyo join da cart');
  return(<div>
  <h1>  join {props.user}&#39;s cart </h1>
  <div> <Link to={shareLink(props.cart)} id="nav-link"> Make your friend click this</Link></div>
  <br/>
  <c>Sorry this page looks like ass. It&#39;s just temporary &hearts;</c>
  </div>)
}
export default JoinCart;
