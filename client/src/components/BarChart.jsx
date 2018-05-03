import React from 'react';
import { Bar } from 'react-chartjs-2';
import '../css/BarChart.css';


const BarChart = props => {
  return (
      <Bar data={props.barChartData}
           options={{
            maintainAspectRatio: false,
            responsive: true,
            title: {
              display: true,
              text: 'Current Inventory Stock',
              fontSize: 25
            },
            legend: {
              display: true,
              position: 'bottom'
            }
           }}
      />
  );
}

export default BarChart;
