import React, { PropTypes } from 'react';
import Auth from '../modules/Auth';
import LoginForm from '../components/LoginForm.jsx';

class LoginPage extends React.Component {
  constructor(props, context) {
    super(props, context);

    const storedMessage = localStorage.getItem('successMessage');
    let successMessage = '';

    if (storedMessage) {
      successMessage = storedMessage;
      localStorage.removeItem('successMessage');
    }

    // set the initial component state
    this.state = {
      errors: {},
      successMessage,
      user: {
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

  processForm(e) {
    // prevent default action. in this case, action is the form submission event
    e.preventDefault();

    // create a string for an HTTP body message
    const email = encodeURIComponent(this.state.user.email);
    const password = encodeURIComponent(this.state.user.password);
    const formData = `email=${email}&password=${password}`;

    // create an AJAX request
    const xhr = new XMLHttpRequest();
    xhr.open('post', '/auth/login');
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    xhr.responseType = 'json';
    xhr.addEventListener('load', () => {
      if (xhr.status === 200) {
        // success

        // change the component-container state
        this.setState({
          errors: {}
        });

        // save the token
        Auth.authenticateUser(xhr.response.token);
        console.log('this login: ', this);
        // change the current URL to /
        //if the user has a cart param already, hit the shopping endpoint.
         if(this.state.cartRef){
           console.log("i reached this part wuhduhhell");

           this.context.router.replace('/select');
         }else{
           this.context.router.replace('/');
         }


      } else {
        // failure

        // change the component state
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

  render() {
    return (
      <LoginForm
        onSubmit={this.processForm}
        onChange={this.changeUser}
        errors={this.state.errors}
        successMessage={this.state.successMessage}
        user={this.state.user}
      />
    );
  }

}

LoginPage.contextTypes = {
  router: PropTypes.object.isRequired
};

export default LoginPage;
