import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import Dropdown from 'react-dropdown';
import Auth from '../modules/Auth';
import LOL from './LOL.jsx';

class LaughContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      target: ''
    }
  }
  laugh(e) {
    this.setState({
      target: e.target.name
    });
  }
  render() {
    return (<div>
      <h1>Let's laugh at someone</h1>
      <z>Who should we laugh at?</z>
      <div className="field-line">
        <input type="text" name="person" placeholder="suh"/>
      </div>
      {this.props.children}
      <LOL lol={"hab u seen shree"} />
    </div>)
  }
}

export default LaughContainer;
