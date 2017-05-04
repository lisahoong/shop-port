import React, { PropTypes } from 'react';
import Auth from '../modules/Auth';
import popupS from 'popups';
import {Link} from 'react-router'
import ProductsDisplay from '../components/ProductsDisplay.jsx';
import GroupOrder from '../components/GroupOrder.jsx';
import CartLink from '../components/CartLink.jsx';

class ShoppingContainer extends React.Component{
  constructor(props, context) {
    super(props, context);
    this.state = {
      products: [],
      storeName: '',
      hasAccount: false,
      userCart: null,
      joinLink: '',
      loading: true,
      linkGenerated: false,
      userLoading: true,
      cartLinkToShare: '',
      cart: '58f4319619f79e4d3dbb7fe1'
    }
    this.showInfo = this.showInfo.bind(this);
    this.checkUser = this.checkUser.bind(this);
    this.newCartStarted = this.newCartStarted.bind(this);
  }
  componentDidMount() {
    this.checkUser();
    console.log('merchant is: ', this.props.params.person)
    // use this to get DATUHHHB

    const xhr = new XMLHttpRequest();
    xhr.open('get', '/auth/findProductsByName/'+this.props.params.person);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.responseType = 'json';
    xhr.addEventListener('load', () => {
      if (xhr.status === 200) {
        console.log('success ', xhr.response.message);
        this.setState({
          products: xhr.response.products,
          storeName: this.props.params.merchName,
          loading: false
        });
      }
      else {
        console.log('error');
      }
    });
    xhr.send();
  }

  checkUser() {
    console.log('alright checking user stats');
    if (Auth.isUserAuthenticated()) {
      const xhr = new XMLHttpRequest();
      xhr.open('get', '/api/checkUser/');
      xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
      xhr.setRequestHeader('Authorization', `bearer ${Auth.getToken()}`);
      xhr.responseType = 'json';
      xhr.addEventListener('load', () => {
        if (xhr.status === 200) {
          if (xhr.response.userCart) {
            this.setState({
              userLoading: false,
              hasAccount: true,
              userCart: xhr.response.userCart,
              cartLinkToShare: 'http://localhost:3000/join/' + xhr.response.userCart
            })
          }
          else {
            this.setState({
              userLoading: false,
              hasAccount: true
            })
          }
        }
      })
      xhr.send();
    }
  }

  copyLink(elem) {
    var targetId = "_hiddenCopyText_";
    var isInput = elem.tagName === "INPUT" || elem.tagName === "TEXTAREA";
    var origSelectionStart, origSelectionEnd;
    if (isInput) {
      // can just use the original source element for the selection and copy
      target = elem;
      origSelectionStart = elem.selectionStart;
      origSelectionEnd = elem.selectionEnd;
    } else {
      // must use a temporary form element for the selection and copy
      target = document.getElementById(targetId);
      if (!target) {
        var target = document.createElement("textarea");
        target.style.position = "absolute";
        target.style.left = "-9999px";
        target.style.top = "0";
        target.id = targetId;
        document.body.appendChild(target);
      }
      target.textContent = elem.textContent;
    }
    // select the content
    var currentFocus = document.activeElement;
    target.focus();
    target.setSelectionRange(0, target.value.length);

    // copy the selection
    var succeed;
    try {
      succeed = document.execCommand("copy");
    } catch(e) {
      succeed = false;
    }
    // restore original focus
    if (currentFocus && typeof currentFocus.focus === "function") {
      currentFocus.focus();
    }

    if (isInput) {
      // restore prior selection
      elem.setSelectionRange(origSelectionStart, origSelectionEnd);
    } else {
      // clear temporary content
      target.textContent = "";
    }
    return succeed;
  }
  fake(e) {
    e.preventDefault();
    console.log('ha');
  }
  fake2(e) {
    console.log('poopy pants');
  }
  fake3(){
    console.log('ahahahahaah');
  }

