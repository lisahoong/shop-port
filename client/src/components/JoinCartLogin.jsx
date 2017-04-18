import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import SignUpPage from '../containers/SignUpPage.jsx';


// <div>
// <h1>  join {props.user}&#39;s cart </h1>
// <div> <Link to={shareLink(props.cart)} id="nav-link"> Make your friend click this</Link></div>
// <br/>
// <c>Sorry this page looks like ass. It&#39;s just temporary &hearts;</c>
// </div>

function shareLink(name){
  var sProp=encodeURIComponent(name.trim())
  return `/signup/${sProp}`;
}
const JoinCart = function(props){
  return(<div className='center-column'>
  <br/>
    <form action="/" onSubmit={props.test}>
      <div className="form-container">
        <div className="form-field">
          <div className="form-title">Name</div>
          <div>
            <input
              type="text"
              name="name"
              onChange={props.test}
              />
          </div>
        </div>
        <div className="form-field">
          <div className="form-title">Phone</div>
          <div>
            <input
              type="text"
              name="name"
              onChange={props.test}
              />
          </div>
        </div>
      </div>
      <button type="submit" className="pay-button">Join Now!</button>
    </form>
  </div>)
}
export default JoinCart;
