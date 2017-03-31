import React, { PropTypes } from 'react';
import { Link } from 'react-router';


const LaughAtSomeone = function(props) {
  console.log('sup');
  console.log(props.params.person);
  return (<div>
    <w>laughing @ {props.params.person}</w>
    {props.children}
  </div>)
}

export default LaughAtSomeone;
