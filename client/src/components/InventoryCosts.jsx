import React from 'react';
import '../css/InventoryCosts.css';
import { Table } from 'reactstrap';

const InventoryCosts = props => {
  console.log(props.inventory_costs,
  'this is inventory costs')
  console.log(props.inventoryCostData, 'this is inventory cost data coming from inventory costs component')

  return(
    <div>
      <h1> Inventory Expenses </h1>

      <div className="cost-report">
        <Table stripped hover size="sm">
          <thead>
            <tr>
              <th> Inventory Cost Id </th>
              <th> Inventory </th>
              <th> Quantity </th>
              <th> Cost Per Unit </th>
              <th> Total Expense </th>
              <th> Date Purchased</th>
            </tr>
          </thead>
          <tbody>
            {props.inventoryCostData.map((cost) => (
              <tr>
                <th scope="row"> {cost.inventory_cost_id} </th>
                <td> {cost.item[0].toUpperCase() + cost.item.slice(1)} </td>
                <td> {cost.inventory_quantity} </td>
                <td> {cost.cost_per_unit} </td>
                <td> ${(cost.inventory_quantity * cost.cost_per_unit).toFixed(2)}</td>
                <td> {cost.inventory_date.slice(0,10)} </td>
              </tr>
            ))}
          </tbody>

        </Table>
      </div>

      <div>
      <h2 className=""> Total Expense </h2>

      <p> Total Expense on Inventory: ${Math.round(props.totalCost * 100) / 100} </p>
      </div>

     {/* below math rounds to second decimal place otherwise will get giant float in certain math computations. another way is to use .toFixed(2) sgyrt props.totalCost*/}
    </div>
  );
}


export default InventoryCosts;
