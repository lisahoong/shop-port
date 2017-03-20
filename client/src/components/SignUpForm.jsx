import React, { PropTypes } from 'react';
import { Link } from 'react-router';

const SignUpForm = ({
  onSubmit,
  onChange,
  errors,
  user,
}) => (
  <div className="container">
    <form action="/" onSubmit={onSubmit}>
      <h2 className="card-heading">Sign Up</h2>

      {errors.summary && <p className="error-message">{errors.summary}</p>}

      <div className="field-line">
        <input type="text"
          placeholder="Name"
          name="name"
          onChange={onChange}
          value={user.name}
        />
      </div>

      <div className="field-line">
        <input type="text"
          placeholder="Email"
          name="email"
          onChange={onChange}
          value={user.email}
        />
      </div>

      <div className="field-line">
        <input type="text"
          placeholder="Password"
          type="password"
          name="password"
          onChange={onChange}
          value={user.password}
        />
      </div>

      <div className="button-line">
        <button type="submit">Create an account</button>
      </div>

      <p>Already have an account? <Link to={'/login'}>Log in</Link></p>
    </form>
  </div>
);

SignUpForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired
};

export default SignUpForm;
