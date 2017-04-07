import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import Auth from "../modules/Auth";

const CartItems = function(props) {
  return (<div className="cart-100">
    <w>{props.userName}&#39;s Cart</w>
    {props.userItems.map(function(item, i) {
      return (<div key={i} className="cart-useritems-container">
          <div className="cart-userimage-desc-containter">
        <img className="cart-userimage" href={item.link} src={item.src}/>
      <a className="cart-userinfo" href={item.link}>{item.title}</a>
      </div>
      <p className="cart-userprice">{item.price}</p>

    </div>)
  })}
    <line/>
    Subtotal: ${props.userTotal}<br/>
  <div className="pay-button"><Link to="/checkout">Pay share</Link></div>
</div>
)
}

export default CartItems;
