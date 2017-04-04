import React, { PropTypes } from 'react';
import CartCheckout from '../components/CartCheckout.jsx';
import CartItems from '../components/CartItems.jsx';

class CartPage extends React.Component {
  constructor() {
    super();
    this.state = {
      cart: '',
      hello: 'blah'
    }
  }
  componentDidMount() {
    //logic to get data
    this.setState({
      cart: '123',
      blah: 'eeek'
    })

  }
  render() {
    return (<div className="cart-container">
    {this.props.children}
      <div className="cartitems-container">
      <CartItems data={this.props.params.clur}/><br/>
      </div>

      <div className="checkout-container">
      <CartCheckout/>
      </div>
    </div>)
  }
}

export default CartPage;
