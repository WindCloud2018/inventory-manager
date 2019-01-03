import React from 'react';
import { Table } from 'reactstrap';
import '../css/RecentOrders.css';

const RecentOrders = (props) => {
  return (
    <Table striped hover size="sm">
      <thead>
        <tr>
          <th>Order ID</th>
          <th>Order Date</th>
        </tr>
      </thead>
      <tbody>
        {props.orders.slice(0, 10).map((order) => (

            <tr key={order.order_id}>
              <th scope="row">{order.order_id}</th>
              <td>{order.order_date.split('T')[0]}</td>
            </tr>

        ))}
       </tbody>
    </Table>
  );
};

export default RecentOrders;
