import React, { PropTypes } from 'react';
import SelectMerchantMenu from '../components/SelectMerchantMenu.jsx';


class SelectMerchantPage extends React.Component {

  constructor(props, context) {
    super(props, context);
    this.state = {
      merchant: null
    }
  }
  componentDidMount() {
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
        this.setState({
          merchants: xhr.response.allmerchants
        });
      }
    });
    xhr.send();
  }
  render() {
    return (
      <SelectMerchantMenu
        merchants={this.state.merchants}
      />
    );
  }
}

export default SelectMerchantPage;
