import React, { PropTypes } from 'react';
import { Link } from 'react-router';

// (
//   <div className="container">
//     <form action="/" onSubmit={onSubmit}>
//       <h3 className="card-heading">Sign Up</h3>
//
//       {errors.summary && <p className="error-message">{errors.summary}</p>}
//
//       <div className="field-line">
//         <input type="text"
//           placeholder="Name"
//           name="name"
//           onChange={onChange}
//           value={user.name}
//         />
//       </div>
//
//       <div className="field-line">
//         <input type="text"
//           placeholder="Email"
//           name="email"
//           onChange={onChange}
//           value={user.email}
//         />
//       </div>
//
//       <div className="field-line">
//         <input type="text"
//           placeholder="Password"
//           type="password"
//           name="password"
//           onChange={onChange}
//           value={user.password}
//         />
//       </div>
//
//       <div className="button-line">
//         <button type="submit">Create an account</button>
//       </div>
//
//       <p>Already have an account? <Link to={'/login'}>Log in</Link></p>
//     </form>
//   </div>
// );

const SignUpForm = ({
  onSubmit,
  onChange,
  message,
  errors,
  user,
}) => (<div className="container">
<br/>
  <h10>{message}</h10>
  <form action="/" onSubmit={onSubmit}>
    <div className='form-container'>
      <div className="center-column">
        <div className="form-field">
          <div className="form-title">First Name</div>
            <div>
              <input
                type="text"
                name="first"
                onChange={onChange}
                value={user.first}/>
            </div>
        </div>
        <div className="form-field">
          <div className="form-title">Last Name</div>
            <div>
              <input
                type="text"
                name="last"
                onChange={onChange}
                value={user.last}/>
            </div>
        </div>
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
    </div>
    <button type="submit" className="pay-button">Create an account</button>
    <p>Already have an account? <Link id="reg-link" to={'/login'}><b>Log in</b></Link></p>
  </form>
</div>
)

SignUpForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired
};

export default SignUpForm;
