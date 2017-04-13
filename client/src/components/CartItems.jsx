import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import Auth from "../modules/Auth";


const CartItems = function(props) {
  return (<div className="cart-100">
    <w>{props.userName}&#39;s Cart</w>
    {props.userItems.map(function(item, i) {
      return ( <div key={i} className="cart-useritems-container">
          <div className="cart-userimage-desc-containter">
      <div><img className="cart-userimage" href={item.link} src={item.src}/></div>
      <div><a className="cart-userinfo" href={item.link}>{item.productName}</a>
      <button className="remove-button" id="remove" onClick={() => props.remove(item)}>REMOVE</button>
      </div>
      </div>
      <p className="cart-userprice">${item.price}</p>

    </div>)
  })}
    <line/>
    Subtotal: ${props.calculateTotal()}<br/>
  <div className="pay-button" id="paysharebutton" onClick={props.clickedPay}>Pay share</div>
</div>
)
}

export default CartItems;
