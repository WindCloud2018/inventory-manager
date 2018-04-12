import React from 'react';
import { Button, Form, FormGroup, Label, Input, FormText} from 'reactstrap';
import '../css/FormInput.css';

class FormInput extends React.Component {
  constructor() {
    super();
    this.state = {
      inventory_id: '',
      quantity: '',
    }
  }


  render(){
    return(
      <div className="form-input">
        <Form>
          <FormGroup className="form-text">
            <Label> Inventory Item</Label>
            <Input type="text" name="Item" id="exampleItem" placeholder="Item" />
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
            <Label> Bulk Cost </Label>
            <Input type="integer" name="Quantity" placeholder="$" />
          </FormGroup>

          <FormGroup className="form-text">
            <Label> Waste Quantity </Label>
            <Input type="integer" name="Waste" placeholder="#" />
          </FormGroup>

          <Button> Submit </Button>
          <Button> Cancel </Button>
        </Form>
      </div>
    );
  }
}





export default FormInput;
