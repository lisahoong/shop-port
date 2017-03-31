import React, { PropTypes } from 'react';
import { Link } from 'react-router';


const ProductsDisplay = function(props) {
  return (<div>
    <z>you are shopping at {props.data}</z>
  </div>)
}

export default ProductsDisplay;
