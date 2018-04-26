import React, { Component } from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import '../css/SalesForm.css';


class SalesForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentDate: this.props.currentDate,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    this.getDefaultItemQuantity();
  }

  getDefaultItemQuantity() {
    // map through items table and add them to the state with default values.
    this.props.items.map((item) => {
      return (
        this.setState({
          [item.item]: {
            id: item.item_id,
            quantity: '1',
          },
        }));
    });
  }

  handleChange(e) {
    const item = e.target.name;
    const itemIdVal = e.target.id;
    const val = e.target.value;
    this.setState({
      [item]: {
        id: itemIdVal,
        quantity: val,
      },
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.salesCreate(e, this.state);
  }

  render() {
    return (
      <Form className="sales-form-container">
        {this.props.items.map(item => (
          <FormGroup
            key={item.item_id}
            className="sales-form-block"
          >
            {/* map through items table and check for selectable column, show only if true */}
            {item.selectable ? (
              <div className="sales-form">
                <Label
                  for={item.item}
                  className="sales-form-left"
                >
                  {item.item[0].toUpperCase() + item.item.slice(1)}
                </Label>
                <Input
                  type="select"
                  name={item.item}
                  id={item.item_id}
                  className="sales-form-right"
                  onChange={this.handleChange}
                >
                  <option value="1">Included</option>
                  <option value="2">Extra</option>
                  <option value="0">None</option>
                </Input>
              </div>
            ) : (
              <p />
            )}
          </FormGroup>
        ))}
        <Button onClick={this.handleSubmit}>Order</Button>
      </Form>
    );
  }
}

export default SalesForm;
