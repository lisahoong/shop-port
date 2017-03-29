import React, { PropTypes } from 'react';
import SelectMerchantMenu from '../components/SelectMerchantMenu.jsx';
import Auth from '../modules/Auth';


class SelectMerchantPage extends React.Component {

  constructor(props, context) {
    super(props, context);
    this.state = {
      loading: true,
      merchant: null,
      picked: false,
      products: []
    }
  }
  componentDidMount() {
    const xhr = new XMLHttpRequest();
    xhr.open('get', '/auth/loadmerchants');
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.responseType = 'json';
    xhr.addEventListener('load', () => {
      if (xhr.status === 200) {
        console.log('attempting to load merchants');
        console.log('message: ', xhr.response.message);
        console.log('RESPONSE: ', xhr.response.allmerchants);
        console.log('*** this is ', this);
        this.setState({
          loading: false,
          merchants: xhr.response.allmerchants
        });
        // change the current URL to /
        // this.context.router.replace('/');
      }
    });
    //setTimeout(console.log('after: ', this.state.merchants), 3000);
    xhr.send();
  }
  displayProducts(products) {
    console.log('displaying', products);
  }
  findProducts(merchant) {
    console.log('found: ',merchant);
    const xhr = new XMLHttpRequest();
    xhr.open('get', '/auth/showproducts/'+merchant._id);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.responseType = 'json';
    xhr.addEventListener('load', () => {
      if (xhr.status === 200) {
        console.log('server got products: ', xhr.response.products);


        //this.displayProducts(xhr.response.products);
        console.log('thissss: ', this);
      }
      else {
        console.log('FAIL');
      }
    });
    xhr.send();
  }
  render() {
    if (this.state.loading) {
      return (<div>Loading...</div>)
    } else return (
      <SelectMerchantMenu
        merchants={this.state.merchants}
        onClick={this.findProducts.bind(this)}
        selected={this.state.picked}
        products={this.state.products}
      />
    );
  }
}

export default SelectMerchantPage;
