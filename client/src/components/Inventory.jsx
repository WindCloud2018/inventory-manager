import React from 'react';
import '../css/Inventory.css';
import ModalForm from './ModalForm';
import { Button } from 'reactstrap';



const Inventory = props =>{
  // constructor() {
  //   super(props);
  //   this.state={
  //     inventory_id: '',
  //     item_id: '',
  //     quantity: '',
  //     cost_per_unit: '',
  //     modal: false
  //   }
  // }

  // render() {
    return(
    <div>
      <p> Restaurant Inventory </p>

       <ModalForm {...props}
                   toggle={props.toggle}
                   modal={props.modal}
                   inventory_id={props.inventory_id}
                   item_id={props.item_id}
                   quantity={props.quantity}
                   cost_per_unit={props.cost_per_unit}
        />

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
  // }
}

export default Inventory;
