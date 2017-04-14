import React, { PropTypes } from 'react';
import Auth from '../modules/Auth';
import popupS from 'popups';
import ProductsDisplay from '../components/ProductsDisplay.jsx';
import GroupOrder from '../components/GroupOrder.jsx';
import CartLink from '../components/CartLink.jsx';

class ShoppingContainer extends React.Component{
  constructor(props, context) {
    super(props, context);
    this.state = {
      products: [],
      storeName: '',
      joinLink: '',
      loading: true,
      linkGenerated: true
    }
    this.showInfo = this.showInfo.bind(this);
    this.linkGenerated = this.linkGenerated.bind(this);
  }
  componentDidMount() {
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
  startGroupOrder() {
    console.log('starting group order');
  }
  linkGenerated() {
    console.log('ok cart starteddddd');
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
  getJoinLink(e) {
    //e.preventDefault();
    //do logic to return a cart
    //this.context.router.replace('/login');

    return 'http://localhost:3000/join/58e55f05fe16946175fdd6c1';
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
        if (self.state.linkGenerated) {
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
          xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
          xhr.setRequestHeader('Authorization', `bearer ${Auth.getToken()}`);
          xhr.responseType = 'json';
          xhr.addEventListener('load', () => {
            if (xhr.status === 200) {
              console.log('gottem');
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
        console.log(':(');
      }      // gets called when popup is closed
    });


  }
  render(props){
    console.log('state: ', this.state.linkGenerated);

    return(<div className="products-container">
    {this.props.children}
    <div className="products-top">
      <GroupOrder
        onChange={this.fake}
        onSubmit={this.fake}
        getJoinLink={this.getJoinLink.bind(this)}
        linkGenerated={this.state.linkGenerated}
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


ShoppingContainer.contextTypes = {
  router: PropTypes.object.isRequired
};

export default ShoppingContainer;
