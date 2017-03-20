import React, { PropTypes } from 'react';
import { Card, CardTitle, CardText } from 'material-ui/Card';

const Dashboard = ({ secretData }) => (
  <Card className="container">
    <CardTitle
      title="Dashboard"
      subtitle="You should have access to this page after authentication."
      />

    {secretData && <CardText style={{fontSize: '16px', color: 'pink'}}>
    {secretData}
    </CardText>}
  </Card>
);

Dashboard.propTypes = {
  secretData: PropTypes.string.isRequired
};

export default Dashboard;
