import React from 'react';
import '../css/InventoryCosts.css';



const InventoryCosts = props => {
  console.log(props.inventory_costs,
  'this is inventory costs')


  return(
    <div>
      <h1> Costs on Inventory </h1>
      {props.inventory_costs.map((inventory_cost) => (
        <div className="inventory-report"
             key = {inventory_cost.inventory_cost_id}>
        <p> {inventory_cost.item}: ${Math.round(inventory_cost.inventory_quantity * inventory_cost.cost_per_unit)} </p>
        <p> Quantity: {inventory_cost.inventory_quantity} </p>
        <p> CPU: {inventory_cost.cost_per_unit} </p>
        <p> {inventory_cost.inventory_date.slice(0,10)}</p>
        </div>
      ))}

      <div>
      <h2> Total Expense </h2>
      <p> Total Expense on Inventory: ${props.totalCost} </p>
      </div>
    </div>
  );
}


export default InventoryCosts;
