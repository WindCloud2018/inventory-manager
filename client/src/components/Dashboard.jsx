import React, { Component } from 'react';
import '../css/Dashboard.css';
import FormInput from './FormInput';
import Inventory from './Inventory';

class Dashboard extends Component {
  constructor(props){
    super(props);
    this.state = {
      inventory_id: '',
      item_id: '',
      quantity: '',
      cost_per_unit: '',
      modal: false
    }
    this.handleUpdateCall = this.handleUpdateCall.bind(this);
    this.toggle = this.toggle.bind(this);
  }

  toggle(){
    this.setState({
      modal: !this.state.modal
    })
  }

  handleUpdateCall(inventory_id, item_id, quantity, cost_per_unit) {
    this.setState({
      inventory_id: inventory_id,
      item_id: item_id,
      quantity: quantity,
      cost_per_unit: cost_per_unit,
      modal: !this.state.modal
    })
  }

  // handleInventorySubmitCall(event, value){
  //   event.preventDefault();
  //   axios.post('/api/expenses')
  //     .then(res => {

  //     })
  // }

  render(){
    return (
      <div className="dashboard">

        <FormInput {...this.props}/>

        <Inventory {...this.props}
                   handleUpdateCall={this.handleUpdateCall}
                   toggle={this.toggle}
                   inventory_id={this.state.inventory_id}
                   item_id={this.state.item_id}
                   quantity={this.state.quantity}
                   cost_per_unit={this.state.cost_per_unit}
                   modal={this.state.modal}

        />

      </div>
    );
  }
}



export default Dashboard;
