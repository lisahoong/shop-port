import React, { PropTypes } from 'react';
import { Link } from 'react-router';


const LOL = function(props) {
  console.log('sup');

  return (<div>
  <h2>yo {props.lol}</h2>
  </div>)
}

export default LOL;
