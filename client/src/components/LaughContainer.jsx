import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import Dropdown from 'react-dropdown';
import Auth from '../modules/Auth';
import LOL from './LOL.jsx';

const LaughContainer = function(props) {
  return (<div>
    <h1>LOL @ my struggle</h1>
    {props.children}
    <LOL lol={"hab u seen alien"} />
  </div>)
}

export default LaughContainer;
