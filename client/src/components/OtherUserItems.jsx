import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import uuid from 'uuid/v4'

const OtherUserItems = function(props) {
  if (props.loading) {
    return (<div>Loading...</div>)
  } else {
    return (<div className="other-container">
    {props.otherItems.map((obj, i) => {
      return (<div key={uuid()} className="user-package">
      <h7>{obj.name},</h7> <xx>ordering</xx>
      {obj.products.map((item, j) => {
        return (<div key={item._id} className="other-item">
        <div>
          <img className="cart-otherimage" src={item.src}/>
        </div>
        <div className="other-item-info">
          <div><h9>{item.productName}</h9></div>
          <div><h8>${item.price}</h8></div>
        </div>
        </div>)
      })}
      </div>)
    })}
    </div>)
  }
}

export default OtherUserItems;
