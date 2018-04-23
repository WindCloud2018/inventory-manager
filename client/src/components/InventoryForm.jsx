import React from 'react';
import { Button, Form, FormGroup, Label, Input, Modal, ModalBody, ModalFooter } from 'reactstrap';
import '../css/InventoryForm.css';


class InventoryForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      inventory_id: '',
      item_id: '',
      quantity: '',
      cost_per_unit: ''
    }
    // this.handleChange = this.handleChange.bind(this);
  }


  render(){
    return(
      <Form>
        <FormGroup>
          <Label for="item"> Item </Label>
          <Input
            type="select"
            name="item"
            placeholder="Item"
            onChange={(e) => {
              this.props.handleUpdateCall(e.target.value)
            }}
          >
            {this.props.items.map((item, i) => (
              <option
                key={item.item_id}
                value={item.item_id}
              >
              {item.item}
              </option>
            ))}
          </Input>
        </FormGroup>


      </Form>
    );
  }
}

export default InventoryForm;
