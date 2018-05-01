import React from 'react';
import '../css/Dashboard.css';
import InventoryCosts from './InventoryCosts';
import Inventory from './Inventory';

const Dashboard = props => {

    return (
      <div className="dashboard">

        <div className="selector-container">

          <form className="selector-container-left">
            <select value={props.currentMonth}
                    name="currentMonth"
                    onChange={(e) => {props.handleMonthYearChange(e)}}
            >
            {props.months.map((month, i) => {
              const index = i < 9 ? '0' + (i + 1) :
              (String(i+1))
              return <option key={i}
                           value={index}
                   >
                {month}
              </option>
            })}
            </select>
          </form>

          <form className="selector-container-right">
            <select value={props.currentYear}
                    name="currentYear"
                    onChange={(e) => {
                    props.handleMonthYearChange(e)}}>
            {props.years.map((year, i) => {
              return <option  key={i}
                              value={year}>
              {year}
              </option>
            })}
            </select>
          </form>
        </div>

        <div>
        <p>Months Go Here</p>
        </div>

        <InventoryCosts {...props} />

        <Inventory {...props} />

    </div>
    );
}



export default Dashboard;
