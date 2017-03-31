import React, { PropTypes } from 'react';
import { Link } from 'react-router';


const LaughAtSomeone = function() {
  console.log('sup');
  console.log(this.props.params.person);
  return (<h1>laughing @ {this.props.params.person}</h1>)
}

export default LaughAtSomeone;
