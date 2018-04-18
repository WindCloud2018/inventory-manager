import React, { Component } from 'react';
import { Button, Form, FormGroup, Label, Input, Modal, ModalBody, ModalFooter } from 'reactstrap';
import '../css/Sales.css';


class Sales extends Component {
  constructor(props) {
    super(props);
    this.state = {

    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

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
        <Button onClick={this.handleSubmit}>Order</Button>
      </div>
    )
  }
}

export default Sales;
