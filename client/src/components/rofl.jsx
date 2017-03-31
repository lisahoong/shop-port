import React, { PropTypes } from 'react';
import { Link } from 'react-router';


const rofl = function(props) {
  return (<div>
    <h1>rofl {props.params.someone}</h1>
  </div>)
}

export default rofl;
