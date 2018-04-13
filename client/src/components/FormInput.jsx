import React from 'react';
import { Button, Form, FormGroup, Label, Input} from 'reactstrap';
import '../css/FormInput.css';

class FormInput extends React.Component {
  constructor() {
    super();
    this.state = {
      inventory_id: '',
      inventory: '',
      quantity: '',
      cost_per_unit: '',
      bulk_price: '',
    }
  }

  handleEditChange(id, ){

  }


  render(){

    return(
      <div className="form-input">
        <Form>
          <FormGroup className="form-text">
            <Label> Inventory Item</Label>
            <select key={this.props.inventories.inventory_id}
                    value={this.props.inventories.inventory}
                    onChange={(e) => {
                      this.props.handleEditChange(e.target.value)
                    }}>
              {this.props.inventories.map((inventory) => {
                return <option key={inventory.inventory_id}
                               value={inventory.inventory_id}
                       >
                       {inventory.inventory}
                       </option>
              })}
            </select>
          </FormGroup>

          <FormGroup className="form-text">
            <Label> Quantity </Label>
            <Input type="integer" name="Quantity" placeholder="#" />
          </FormGroup>

          <FormGroup className="form-text">
            <Label> Cost Per Unit </Label>
            <Input type="integer" name="CostPerUnit" placeholder="$" />
          </FormGroup>

          <FormGroup className="form-text">
            <Label> Bulk Price </Label>
            <Input type="integer" name="Quantity" placeholder="$" />
          </FormGroup>

          <Button> Update </Button>
          <Button> Cancel </Button>
        </Form>
      </div>
    );
  }
}





export default FormInput;
