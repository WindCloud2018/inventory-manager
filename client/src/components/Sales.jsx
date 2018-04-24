import React from 'react';
import { Form } from 'reactstrap';
import SalesForm from './SalesForm'
import '../css/Sales.css';

const Sales = (props) => {

  return (
    <div>
      <SalesForm {...props} />
    </div>
  );
};

export default Sales;
