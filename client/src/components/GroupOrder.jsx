import React, { PropTypes } from 'react';
import { Link } from 'react-router';


class GroupOrder extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      triggerModal: props.triggerModal,
      onChange: props.onChange,
      onSubmit: props.onSubmit,
      getJoinLink: props.getJoinLink,
      orderStarted: props.cartAlreadyExists(),
      cartLink: 'place holder',
      newCartStarted: props.newCartStarted
    }
    this.generateLink = this.generateLink.bind(this);
    //this.linkGenerated = this.linkGenerated.bind(this);
  }
  generateLink(e) {
    e.preventDefault();

    //do logic to return a cart
    this.state.newCartStarted();
    this.setState({
      orderStarted: true,
      cartLink: 'http://localhost:3000/join/58f13be1b24f0e8516682bb8'
    })
  }
  componentDidMount() {
    if (!this.state.orderStarted) {
      var modal = document.getElementById('myModal');

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

  }
  copyToClipboard() {
    var elem = document.getElementById('copyTarget');
    // create hidden text element, if it doesn't already exist
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
  render() {
    var self = this;
    if (!this.state.orderStarted) {
      return (<div>
        <button className="startcart-button" id="startBtn" onClick={() => this.state.triggerModal}>
          Start a group order</button>

        <div id="myModal" className="modal">

          <div className="modal-content">
            <div className="modal-header">
              <span className="close">x</span>
              <h10>Let's get shopping!</h10>
              <br/>
            </div>
            <div className="modal-body">
              <p><span>Although multiple shoppers may join an order, </span>
              <span>Port orders can only be delivered to a single address.</span>
              <span>Please complete the form below and get shopping!</span></p>
              <div className="center-column">
                <form action="/" onSubmit={this.state.onSubmit}>
                  <div className='form-container'>
                    <div>
                      <div className="form-field">
                        <div className="form-title">Name</div>
                        <div>
                          <input
                            type="text"
                            name="name"
                            onChange={this.state.onChange}/>
                        </div>
                      </div>
                      <div className="form-field">
                        <div className="form-title">
                          <div>
                            Street
                          </div>
                          <div>Address</div>
                        </div>
                        <div>
                          <input
                            type="text"
                            name="address1"
                            onChange={this.state.onChange}/>
                        </div>
                      </div>
                      <div className="form-field">
                        <div className="form-title"></div>
                        <div>
                          <input
                            type="text"
                            name="address2"
                            onChange={this.state.onChange}/>
                        </div>
                      </div>
                      <div className="form-field">
                        <div className="form-title">City</div>
                        <div>
                          <input
                            type="text"
                            name="city"
                            onChange={this.state.onChange}/>
                        </div>
                      </div>
                      <div className="form-field">
                        <div className="form-title">State</div>
                        <div>
                          <input
                            type="text"
                            name="state"
                            onChange={this.state.onChange}/>
                        </div>
                      </div>
                      <div className="form-field">
                        <div className="form-title">Zip Code</div>
                        <div>
                          <input
                            type="text"
                            name="zip"
                            onChange={this.state.onChange}/>
                        </div>
                      </div>
                      <div className="form-field">
                        <div className="form-title">Phone</div>
                        <div>
                          <input
                            type="tel"
                            name="phone"
                            onChange={this.state.onChange}/>
                        </div>
                      </div>
                    </div>
                  </div>
                  <button type="submit" className="pay-button"
                    onClick={this.generateLink}>Generate your cart link</button>
                </form>
              </div>
            </div>
            <div className="modal-footer">
            </div>
          </div>
        </div>
      </div>
    )
  } else  {
    return (<div>
      <h10>Your shared cart link: </h10>
      <input className="link-input" type="text" id="copyTarget"
        value={this.state.cartLink}/>
      <button className="pay-button" onClick={this.copyToClipboard}>Copy</button>
    </div>)
  }

}
}
export default GroupOrder;
