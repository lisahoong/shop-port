import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import Dropdown from 'react-dropdown';
import Auth from '../modules/Auth';
import LOL from './LOL.jsx';

class ToDoList extends React.Component {
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
    return (<div className="bullets">
      <h1>Coming soon...</h1>
      <ul>
        <li>New user join friend's --> signup --> merchant's products</li>
        <li>Calculating appropriate discounts</li>
        <li>Admin privileges/views</li>
        <li>Better UI lol</li>
        <li>And more things that I am too lazy to type</li>
        <li></li>
      </ul>
    </div>)
  }
}

export default ToDoList;
