import React from 'react';
import LineChart from './LineChart';
import BarChart from './BarChart';
import RecentActivity from './RecentActivity';
import '../css/Overview.css';

const Overview = (props) => {
  return (
    <div className="overview-container">
      <div className="overview-top">
        <form>
          <label htmlFor="years-option">Years to View
            <select
              id="years-option"
              name="years-option"
              onChange={(e) => {
              props.handleYearsView(e.target.value);
              }}
            >
              {props.years.map((e, i) => {
                return <option key={i}>{i+1}</option>
              })}
            </select>
          </label>
        </form>
      </div>
      <div className="overview-left">
        <LineChart {...props} />
      </div>
      <div className="overview-right">
        <BarChart {...props} />
      </div>
      <div className="overview-bottom">
        <RecentActivity {...props} />
      </div>
    </div>
  );
};

export default Overview;
