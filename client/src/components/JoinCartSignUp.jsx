import React, { PropTypes } from 'react';
import { Link } from 'react-router';

function shareLink(name){
  var sProp=encodeURIComponent(name.trim())
  return `/signup/${sProp}`;
}

const JoinCart = function(props){
  return(<div>
    <form action="/" onSubmit={props.joinSign}>
      <div className='form-container'>
        <div className="center-column">
          <div className="form-field">
            <div className="form-title">First Name</div>
              <div>
                <input
                  type="text"
                  name="first"
                  onChange={props.onChange}
                  value={props.user.first}/>
              </div>
          </div>
          <div className="form-field">
            <div className="form-title">Last Name</div>
              <div>
                <input
                  type="text"
                  name="last"
                  onChange={props.onChange}
                  value={props.user.last}/>
              </div>
          </div>
          <div className="form-field">
            <div className="form-title">Email Address</div>
              <div>
                <input
                  type="text"
                  name="email"
                  onChange={props.onChange}
                  value={props.user.email}/>
              </div>
          </div>
          <div className="form-field">
            <div className="form-title">Password</div>
              <div>
                <input
                  type="password"
                  name="password"
                  onChange={props.onChange}
                  value={props.user.password}/>
              </div>
          </div>
        </div>
      </div>
      <button type="submit" className="pay-button">Create an account</button>
      
    </form>
  </div>)
}
export default JoinCart;
