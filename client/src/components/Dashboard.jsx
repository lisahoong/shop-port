import React, { PropTypes } from 'react';

const Dashboard = ({ secretData }) => (
  <div className="container">
    <div>
      <h1>dashboard here</h1>
        {secretData && <p style={{fontSize: '16px', color: 'pink'}}>
        {secretData}
      </p>}
    </div>
</div>
);

Dashboard.propTypes = {
  secretData: PropTypes.string.isRequired
};

export default Dashboard;
