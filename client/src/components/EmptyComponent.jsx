import React, { PropTypes } from 'react';
import { Link } from 'react-router';


const EmptyComponent = function(props) {
  console.log('sup');
  console.log(props.params.person);
  return (<div className="cart-100">
    {props.children}
  </div>)
}

export default EmptyComponent;
