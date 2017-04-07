import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import Auth from '../modules/Auth';
import PaymentForm from '../components/PaymentForm.jsx';

class CheckoutPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      errors: {},
      target: '',
      user: {
        name: '',
        email: '',
        password: ''
      }
    }
  }
  fillForm(e) {
    console.log('user is filling out form');
  }
  processForm(e) {
    e.preventDefault();
    console.log('clicking pay');
    const xhr = new XMLHttpRequest();
    xhr.open('get', '/api/testing');
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    xhr.setRequestHeader('Authorization', `bearer ${Auth.getToken()}`);
    xhr.responseType = 'json';
    xhr.addEventListener('load', () => {
      if (xhr.status === 200) {
        console.log(xhr.response.message);
      } else {
        console.log('boohoo');
      }
    });
    xhr.send();
  }
  render() {
    return (<div>
      <h1>Checking out</h1>
      {this.props.children}
      <PaymentForm
        user={this.state.user}
        errors={this.state.errors}
        onChange={this.fillForm}
        onSubmit={this.processForm}
      />
    </div>)
  }
}

export default CheckoutPage;
