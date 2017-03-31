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

      console.log(this.props.params.merchName)
      // use this to get DATUHHHB

    const xhr = new XMLHttpRequest();
    xhr.open('get', '/auth/findProductsByName/'+this.props.params.merchName);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.responseType = 'json';
    xhr.addEventListener('load', () => {
      if (xhr.status === 200) {
        console.log('success ', xhr.response.message);
        this.setState({
          products: xhr.response.products,
          loading: false
        });
      }
      else {
        console.log('error');
      }
    });
    xhr.send();
  }

  showInfo(item) {
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
        xhr.open('post', '/api/addcartitem');
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        xhr.setRequestHeader('Authorization', `bearer ${Auth.getToken()}`);
        xhr.responseType = 'json';
        xhr.addEventListener('load', () => {
          if (xhr.status === 200) {

            //clurs heres
            console.log('gottem');
          } else if (xhr.status === 401) {
            popupS.confirm({
              content:     'You must be logged in to start an order',
              labelOk:     'Cancel',
              labelCancel: 'Log in',
              onSubmit: function() {

                console.log(':) ** 400 err');
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
