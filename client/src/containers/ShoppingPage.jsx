import React, { PropTypes } from 'react';
import Products from '../components/Products.jsx'

class ShoppingPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      products: [],
      loading: true
    }
  }

  componentDidMount() {
    var self = this;
  }
}
