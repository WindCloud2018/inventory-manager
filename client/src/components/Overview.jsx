import React from 'react';
import LineChart from './LineChart';
import Chart from './Chart';
import RecentActivity from './RecentActivity';
import '../css/Overview.css';

const Overview = (props) => {
  return (
    <div className="overview-container">
      <div className="overview-left">
        <LineChart {...props} />
      </div>
      <div className="overview-right">
        <Chart {...props} />
      </div>
      <div className="overview-bottom">
        <RecentActivity {...props} />
      </div>
    </div>
  );
};

export default Overview;
