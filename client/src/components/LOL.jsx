import React, { PropTypes } from 'react';
import { Link } from 'react-router';


const LOL = function(props) {
  console.log('sup');

  return (<div>
  <h3>{props.lol}</h3>
  </div>)
}

export default LOL;
