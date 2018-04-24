import React from 'react';
import { Button, Form, FormGroup, Label, Input, ModalFooter } from 'reactstrap';
import '../css/InventoryForm.css';


const InventoryForm = props => {

  return(
    <Form>
      <FormGroup>
        <Label for="item"> Item </Label>
      {/* OnChange, input-tags name and option-tags value will change state in Dashboard */}
        <Input
          type="select"
          placeholder="Item"
          name="item_id"
          onChange={props.handleChange}
        >
          {props.items.map((item) => (
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
       {/* OnChange, input-tags name and option-tags value will change state in Dashboard */}
        <Input
          type="number"
          name="inventory_quantity"
          placeholder="Quantity"
          onChange={props.handleChange}
        />
      </FormGroup>

      <FormGroup>
       {/* OnChange, input-tags name and option-tags value will change state in Dashboard */}
        <Input
          type="number"
          step="any"
          name="cost_per_unit"
          placeholder="cost per unit"
          onChange={props.handleChange}
        />
      </FormGroup>

    {/* Submit Button in modal form uses handleInventorySubmit method from Dashboard. Method runs axios.post*/}
      <ModalFooter>
        <Button color="secondary"
                onClick={(e) => {
                e.preventDefault();
          props.handleCreateAndUpdate();
        }}>
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
