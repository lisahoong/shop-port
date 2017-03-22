import React, { PropTypes } from 'react';
import { Link } from 'react-router';

const Dashboard = ({ secretData }) => (
  <div className="dashboard-container">
    <div id="border-btm">
      <z>Your Account</z>
    </div>
    <div className="dashboard-content-container">
      <div className="acct-nav-container">
        <div><Link to="/" id="side-link">My Account</Link></div>
        <div><Link to="/" id="side-link">Order History</Link></div>
        <div><Link to="/" id="side-link">Settings</Link></div>
      </div>

      <div className="acct-content-container">
        <z>content</z>
        {secretData && <p>{secretData}</p>}
      </div>
    </div>
  </div>
);

Dashboard.propTypes = {
  secretData: PropTypes.string.isRequired
};

export default Dashboard;
