import React from 'react';
import Orders from './Orders';
import SalesForm from './SalesForm';
import '../css/Sales.css';

const Sales = (props) => {
  return (
    <div>
      <SalesForm {...props} />
      <Orders {...props} />
    </div>
  );
};

export default Sales;
