import React from 'react';
import { Bar } from 'react-chartjs-2';
import '../css/Chart.css';

const Chart = (props) => {
  return (
      <Bar
        data={props.barChartData}
        options={{
          maintainAspectRatio: false,
          responsive: true,
          pointDotRadius: 10,
          bezierCurve: false,
          scaleShowVerticalLines: false,
          scaleGridLineColor: 'gray',
          animationSteps : 50,
        }}
      />
  );
};

export default Chart;
