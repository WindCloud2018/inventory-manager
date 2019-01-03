import React from 'react';
import { Table } from 'reactstrap';
import '../css/RecentPurchases.css';

const RecentPurchases = (props) => {
  return (
    <Table striped hover size="sm">
      <thead>
        <tr>
          <th>Purchase ID</th>
          <th>Item Name</th>
          <th>Quantity</th>
          <th>Date</th>
        </tr>
      </thead>
      <tbody>
        {props.inventory_costs.slice(0, 10).map((cost) => (

            <tr key={cost.inventory_id}>
              <th scope="row">{cost.inventory_cost_id}</th>
              <td>{cost.item[0].toUpperCase() + cost.item.slice(1)}</td>
              <td>{cost.inventory_quantity}</td>
              <td>{cost.inventory_date.split('T')[0]}</td>
            </tr>

        ))}
       </tbody>
    </Table>
  );
};

export default RecentPurchases;
