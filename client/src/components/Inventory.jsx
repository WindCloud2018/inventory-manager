import React from 'react';
import '../css/Inventory.css';
import ModalForm from './ModalForm';
import { Button } from 'reactstrap';



const Inventory = props =>{
  return(
    <div className='inventory-container'>
      <ModalForm {...props}/>
      <p> Restaurant Inventory </p>

      <div className="inventories-container">
        {props.inventories.map((inventory) => {
          return<div key={inventory.inventory_id}
                     className="inventories"
                >
            <ul className="inventory">
            <li> Inventory: {inventory.inventory} </li>
            <li> Quantity: {inventory.inventory_quantity} </li>
            <li> Cost Per Unit: {inventory.cost_per_unit} </li>
            <div className="update-icon">
            <Button
              className="update-button"
              onClick={() => {
              console.log('clicked toggle')
              props.toggle()
            }}>
            <i className="fas fa-plus-circle fa-3x" > </i>
            </Button>
            </div>
            </ul>
          </div>
        })}
      </div>
    </div>
  );
}

export default Inventory;
