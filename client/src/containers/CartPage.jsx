import React, { PropTypes } from 'react';
import CartCheckout from '../components/CartCheckout.jsx';
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
      cartObjArray: null,
      user: '',
      userName: '',
      userItems: null,
      userTotal: null
    }
  }
  calculateCurrentUserTotal() {

  }
  componentDidMount() {
    //logic to get data

    // const title = encodeURIComponent(item.title);
    // const link = encodeURIComponent(item.link);
    // const price = encodeURIComponent(item.price);
    // const merchantId = encodeURIComponent(item.merchantId);
    // const formData = `title=${title}&link=${link}&price=${price}&merchantId=${merchantId}`;
    //
    // const xhr = new XMLHttpRequest();
    // xhr.open('post', '/api/addcartitem');
    // xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    // xhr.setRequestHeader('Authorization', `bearer ${Auth.getToken()}`);
    // xhr.responseType = 'json';
    // xhr.addEventListener('load', () => {
    //   if (xhr.status === 200) {
    //     console.log('gottem');
    //   } else if (xhr.status === 401) {
    //     popupS.confirm({
    //       content:     'You must be logged in to start an order',
    //       labelOk:     'Cancel',
    //       labelCancel: 'Log in',
    //       onSubmit: function() {
    //         console.log(':)');
    //       },
    //       onClose: function() {
    //         console.log(':(');
    //       }
    //     });
    //   }
    // });
    // xhr.send(formData);

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
      userName: 'Shreesu',
      userItems: [{
        "title": "Mason Top",
        "price": "$15",
        "link": "http://www.brandymelvilleusa.com/mason-top-31-162.html",
        "src": "https://cdn.brandymelvilleusa.com/media/catalog/product/cache/1/image/414x621/9df78eab33525d08d6e5fb8d27136e95/m/c/mch014-31s1620000_3full.jpg",
        "url": "https://www.brandymelvilleusa.com/clothing"
      },
      {
        "title": "Alfie Turtleneck Top",
        "price": "$26",
        "link": "http://www.brandymelvilleusa.com/alfie-turtleneck-top-622-002r3.html",
        "src": "https://cdn.brandymelvilleusa.com/media/catalog/product/cache/1/image/414x621/9df78eab33525d08d6e5fb8d27136e95/m/j/mjb033o-622s00200r3_full.jpg",
        "url": "https://www.brandymelvilleusa.com/clothing"
      },
      {
        "title": "Hailie Top",
        "price": "$16",
        "link": "http://www.brandymelvilleusa.com/hailie-top-k27-002.html",
        "src": "https://cdn.brandymelvilleusa.com/media/catalog/product/cache/1/image/414x621/9df78eab33525d08d6e5fb8d27136e95/m/d/md159-k27s0020000_3full.jpg",
        "url": "https://www.brandymelvilleusa.com/clothing"
      }],
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
            "title": "Erica Sweatshirt",
            "price": "$28",
            "link": "http://www.brandymelvilleusa.com/erica-sweatshirt-st-l14.html",
            "src": "https://cdn.brandymelvilleusa.com/media/catalog/product/cache/1/image/414x621/9df78eab33525d08d6e5fb8d27136e95/i/m/img_0282-2.jpg",
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
}
createCharge() {
  console.log('creating charge');
}
render() {
  if (this.state.loading) {
    return <div>Loading...</div>
  }
  else {
    return (<div className="cart-container">
    {this.props.children}
    <div className="shared-info">
      <SharedCartInfo
        merchant={this.state.merchant}
        addressLine1={this.state.addressLine1}
        addressLine2={this.state.addressLine2}
        goal={this.state.minimum}
        subtotal={this.state.cartSubtotal}/>
    </div>
    <div className="allitems-container">
      <div className="cartitems-container">
        <CartItems
          userName={this.state.userName}
          userItems={this.state.userItems}
          userTotal={this.state.userTotal}
          payShare={this.createCharge.bind(this)}
          />

      </div>


      <div className="checkout-container">
        <CartCheckout/>
      </div>
    </div>
  </div>)
}
}
}

export default CartPage;
