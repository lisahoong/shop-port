import React, { PropTypes } from 'react';
import { Link, IndexLink } from 'react-router';
import Auth from '../modules/Auth';

const Base = ({children}) => (
  <div className="container">

    <div>
      <div className="nav-container">
        <div className="nav-logo-container">
          <z>Port</z>
        </div>

        <div className="link-container">
          <div><Link to="/" id="nav-link" >Home</Link></div>
          <div><Link to="/shop" id="nav-link">Select</Link></div>
          <div><Link to="/shop" id="nav-link">Shop</Link></div>
          {Auth.isUserAuthenticated() ?
            (<div><Link to="/logout" id="nav-link">Log out</Link></div>) :
            (<div><Link to="/login" id="nav-link">Log in</Link></div>)}
          {!Auth.isUserAuthenticated() &&
              (<div><Link to="/signup" id="nav-link">Sign up</Link></div>)}
          </div>
        </div>
      </div>

      <div className="content-container">
        {children}
      </div>
    </div>
  );

  Base.propTypes = {
    children: PropTypes.object.isRequired
  };

  export default Base;
