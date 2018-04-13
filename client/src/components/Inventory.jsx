import React from 'react';
import '../css/Inventory.css';


const Inventory = props => {
  console.log(props.inventories, 'this is inventories')
  return(
    <div>
      <p> Restaurant Inventory </p>
      <div className="inventories-container">
        {props.inventories.map((inventory) => {
          return<div key={inventory.inventory_id}
                     className="inventory"
                >
            <p> Inventory: {inventory.inventory} </p>
            <p> Quantity: {inventory.inventory_quantity} </p>
            <p> Cost Per Unit: {inventory.cost_per_unit} </p>
            <p> Bulk Price: ${inventory.bulk_price} </p>
          </div>
        })}
      </div>
    </div>
  );
}

export default Inventory;
