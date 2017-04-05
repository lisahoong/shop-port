import React, { PropTypes } from 'react';
import { Link } from 'react-router';

const CartItems = function(props) {
  console.log('ddv', props.userItems);
  return (<div>
    <w>{props.userName}&#39;s Cart</w>
    {props.userItems.map(function(item, i) {
      return (<div key={i} className="clothing-item-container">
      <div>
        <img className="clothing-item-image" href={item.link} src={item.src}/>
        <a className="clothing-item-info" href={item.link}>{item.title}</a>
        <p className="clothing-item-price">{item.price}</p>
      </div>
    </div>)
  })}
</div>
)
}

export default CartItems;
