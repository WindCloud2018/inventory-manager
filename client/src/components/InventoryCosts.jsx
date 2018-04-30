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
        <p> {inventory_cost.item[0].toUpperCase() + inventory_cost.item.slice(1)}: ${(inventory_cost.inventory_quantity * inventory_cost.cost_per_unit).toFixed(2)} </p>
        <p> Quantity: {inventory_cost.inventory_quantity} </p>
        <p> CPU: {inventory_cost.cost_per_unit} </p>
        <p> {inventory_cost.inventory_date.slice(0,10)}</p>
        </div>
      ))}

      <div>
      <h2> Total Expense </h2>
    {/* below math rounds to second decimal place otherwise will get giant float in certain math computations. another way is to use .toFixed(2) sgyrt props.totalCost*/}
      <p> Total Expense on Inventory: ${Math.round(props.totalCost * 100) / 100} </p>
      </div>
    </div>
  );
}


export default InventoryCosts;
