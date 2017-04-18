import React, { PropTypes } from 'react';
import Products from '../components/Products.jsx';
import Auth from '../modules/Auth';
import popupS from 'popups';
import JoinCartSignUp from '../components/JoinCartSignUp.jsx';
import JoinCartLogin from '../components/JoinCartLogin.jsx';

class JoinContainer extends React.Component{
  constructor(props, context) {
    super(props, context);
    this.state = {
      hasAccount:false,
      loading: true,
      errors: null,
      user: {
        first: '',
        last: '',
        email: '',
        password: ''
      },
      cartRef:''
    }
  }
  componentDidMount(){
    this.setState({
      loading: false,
      cartRef: this.props.params.cartId
    });
    //
    // var sParameter = encodeURIComponent(this.props.params.person.trim());
    // var carty = encodeURIComponent('58f4319619f79e4d3dbb7fe1');
    // var poop = `/cart/${sParameter}/${carty}`;

    if (Auth.isUserAuthenticated()) {
      const xhr = new XMLHttpRequest();
      xhr.open('get', '/api/joinCartShop/'+this.props.params.cartId);
      xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
      xhr.setRequestHeader('Authorization', `bearer ${Auth.getToken()}`);
      xhr.responseType = 'json';
      xhr.addEventListener('load', () => {
        if (xhr.status === 200) {
          console.log('ok i am logged in and i can join', xhr.response.cart);
        }
      })
      xhr.send();
    }
  }
  existingAcct() {
    this.setState({
      hasAccount: true
    })
  }
  withParam(){
    const xhr = new XMLHttpRequest();
    xhr.open('post', '/auth/cart/'+this.state.cartRef);
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    xhr.responseType = 'json';
    xhr.addEventListener('load', () => {
      if (xhr.status === 200) {
        // success


        // make a redirect
        console.log('this sign up w/param: ', this);

      } else {
        // failure
        console.log("aylmao you failed");

      }
    });
    xhr.send();
  }
  processForm(e) {
    // prevent default action. in this case, action is the form submission event
    e.preventDefault();

    // create a string for an HTTP body message
    console.log("YOOO" + this.state.cartRef);
    const first = encodeURIComponent(this.state.user.first);
    const last = encodeURIComponent(this.state.user.last);
    const email = encodeURIComponent(this.state.user.email);
    const password = encodeURIComponent(this.state.user.password);
    var cartRef;
    var formData;
    if (!this.state.loading && this.props.params.cartId) {
      cartRef = encodeURIComponent(this.state.cartRef);
    }
    //console.log('loader: ', this.state.loading);
    //console.log('params? ', this.props.params.cartId);
    console.log('cart ref: ', cartRef);
    if (cartRef) {
      formData = `first=${first}&last=${last}&email=${email}&password=${password}&cartRef=${cartRef}`;
    } else {
      console.log('wtf');
      formData = `first=${first}&last=${last}&email=${email}&password=${password}`;
    }
    // const formData = `name=${name}&email=${email}&password=${password}`;

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
        console.log('this sign up: ', this);
        if (cartRef){
          console.log("muddafucker");
          this.context.router.replace('/login/'+ cartRef);
        }else{
          this.context.router.replace('/login');
        }

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
  holder(){
    console.log('something is happening');
  }

  changeUser(e) {
    const field = e.target.name;
    const user = this.state.user;
    user[field] = e.target.value;

    this.setState({
      user
    });
  }
  // componentDidMount(){
  //   const xhr = new XMLHttpRequest();
  //   xhr.open('get', '/auth/join/'+this.props.params.cart);
  //   xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
  //   xhr.responseType = 'json';
  //   xhr.addEventListener('load', () => {
  //     if (xhr.status === 200){
  //       console.log('im loading da url');
  //       console.log('message ', xhr.response.message);
  //       this.setState({
  //         loading: false,
  //         user: xhr.response.user
  //       })
  //     }
  //   })
  //   xhr.send();
  // }
  render(){

    return(<div className="container">
    <br/>
      <h10>Your friend has invited you to shop!</h10>
      {(Auth.isUserAuthenticated() ?
        <div className="center-column">
          <div>
            <span><h7>It looks like you already have an account with us!</h7></span>
            <span><h7>Enter your information below to join the cart</h7></span>
            </div>
        <JoinCartLogin
          test={this.holder}/>
        </div> :
        <JoinCartSignUp/>)}
    </div>)
  }
}
export default JoinContainer;
