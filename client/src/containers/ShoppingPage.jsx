import React, { PropTypes } from 'react';
import Products from '../components/Products.jsx';
import Auth from '../modules/Auth';
import popupS from 'popups';

class ShoppingPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      products: [],
      loading: true
    }
  }

  componentDidMount() {
    var clothes = [
      {
        title: "Adalia Tank",
        price: "$18",
        link: "http://www.brandymelvilleusa.com/adalia-tank-467-002.html",
        src: "https://cdn.brandymelvilleusa.com/media/catalog/product/cache/1/image/414x621/9df78eab33525d08d6e5fb8d27136e95/m/d/md073-467s0020000_f.jpg"
      },
      {
        title: "Linda Dress",
        price: "$38",
        link: "http://www.brandymelvilleusa.com/linda-dress-g08-071-y12.html",
        src: "https://cdn.brandymelvilleusa.com/media/catalog/product/cache/1/image/414x621/9df78eab33525d08d6e5fb8d27136e95/m/d/md320-g08s07100y12_3full.jpg"
      },
      {
        title: "Jillian Tank",
        price: "$16",
        link: "http://www.brandymelvilleusa.com/jillian-tank-795-122.html",
        src: "https://cdn.brandymelvilleusa.com/media/catalog/product/cache/1/image/414x621/9df78eab33525d08d6e5fb8d27136e95/m/w/mw861-795s1220000_b.jpg"
      },
      {
        title: "James Tank",
        price: "$15",
        link: "http://www.brandymelvilleusa.com/james-tank-550-229mz.html",
        src: "https://cdn.brandymelvilleusa.com/media/catalog/product/cache/1/image/414x621/9df78eab33525d08d6e5fb8d27136e95/m/l/mla168-550s22900mz_.jpg"
      }
    ]

    this.setState({
      products: clothes,
      loading: false
    });
  }

  showInfo(item) {
    popupS.confirm({
      mode: 'modal-ajax ',
      title: item.title,
      // content : {
      //   tag: 'img#himalaya.picture',
      //   src: 'https://youthtextingculture.files.wordpress.com/2016/04/screen-shot-2015-08-15-at-4-12-02-am.png'
      // },
      content: 'hallo',
      labelOk: 'Add to cart',
      labelCancel: 'Cancel',
      additionalButtonOkClass: 'additionalButton',
      ajax : {                        // only available for mode: 'modal-ajax'
        url : 'http://url.com',
        post : true,
        str : 'post=true'
      },
      //onOpen: function(){},      // gets called when popup is opened
      onSubmit: function(){
        console.log(':)');
        const title = encodeURIComponent(item.title);
        const link = encodeURIComponent(item.link);
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

      }, // gets called when submitted. val as an paramater for prompts
      onClose: function(){
        console.log(':(');
      }      // gets called when popup is closed
    });
  }

  render() {

    if (this.state.loading) {
      return (<div>Loading...</div>)
    } else return (
      <Products
        items={this.state.products}
        showInfo={this.showInfo}
        />
    )
  }
}

export default ShoppingPage;
