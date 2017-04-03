import React, { PropTypes } from 'react';
import CartCheckout from '../components/CartCheckout.jsx';
import CartItems from '../components/CartItems.jsx';

class CartPage extends React.Component {
  constructor() {
    super();
    this.state = {
      cart: ''
    }
  }
  componentDidMount() {
    //logic to get data
    this.setState({
      cart: '123'
    })

  }
  render() {
    return (<div className="cart-container">
    {this.props.children}
      <div>
      <CartItems data={this.props.params.clur}/><br/>
      </div>

      <div>
      <CartCheckout/>
      </div>
    </div>)
  }
}

export default CartPage;
