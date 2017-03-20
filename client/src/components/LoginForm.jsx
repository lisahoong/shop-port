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
    <form action="/" onSubmit={onSubmit}>
      <h2 className="card-heading">Login</h2>

      {successMessage && <p className="success-message">{successMessage}</p>}
      {errors.summary && <p className="error-message">{errors.summary}</p>}

      <div className="field-line">
        <input type="text"
          placeholder="Email"
          name="email"
          onChange={onChange}
          value={user.email}
        />
      </div>

      <div className="field-line">
        <input type="password"
          placeholder="Password"
          name="password"
          onChange={onChange}
          value={user.password}
        />
      </div>

      <div className="button-line">
        <button type="submit">Log in</button>
      </div>

      <p>Don't have an account? <Link to={'/signup'}>Create one</Link>.</p>
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
