import React, { PropTypes } from 'react';
import Products from '../components/Products.jsx';
import Auth from '../modules/Auth';
import popupS from 'popups';
import ProductsDisplay from '../components/ProductsDisplay.jsx';


class ShoppingContainer extends React.Component{
  constructor(props) {
    super(props);
  }
  render(props) {
    return(<div>I contain everything
      {this.props.children}
      <ProductsDisplay data="i am data"/>
    </div>)
  }
}

export default ShoppingContainer;
