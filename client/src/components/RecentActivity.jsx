import React from 'react';
import RecentOrders from './RecentOrders';
import RecentPurchases from './RecentPurchases';
import '../css/RecentActivity.css';

const RecentActivity = (props) => {
  return (
    <div className="recent-activity-container">
      <p className="recent-activity-title">Recent Activity</p>
      <div className="recent-activity-left">
        <RecentOrders {...props} />
      </div>
      <div className="recent-activity-right">
        <RecentPurchases {...props} />
      </div>
    </div>
  );
};

export default RecentActivity;
