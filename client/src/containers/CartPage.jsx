import React, { PropTypes } from 'react';
import Auth from '../modules/Auth';
import OtherUserItems from '../components/OtherUserItems.jsx';
import OtherItems from '../components/OtherItems.jsx';
import PaymentForm from '../components/PaymentForm.jsx';
import CartItems from '../components/CartItems.jsx';
import SharedCartInfo from '../components/SharedCartInfo.jsx';

class CartPage extends React.Component {
  constructor() {
    super();
    this.state = {
      loading: true,
      merchant: '',
      addressLine1: '',
      addressLine2: '',
      minimum: null,
      cartSubtotal: null,
      adminId: null,
      otherItems: null,
      cartObjArray: [],
      user: '',
      userName: '',
      otherItemsLoading: true,
      userItems: null,
      userTotal: null,
      userPaying: false
    }
    this.remove = this.remove.bind(this);
  }
componentDidMount() {
    //logic to get data
    this.getUserItems();
    this.getOtherItems();
}
calculateCurrentUserTotal() {
  var total = 0;
  this.state.userItems.forEach(function(item) {
    console.log(item.price);
    console.log('total: ', total);
    total += parseInt(item.price);
  })
  return total;
}
getOtherItems() {
  const xhr = new XMLHttpRequest();
  xhr.open('get', '/api/organizecart/');
  xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
  xhr.setRequestHeader('Authorization', `bearer ${Auth.getToken()}`);
  xhr.responseType = 'json';
  xhr.addEventListener('load', () => {
    if (xhr.status === 200) {
      console.log('ITEMS: ', xhr.response.returnedArray);
      this.setState({
        otherItemsLoading: false,
        otherItems: [...xhr.response.returnedArray]
      })
    } else {
      console.log('error');
    }
  });
  xhr.send();
}
getUserItems() {
  const xhr = new XMLHttpRequest();
  xhr.open('get', '/api/getUserItems');
  xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
  xhr.setRequestHeader('Authorization', `bearer ${Auth.getToken()}`);
  xhr.responseType = 'json';
  xhr.addEventListener('load', () => {
    if (xhr.status === 200) {
      this.setState({
        loading: false,
        merchant: 'Brandy Melville',
        addressLine1: '329 12th Street',
        addressLine2: 'San Francisco, CA 94103',
        minimum: 100,
        cartSubtotal: 70,
        userTotal: 57,
        adminId: 'Moose',
        user: '789',
        userName: 'Abhi',
        userItems: xhr.response.userItems,
    })
    } else {
      console.log('error');
    }
  });
  xhr.send();
}
remove(item) {
  console.log('removing item', item.productName);
  const title = encodeURIComponent(item.productName);
  const formData = `title=${title}`;

  const xhr = new XMLHttpRequest();
  xhr.open('post', '/api//removecartitem/');
  xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
  xhr.setRequestHeader('Authorization', `bearer ${Auth.getToken()}`);
  xhr.responseType = 'json';
  xhr.addEventListener('load', () => {
    if (xhr.status === 200) {
      console.log('you successfully removed an item');
    } else {
      console.log('could not remove');
    }
  });
  xhr.send(formData);
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
createCharge() {
  console.log('creating charge');
}
clickedPay() {
  console.log('user wants to pay');
  this.setState({
    userPaying: true
  })
}
userSubmitted() {

}
render() {
  if (this.state.loading) {
    return <div>Loading...</div>
  }
  else {
    return (<div className="cart-container">
    {this.props.children}

      <SharedCartInfo
        merchant={this.state.merchant}
        addressLine1={this.state.addressLine1}
        addressLine2={this.state.addressLine2}
        goal={this.state.minimum}
        subtotal={this.state.cartSubtotal}/>

    <div className="allitems-container">
      <div className="cartitems-container">
        <CartItems
          userName={this.state.userName}
          userItems={this.state.userItems}
          userTotal={this.state.userTotal}
          remove={this.remove}
          clickedPay={this.clickedPay.bind(this)}
          calculateTotal={this.calculateCurrentUserTotal.bind(this)}
          payShare={this.createCharge.bind(this)}
          />

      </div>


      <div className="checkout-container">
        {(this.state.userPaying) ? (<PaymentForm
          onChange={this.fillForm}
          onSubmit={this.processForm}
          calculateTotal={this.calculateCurrentUserTotal.bind(this)}
        />) : <OtherUserItems
        otherItems={this.state.otherItems}
        loading={this.state.otherItemsLoading}/>}
      </div>
    </div>
  </div>)
}
}
}

export default CartPage;
