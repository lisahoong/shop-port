import React, { PropTypes } from 'react';
import AddThingsForm from '../components/addthings.jsx';


class AddThingsPage extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state({
      merchant: {
        name: ''
      },
      product: {
        merchantId: '',
        title: '',
        link: '',
        src: '',
        price: null
      }
    })
  }
  changeProduct(e) {
    const field = e.target.name;
    const product = this.state.product;
    product[field] = e.target.value;

    this.setState({
      product
    });
  }

  addMerchantProduct(e) {
    e.preventDefault();

    const title = encodeURIComponent(item.title);
    const link = encodeURIComponent(item.link);
    const src = encodeURIComponent(item.src);
    const price = encodeURIComponent(item.price);
    const formData = `title=${title}&link=${link}&price=${price}`;

    const xhr = new XMLHttpRequest();
    xhr.open('post', '/api/additem');
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.setRequestHeader('Authorization', `bearer ${Auth.getToken()}`);
    xhr.responseType = 'json';
    xhr.addEventListener('load', () => {
      if (xhr.status === 200) {
        console.log('gottem');
      }
    });
    xhr.send(formData);
  }

  changeMerchant(e) {
    const name
  }

  processNewMerchant(e) {

  }

  addMerchantItem(e) {

  }

  processForm(e) {
    // prevent default action. in this case, action is the form submission event
    e.preventDefault();

    // create a string for an HTTP body message
    const name = encodeURIComponent(this.state.user.name);
    const email = encodeURIComponent(this.state.user.email);
    const password = encodeURIComponent(this.state.user.password);
    const formData = `name=${name}&email=${email}&password=${password}`;

    // create an AJAX request
    const xhr = new XMLHttpRequest();
    xhr.open('post', '/auth/signup');
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    xhr.responseType = 'json';
    xhr.addEventListener('load', () => {
      if (xhr.status === 200) {
        // success

        // change the component-container state
        this.setState({
          errors: {}
        });

        // set a message
        localStorage.setItem('successMessage', xhr.response.message);

        // make a redirect
        this.context.router.replace('/login');
      } else {
        // failure

        const errors = xhr.response.errors ? xhr.response.errors : {};
        errors.summary = xhr.response.message;

        this.setState({
          errors
        });
      }
    });
    xhr.send(formData);
  }
  render() {
    return (
      <AddThingsForm
        onSubmit={this.processForm}
        onChange={this.changeUser}
        errors={this.state.errors}
        user={this.state.user}
        />
    );
  }

}

export default AddThingsPage;
