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
  return(<div>
    I am about to log in to my existing account
  </div>)
}
export default JoinCart;
