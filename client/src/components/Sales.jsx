import React, { Component } from 'react';
import { Button, Form, FormGroup, Label, Input, Modal, ModalBody, ModalFooter } from 'reactstrap';
import '../css/Sales.css';


class Sales extends Component {
  constructor(props) {
    super(props);
    this.state = {
      order_fields: [
        'patty',
        'cheese',
        'tomato',
        'lettuce'
      ],
      bun: '1',
      patty: '1',
      cheese: '1',
      tomato: '1',
      lettuce: '1'
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  // componentDidMount() {
  //   if (this.props.editing) {
  //     this.setState({
  //       expense_id: this.props.cur_expense_id,
  //       description: this.props.cur_description,
  //       amount: this.props.cur_amount,
  //       category_id: this.props.cur_category_id,
  //       expense_date: this.props.cur_expense_date.slice(0, 10)
  //     })
  //   }
  // }

  handleChange(e) {
    const name = e.target.name;
    const val = e.target.value;
    this.setState({
      [name]: val,
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.salesCreate(e, this.state);
  }

  render() {
    return (
      <div>
        <Form>

      {/* Fields for data entry */}
        {this.state.order_fields.map((order_field, i) => (
          <FormGroup key={i}>
            <Label for={order_field}>{order_field.split('_')[0].toUpperCase()}</Label>
            <Input
              type="select"
              name={order_field}
              id={order_field}
              value={this.state.order_field}
              onChange={this.handleChange}
            >
              <option>1</option>
              <option>2</option>
              <option>3</option>
              <option>4</option>
              <option>5</option>
              <option>6</option>
            </Input>
          </FormGroup>
        ))}

        </Form>

        <Button onClick={this.handleSubmit}>Order</Button>
      </div>
    )
  }
}

export default Sales;
