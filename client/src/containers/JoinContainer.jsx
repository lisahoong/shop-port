import React, { PropTypes } from 'react';
import Products from '../components/Products.jsx';
import Auth from '../modules/Auth';
import popupS from 'popups';
import JoinCart from '../components/JoinCart.jsx';
class JoinContainer extends React.Component{
  constructor(props, context) {
    super(props, context);
    this.state = {
      loading: true,
      user:null
    }
  }
  componentDidMount(){
    const xhr = new XMLHttpRequest();
    xhr.open('get', '/auth/join/'+this.props.params.cart);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.responseType = 'json';
    xhr.addEventListener('load', () => {
      if (xhr.status === 200){
        console.log('im loading da url');
        console.log('message ', xhr.response.message);
        this.setState({
          loading: false,
          user: xhr.response.user
        })
      }
    })
    xhr.send();
  }
  render(){
    console.log("HJGVFC" + this.props.params.cart);
    return<div>
      <JoinCart user={this.state.user} cart={this.props.params.cart}/>
    </div>
  }
}
export default JoinContainer;
