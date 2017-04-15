import React, { PropTypes } from 'react';
import { Link } from 'react-router';

// <form>
//   <div className="group">
//     <label>
//       <span>Name</span>
//       <input name="cardholder-name" className="field" placeholder="Jane Doe" />
//     </label>
//     <br/>
//     <label>
//       <span>Phone</span>
//       <input className="field" placeholder="(123) 456-7890" type="tel" />
//     </label>
//   </div>
//   <div className="group">
//     <label>
//       <span>Card</span>
//       <div id="card-element" className="field"></div>
//     </label>
//   </div>
//   <button type="submit" onClick={onSubmit}>Pay $25</button>
//   <div className="outcome">
//     <div className="error"></div>
//     <div className="success">
//
//     </div>
//   </div>
// </form>


const PaymentForm = ({
  onSubmit,
  onChange,
  calculateTotal
}) => (
  <div className="container">
  <br/>
    <span><h10>Payment</h10></span>
    <span>Total: ${calculateTotal()}</span>
    <br/>
    <form action="/" onSubmit={onSubmit}>
      <div className='form-container'>
        <div className="form-field">
          <div className="payment-title">Name</div>
            <div>
              <input
                type="text"
                name="email"
                onChange={onChange}
                />
            </div>
        </div>
        <div className="form-field">
          <div className="payment-title">Phone Number</div>
            <div>
              <input
                type="tel"
                name="phone"
                onChange={onChange}
                />
            </div>
        </div>
        <div className="form-field">
          <div className="payment-title">Card</div>
            <div>
              <input
                type="text"
                name="email"
                onChange={onChange}
                />
            </div>
        </div>
      </div>
      <button type="submit" className="pay-button">Pay</button>
    </form>
  </div>
);

export default PaymentForm;
