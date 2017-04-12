import React, { PropTypes } from 'react';
import Products from '../components/Products.jsx';
import popupS from 'popups';

class Fonts extends React.Component{
  constructor(props) {
    super(props);
  }
  componentDidMount(){
  }
  render(){
    return (<div>
      <tele>Telegrafico, size 24</tele><br/>
      <yes>Yeseva, size 24</yes><br/>
      <nordica>Nordica, size 12</nordica><br/>
      <opi>Opificio, size 12</opi><br/>

    </div>)
  }
}
export default Fonts;
