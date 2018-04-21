import React, { Component } from 'react';
import '../css/Dashboard.css';
import InventoryCosts from './InventoryCosts';
import Inventory from './Inventory';
import axios from 'axios';

class Dashboard extends Component {
  constructor(props){
    super(props);
    this.state = {
      item_id: '1',
      inventory_quantity: '',
      cost_per_unit: '',
      modal: false
    }
    this.toggle = this.toggle.bind(this);
    this.handleInventorySubmit = this.handleInventorySubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleQuantityUpdate=this.handleQuantityUpdate.bind(this);
  }

  componentDidMount() {
    this.findTotalItemCost();
  }

  toggle(){
    this.setState({
      modal: !this.state.modal
    })
  }

  handleChange(e) {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({
      [name]: value,
    });
  }

  //method posts dashboard state into inventory_costs table then refreshes inventoryCosts.
  handleInventorySubmit(){
    axios.post('/api/inventorycosts', this.state)
      .then(res => {
        this.props.getInventoryCosts();
      });
  }

  /*method updates the total inventory quantity. even though state has costperunit it wont update inventories database because in models we customized the SET update to only add quantity and item_id*/

  handleQuantityUpdate() {
    axios.update('/api/inventories', this.state)
  }


  findTotalItemCost() {
    let sum = 0;
    this.props.inventory_costs.map((inventory) => {
      const itemTotal = inventory.inventory_quantity * inventory.cost_per_unit;
      sum += itemTotal;
    })
    console.log(sum, 'before setting state SUM')
    this.setState({
       totalCost: sum
    });
  }

  render(){
    return (
      <div className="dashboard">

        <InventoryCosts {...this.props}
                        totalCost={this.state.totalCost}
        />

        <Inventory {...this.props}
                   handleUpdateCall={this.handleUpdateCall}
                   handleChange={this.handleChange}
                   handleInventorySubmit={this.handleInventorySubmit}
                   toggle={this.toggle}
                   inventory_id={this.state.inventory_id}
                   item_id={this.state.item_id}
                   inventory_quantity={this.state.inventory_quantity}
                   cost_per_unit={this.state.cost_per_unit}
                   modal={this.state.modal}

        />

      </div>
    );
  }
}



export default Dashboard;
