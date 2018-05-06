import React from 'react';
import '../css/Inventory.css';
import ModalForm from './ModalForm';
import { Button, Table } from 'reactstrap';

const Inventory = props =>{

  return(
    <div className='inventory-container'>

      <p> Restaurant Inventory </p>

      <div className="inventories-container">
        <Table striped hover size="sm">
          <thead>
            <tr>
              <th> Inventory ID </th>
              <th> Inventory </th>
              <th> Inventory Quantity </th>
              <th> + </th>
            </tr>
          </thead>
          <tbody>
            {props.inventories.map((inventory) => (
              <tr>
                <th scope="row"> {inventory.inventory_id} </th>
                <td> {inventory.item} </td>
                <td> {inventory.inventory_quantity}</td>
                <td> {inventory.cost_per_unit}</td>
            <Button
            className="update-button"
            onClick={() => {
            props.toggle()
          }}>
          <i className="fas fa-plus-circle fa-3x" > </i>
          </Button>
              </tr>
            ))}
          </tbody>
        </Table>

      </div>

      <ModalForm {...props}/>

    </div>
  );
}

export default Inventory;
