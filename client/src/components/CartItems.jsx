import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import Auth from "../modules/Auth";

class CartItems extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: props.userName,
      userItems: props.userItems,
      userTotal: props.userTotal,
      remove: props.remove,
      clickedPay: props.clickedPay,
      calculateTotal: props.calculateTotal,
      payShare: props.payShare
    }
    const self = this;
    this.remove2 = this.remove2.bind(this);

  }
  remove2(item) {
    console.log('removing item', item.productName);
    console.log('cart: ', this.props.params.cartId);
    const title = encodeURIComponent(item.productName);
    const formData = `title=${title}`;

    const xhr = new XMLHttpRequest();
    xhr.open('post', '/api/removecartitem/'+this.props.params.cartId);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.setRequestHeader('Authorization', `bearer ${Auth.getToken()}`);
    xhr.responseType = 'json';
    xhr.addEventListener('load', () => {
      if (xhr.status === 200) {
        console.log('you successfully removed an item');
      } else {
        console.log('could not remove');
      }
    });
    xhr.send(formData);
  }
  componentDidMount() {
    if (this.state.clickedPay) {
      console.log('dvngsdjfgbdf');    }
      const self = this;
      console.log('thisssss', this);
      console.log('self', self);
  }
  render() {
    return (<div className="width-100">
      <w>{this.state.userName}&#39;s Cart</w>
      {this.state.userItems.map(function(item, i) {
        return ( <div key={i} className="cart-useritems-container">
            <div className="cart-userimage-desc-containter">
        <div><img className="cart-userimage" href={item.link} src={item.src}/></div>
        <div><a className="cart-userinfo" href={item.link}>{item.productName}</a>
        <button className="remove-button" id="remove" onClick={() => self.remove2(item)}>REMOVE</button>
        </div>
        </div>
        <p className="cart-userprice">${item.price}</p>

      </div>)
    })}
      <line/>
      Subtotal: ${this.state.calculateTotal()}<br/>
    <div className="pay-button"
       onClick={this.state.clickedPay}>Pay share</div>
  </div>
  )
  }
}


export default CartItems;
