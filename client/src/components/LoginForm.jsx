import React, { PropTypes } from 'react';
import { Link } from 'react-router';

const LoginForm = ({
  onSubmit,
  onChange,
  errors,
  successMessage,
  user
}) => (
  <div className="container">
  <br/>
    <h10>Welcome back</h10>
    <br/>
    <form action="/" onSubmit={onSubmit}>
      <div className='form-container'>
        <div className="form-field">
          <div className="form-title">Email Address</div>
            <div>
              <input
                type="text"
                name="email"
                onChange={onChange}
                value={user.email}/>
            </div>
        </div>
        <div className="form-field">
          <div className="form-title">Password</div>
            <div>
              <input
                type="password"
                name="password"
                onChange={onChange}
                value={user.password}/>
            </div>
        </div>
      </div>
      <button type="submit" className="pay-button">Login</button>
      <p>New to Port? <Link id="reg-link" to={'/signup'}><b>Sign up</b></Link></p>
    </form>
  </div>
);

LoginForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  successMessage: PropTypes.string.isRequired,
  user: PropTypes.object.isRequired
};

export default LoginForm;
