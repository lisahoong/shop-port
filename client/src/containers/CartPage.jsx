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
  console.log('hihihihih');
  const xhr = new XMLHttpRequest();
  xhr.open('post', 'api/organizecart/'+this.props.params.cartId);
  xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
  xhr.setRequestHeader('Authorization', `bearer ${Auth.getToken()}`);
  xhr.responseType = 'json';
  xhr.addEventListener('load', () => {
    if (xhr.status === 200) {
      console.log('other stuff:', xhr.response.returnedArr);
      this.setState({
        otherItems: xhr.response.returnedArr
      })
    } else {
      console.log('error');
    }
  })
  xhr.send();
}
getUserItems() {
  console.log('getting user items');
  const cart = encodeURIComponent(this.props.params.cartId);
  const formData = `cart=${cart}`;

  const xhr = new XMLHttpRequest();
  xhr.open('post', '/api/getUserItems');
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
        cartObjArray: [{
          name: 'Lisa',
          id: '123',
          items: [
            {
              "title": "Chloe Top",
              "price": "$18",
              "link": "http://www.brandymelvilleusa.com/chloe-top-698-002-r3.html",
              "src": "https://cdn.brandymelvilleusa.com/media/catalog/product/cache/1/image/414x621/9df78eab33525d08d6e5fb8d27136e95/m/l/mla002-698s00200r3_f.jpg",
              "url": "https://www.brandymelvilleusa.com/clothing"
            },
            {
              "title": "Danny Denim",
              "price": "$28",
              "link": "http://www.brandymelvilleusa.com/erica-sweatshirt-st-l14.html",
              "src": "https://cdn.brandymelvilleusa.com/media/catalog/product/cache/1/image/414x621/9df78eab33525d08d6e5fb8d27136e95/m/d/md195-343s0720000_3f.jpg",
              "url": "https://www.brandymelvilleusa.com/clothing"
            },
            {
              "title": "Cassidy Top",
              "price": "$15",
              "link": "http://www.brandymelvilleusa.com/cassidy-top-r629-002.html",
              "src": "https://cdn.brandymelvilleusa.com/media/catalog/product/cache/1/image/414x621/9df78eab33525d08d6e5fb8d27136e95/m/g/mgz576-r629s0020000_2f.jpg",
              "url": "https://www.brandymelvilleusa.com/clothing"
            }
          ],
          status: 'ordering'
        },
        {
          name: 'Claire',
          id: '456',
          items: [
            {
              "title": "Acacia Rainbow Top",
              "price": "$26",
              "link": "http://www.brandymelvilleusa.com/acacia-top-622-b76-b197.html",
              "src": "https://cdn.brandymelvilleusa.com/media/catalog/product/cache/1/image/414x621/9df78eab33525d08d6e5fb8d27136e95/m/j/mjb033n-622sb7600b197_bf3.jpg",
              "url": "https://www.brandymelvilleusa.com/clothing"
            },
            {
              "title": "Ahern Top",
              "price": "$23",
              "link": "http://www.brandymelvilleusa.com/ahern-top-r405-002.html",
              "src": "https://cdn.brandymelvilleusa.com/media/catalog/product/cache/1/image/414x621/9df78eab33525d08d6e5fb8d27136e95/m/g/mgz328-r405s0020000_full.jpg",
              "url": "https://www.brandymelvilleusa.com/clothing"
            }
          ],
          status: 'ordering'
        },
      ]
    })
    } else {
      console.log('error');
    }
  });
  xhr.send(formData);
}
remove(item) {
  console.log('removing item', item.productName);
  console.log('cart: ', this.props.params.cartId);
  const title = encodeURIComponent(item.productName);
  const formData = `title=${title}`;

  const xhr = new XMLHttpRequest();
  xhr.open('post', '/api//removecartitem/'+this.props.params.cartId);
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
        otherItems={this.state.cartObjArray}/>}
      </div>
    </div>
  </div>)
}
}
}

export default CartPage;
