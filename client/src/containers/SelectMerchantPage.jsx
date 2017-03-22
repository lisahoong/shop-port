import React, { PropTypes } from 'react';
import SelectMerchantMenu from '../components/SelectMerchantMenu.jsx';
import Auth from '../modules/Auth';


class SelectMerchantPage extends React.Component {

  constructor(props, context) {
    super(props, context);
    this.state = {
      loading: true,
      merchant: null
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
  showProducts(merchant) {
    console.log('merchant retrieved\'s id: ', merchant._id);
    const xhr = new XMLHttpRequest();
    xhr.open('get', '/auth/showproducts');
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.responseType = 'json';
    xhr.addEventListener('load', () => {
      if (xhr.status === 200) {
        console.log('server got merchant: ', xhr.response.name);
      }
      else {
        console.log('FAIL');
      }
    })

  }
  render() {

    if (this.state.loading) {
      return (<div>Loading...</div>)
    } else return (
      <SelectMerchantMenu
        merchants={this.state.merchants}
        onClick={this.showProducts}
      />
    );
  }
}

export default SelectMerchantPage;
