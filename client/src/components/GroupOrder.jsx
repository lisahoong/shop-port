import React, { PropTypes } from 'react';
import { Link } from 'react-router';


class GroupOrder extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      startGroupOrder: props.startGroupOrder,
      onChange: props.onChange,
      onSubmit: props.onSubmit,
      getJoinLink: props.getJoinLink,
      orderStarted: false,
      cartLink:''
    }
    this.generateLink = this.generateLink.bind(this);
  }
  generateLink(e) {
    e.preventDefault();
    //do logic to return a cart
    //this.context.router.replace('/login');
    this.setState({
      orderStarted: true,
      cartLink: 'ahafhsbdvjfbd'
    })
    console.log('poop');
    return 'http://localhost:3000/join/58e55f05fe16946175fdd6c1';
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
  render() {
    if (!this.state.orderStarted) {
      return (<div>
        <button className="startcart-button" id="startBtn" onClick={this.state.startGroupOrder}>
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
                            Delivery
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
      <input type="text" id="copyTarget" value={this.state.cartLink}/>
      <button onClick={this.generateLink}>Copy</button>
    </div>)
  }

}
}
export default GroupOrder;
