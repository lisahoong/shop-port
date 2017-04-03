import React, { PropTypes } from 'react';
import { Link } from 'react-router';


const JoinCart = function(props){
  console.log('yoyo join da cart');
  return(<div>
  <h1>  join {props.user}'s cart </h1>
  </div>)
}
export default JoinCart;
