import React, { PropTypes } from 'react';
import { Link } from 'react-router';

function shareLink(name){
  var sProp=encodeURIComponent(name.trim())
  return `/signup/${sProp}`;
}

const JoinCart = function(props){
  return(<div>
    <form action="/" onSubmit={onLoginSubmit}>
      <div className="form-container">
        <div className="form-field">
          <div className="form-title">Name</div>
          <div>
            <input
              type="text"
              name="name"
              onChange={onLoginChange}
              />
          </div>
        </div>
      </div>
    </form>
  </div>)
}
export default JoinCart;
