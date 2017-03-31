import React, { PropTypes } from 'react';
import { Link } from 'react-router';


const LaughAtSomeone = function(props) {
  console.log('sup');
  console.log(props.params.person);
  return (<div>
    <h1>laughing @ {props.params.person}</h1>
    {props.children}
  </div>)
}

export default LaughAtSomeone;
