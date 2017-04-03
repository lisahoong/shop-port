import React, { PropTypes } from 'react';
import CartCheckout from '../components/CartCheckout.jsx';
import CartItems from '../components/CartItems.jsx';

class CartPage extends React.Component {
  constructor() {
    super();
  }
  render() {
    return (<div className="cart-container">
      <div>
      <CartItems/><br/>
      </div>

      <div>
      <CartCheckout/>
      </div>
    </div>)
  }
}

export default CartPage;