  newCartStarted() {

    const address = encodeURIComponent({
      line1: '221 7th Street',
      line2: '',
      city: 'San Francisco',
      state: 'CA',
      zip: '94103'
    });
    const merchantId = encodeURIComponent('58d1c45db31f3e83b68ad789');
    const formData = `address=${address}&merchantId=${merchantId}`;

    const xhr = new XMLHttpRequest();
    xhr.open('post', '/api/startOrder/');
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.setRequestHeader('Authorization', `bearer ${Auth.getToken()}`);
    xhr.responseType = 'json';
    xhr.addEventListener('load', () => {
      if (xhr.status === 200) {
        console.log('alright the user now has a cart');
        this.setState({
          cartLinkToShare: 'http://localhost:3000/join/' + xhr.response.newCartLink
        })
      }
      else {
        console.log('error');
      }
    });
    xhr.send();


  }

  showInfo(item) {
    var self = this;
    popupS.confirm({
      mode: 'modal-ajax ',
      title: item.title,
      // content : {
      //   tag: 'img#himalaya.picture',
      //   src: 'https://youthtextingculture.files.wordpress.com/2016/04/screen-shot-2015-08-15-at-4-12-02-am.png'
      // },
      content: 'hallo this should display item description but unfortunately we are not quite there yet',
      labelOk: 'Add to cart',
      labelCancel: 'Cancel',
      additionalButtonOkClass: 'ok-button',
      additionalButtonCancelClass: 'cancel-button',
      ajax : {                        // only available for mode: 'modal-ajax'
        url : 'http://url.com',
        post : true,
        str : 'post=true'
      },
      //onOpen: function(){},      // gets called when popup is opened
      onSubmit: function(){
        if (self.state.userCart) {
          console.log(':)');
          const title = encodeURIComponent(item.title);
          const link = encodeURIComponent(item.link);
          const src = encodeURIComponent(item.src);
          const price = encodeURIComponent(item.price);
          const address = encodeURIComponent({});
          const merchantId = encodeURIComponent(item.merchantId);
          const formData = `title=${title}&link=${link}&price=${price}&src=${src}&address=${address}&merchantId=${merchantId}`;

          const xhr = new XMLHttpRequest();
          xhr.open('post', '/api/addcartitem');
          //xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
          xhr.setRequestHeader('Authorization', `bearer ${Auth.getToken()}`);
          xhr.responseType = 'json';
          xhr.addEventListener('load', () => {
            if (xhr.status === 200) {
              alert("something added!")
            } else if (xhr.status === 401) {
              popupS.confirm({
                content:     'You must be logged in to start an order',
                labelOk:     'Cancel',
                labelCancel: 'Log in',
                onSubmit: function() {
                  console.log(':)');
                },
                onClose: function() {
                  console.log(':(');
                }
              });
            }
          });
          xhr.send(formData);
        }
        else {
          alert('You must start a group cart in order to add items!')
        }

      }, // gets called when submitted. val as an paramater for prompts
      onClose: function(){
        console.log(':( item not added');
      }      // gets called when popup is closed
    });
  }
  startGroupOrder() {
    console.log('starting group order');
  }
  render(props){
    if (this.state.userLoading) {
      return (<div>Loading...</div>)
    } else {
      return (<div className="products-container">
      {this.props.children}
      <div className="products-top">
        <GroupOrder
          onChange={this.fake2}
          onSubmit={this.fake}
          hasAccount={this.state.hasAccount}
          hasCartRef={this.state.userCart}
          newCartStarted={this.newCartStarted}
          cartLinkToShare={this.state.cartLinkToShare}
          triggerModal={this.startGroupOrder.bind(this)}/>
      </div>
      <ProductsDisplay
        data="hello"
        items={this.state.products}
        showInfo={this.showInfo}
        />
    </div>)
    }
}
}


ShoppingContainer.contextTypes = {
  router: PropTypes.object.isRequired
};

export default ShoppingContainer;
