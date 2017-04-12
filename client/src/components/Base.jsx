import React, { PropTypes } from 'react';
import { Link, IndexLink } from 'react-router';
import Auth from '../modules/Auth';

function findCart() {
  console.log('hello can u hear me');

}


const Base = function({children}) {
  findCart();
  return (<div className="container">
      <div>
        <div className="nav-container">
          <div className="nav-logo-container">
            <z>Port</z>
          </div>
          <div className="link-container">
            <div><Link to="/" id="nav-link" >Home</Link></div>
            <div><Link to="/cart/58e7e45ee6333416735a8724" id="nav-link">Cart</Link></div>
            <div><Link to="/select" id="nav-link">Shop</Link></div>
            <div><Link to="/later" id="nav-link">More</Link></div>
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
      </div>)
}

  Base.propTypes = {
    children: PropTypes.object.isRequired
  };

  export default Base;
