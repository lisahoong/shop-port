import React from 'react';
import { Link } from 'react-router';

const SharedCartInfo = function(props) {
  return (<div>
    <z>Checkout</z><br/>
    <w>Shipping to:</w> <br/>
      <w>{props.addressLine1}</w><br/>
    <w>{props.addressLine2}</w>
    <div className="progress-bar">
      <div className="progress">70%</div>
    </div>
  </div>)
}

export default SharedCartInfo;
