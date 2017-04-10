import React from 'react';
import { Link } from 'react-router';

const SharedCartInfo = function(props) {
  return (<div className="shared-info">
    <div>
      <z>Checkout</z>
    </div>
    <div>
      <w>Shipping to:</w> <br/>
        <w>{props.addressLine1}</w><br/>
      <w>{props.addressLine2}</w>
    </div>
    <div>Almost there! <br/>
      Spend $15 more to get free shipping!
      <div className="progress-bar">
        <div className="progress">$15</div>
      </div>
    </div>

  </div>)
}

export default SharedCartInfo;
