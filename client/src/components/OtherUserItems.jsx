import React, { PropTypes } from 'react';
import { Link } from 'react-router';

const OtherUserItems = function(props) {
  return (<div className="other-container">

  {props.otherItems.map((obj) => {
    return (<div className="user-package">
    <h7>{obj.name},</h7> <xx>{obj.status}</xx>
    {obj.items.map((item) => {
      return (<div className="other-item">
      <div>
        <img className="cart-otherimage" src={item.src}/>
      </div>
      <div className="other-item-info">
        <div><h9>{item.title}</h9></div>
        <div><h8>{item.price}</h8></div>
      </div>
      </div>)
    })}
    </div>)
  })}


    <div className="user-package">
      <h7>Darwish,</h7> <xx>ordering</xx>
      <div className="other-item">
        <div>
          <img className="cart-otherimage" src="https://cdn.brandymelvilleusa.com/media/catalog/product/cache/1/image/414x621/9df78eab33525d08d6e5fb8d27136e95/m/j/mjb033n-622sb7600b197_bf3.jpg"/>
        </div>
        <div className="other-item-info">
          <div><h9>Acacia Rainbow Top</h9></div>
          <div><h8>$26</h8></div>
        </div>
      </div>
    </div>
  </div>)
}

export default OtherUserItems;
