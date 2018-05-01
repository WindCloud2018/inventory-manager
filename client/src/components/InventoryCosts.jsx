import React from 'react';
import '../css/InventoryCosts.css';


const InventoryCosts = props => {
  console.log(props.inventory_costs,
  'this is inventory costs')
  console.log(props.inventoryCostData, 'this is inventory cost data coming from inventory costs component')

  return(
    <div>
      <h1> Costs on Inventory </h1>

      {props.inventoryCostData.map((cost) => (
        <div className="inventory-report">
          <p> {cost.item[0].toUpperCase() + cost.item.slice(1)} </p>
          <p> Quantity: {cost.inventory_quantity}</p>
          <p> Cost Per Unit: {cost.cost_per_unit}</p>
          <p> ${(cost.inventory_quantity * cost.cost_per_unit).toFixed(2)} </p>
          <p> {cost.inventory_date.slice(0,10)} </p>
        </div>
      ))}


      <div>
      <h2> Total Expense </h2>

      <p> Total Expense on Inventory: ${Math.round(props.totalCost * 100) / 100} </p>
      </div>

     {/* below math rounds to second decimal place otherwise will get giant float in certain math computations. another way is to use .toFixed(2) sgyrt props.totalCost*/}
    </div>
  );
}


export default InventoryCosts;
