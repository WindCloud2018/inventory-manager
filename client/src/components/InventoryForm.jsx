import React from 'react';
import { Button, Form, FormGroup, Label, Input, Modal, ModalBody, ModalFooter } from 'reactstrap';
import '../css/InventoryForm.css';


const InventoryForm = props => {

  return(
    <Form>
      <FormGroup>
        <Label for="item"> Item </Label>
        <Input
          type="select"
          name="item"
          placeholder="Item"
          onChange={(e) => {
            props.handleUpdateCall(e.target.value)
          }}
        >
          {props.items.map((item, i) => (
            <option
              key={item.item_id}
              value={item.item_id}
            >
            {item.item}
            </option>
          ))}
        </Input>
      </FormGroup>

      <FormGroup>
        <Input
          type="integer"
          name="quantity"
          placeholder="Quantity"
          onChange={(e) => {
            props.handleUpdateCall(e.target.value)
          }} />
      </FormGroup>

      <FormGroup>
        <Input
          type="integer"
          step="any"
          placeholder="cost per unit"
          onChange={(e) => {
            props.handleUpdateCall(e.target.value)
          }} />
      </FormGroup>

    {/* Submit Button in modal form*/}
      <ModalFooter>
        <Button color="secondary" onClick={props.handleInventorySubmitCall} >
        Submit
        </Button>
        <Button onClick={props.toggle}>
        Cancel
        </Button>
      </ModalFooter>
    </Form>
  );
}

export default InventoryForm;
