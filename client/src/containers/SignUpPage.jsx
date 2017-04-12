import React, { PropTypes } from 'react';
import SignUpForm from '../components/SignUpForm.jsx';

class SignUpPage extends React.Component {

  /**
   * Class constructor.
   */
  constructor(props, context) {
    super(props, context);

    // set the initial component state
    this.state = {
      loading: true,
      errors: {},
      user: {
        first: '',
        last: '',
        email: '',
        password: ''
      },
      cartRef:''
    };

    this.processForm = this.processForm.bind(this);
    this.changeUser = this.changeUser.bind(this);
  }
  componentDidMount(){
    this.setState({
      loading: false,
      cartRef: this.props.params.cartId
    });
  }
  withParam(){
    const xhr = new XMLHttpRequest();
    console.log("OMG WHAT ARE YOU "+this.state.cartRef);
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

  changeUser(e) {
    const field = e.target.name;
    const user = this.state.user;
    user[field] = e.target.value;

    this.setState({
      user
    });
  }

  /**
   * Render the component.
   */
  render() {
    return (
      <SignUpForm
        onSubmit={this.processForm}
        onChange={this.changeUser}
        errors={this.state.errors}
        user={this.state.user}
      />
    );
  }

}

SignUpPage.contextTypes = {
  router: PropTypes.object.isRequired
};

export default SignUpPage;
