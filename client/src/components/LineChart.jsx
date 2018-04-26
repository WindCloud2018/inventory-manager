import React from 'react';
import { Line } from 'react-chartjs-2';
import '../css/LineChart.css';

const LineChart = (props) => {
  return (
      <Line
        data={props.lineChartData}
        options={{
          maintainAspectRatio: false,
          responsive: true,
          pointDotRadius: 10,
          bezierCurve: false,
          animationSteps : 50,

        }}
      />
  );
};

export default LineChart;
