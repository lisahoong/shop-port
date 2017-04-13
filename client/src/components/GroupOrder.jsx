import React, { PropTypes } from 'react';
import { Link } from 'react-router';


class GroupOrder extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      startGroupOrder: props.startGroupOrder
    }
  }
  render() {
    return (<div>
      <button className="startcart-button" id="group" onClick={this.state.startGroupOrder}>
        Start a group order</button>
    </div>)
  }
}
export default GroupOrder;
