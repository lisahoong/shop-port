import React, { PropTypes } from 'react';
import { Link } from 'react-router';

const PaymentForm = ({
  onSubmit,
  onChange,
  errors,
  user,
}) => (
  <form>
    <div className="group">
      <label>
        <span>Name</span>
        <input name="cardholder-name" className="field" placeholder="Jane Doe" />
      </label>
      <br/>
      <label>
        <span>Phone</span>
        <input className="field" placeholder="(123) 456-7890" type="tel" />
      </label>
    </div>
    <div className="group">
      <label>
        <span>Card</span>
        <div id="card-element" className="field"></div>
      </label>
    </div>
    <button type="submit" onClick={onSubmit}>Pay $25</button>
    <div className="outcome">
      <div className="error"></div>
      <div className="success">

      </div>
    </div>
  </form>
);

// SignUpForm.propTypes = {
//   onSubmit: PropTypes.func.isRequired,
//   onChange: PropTypes.func.isRequired,
//   errors: PropTypes.object.isRequired,
//   user: PropTypes.object.isRequired
// };

export default PaymentForm;
