import React, { PropTypes } from 'react';
import { Link } from 'react-router';


const GroupOrder = function(props) {
  return (<div>
    <button className="startcart-button" onClick={props.startGroupOrder}>
      Start a group order</button>
  </div>)
}

export default GroupOrder;
