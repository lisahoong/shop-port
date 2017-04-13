import React, { PropTypes } from 'react';
import { Link } from 'react-router';


class GroupOrder extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      startGroupOrder: props.startGroupOrder
    }
  }
  componentDidMount() {
    var modal = document.getElementById('myModal');

    // Get the button that opens the modal
    var btn = document.getElementById("startBtn");

    // Get the <span> element that closes the modal
    var span = document.getElementsByClassName("close")[0];

    // When the user clicks the button, open the modal
    btn.onclick = function() {
      modal.style.display = "block";
    }

    // When the user clicks on <span> (x), close the modal
    span.onclick = function() {
      modal.style.display = "none";
    }

    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function(event) {
      if (event.target == modal) {
        modal.style.display = "none";
      }
    }
  }
  render() {
    return (<div>
      <button className="startcart-button" id="startBtn" onClick={this.state.startGroupOrder}>
        Start a group order</button>

      <div id="myModal" className="modal">

        <div className="modal-content">
          <div className="modal-header">
            <span className="close">&times;</span>
            <h10>Let's get shopping!</h10>
            <br/>
          </div>
          <div className="modal-body">
            <p>Some text in the Modal Body</p>
            <p>Some other text...</p>
          </div>
          <div className="modal-footer">
            <h3>Send this link to your friends</h3>
          </div>
        </div>

      </div>

    </div>


  )

}
}
export default GroupOrder;
