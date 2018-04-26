import React, { Component } from 'react';
import '../css/Dashboard.css';
import InventoryCosts from './InventoryCosts';
import Inventory from './Inventory';
import axios from 'axios';
import { Button, Form, Modal, ModalBody, ModalFooter } from 'reactstrap';

class Dashboard extends Component {
  constructor(props){
    super(props);
    this.state = {
      item_id: '1',
      inventory_quantity: '',
      cost_per_unit: '',
      totalCost: null,
      modal: false,
      missing_info: false
    }
    this.toggle = this.toggle.bind(this);
    this.handleInventorySubmit = this.handleInventorySubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleQuantityUpdate=this.handleQuantityUpdate.bind(this);
    this.handleCreateAndUpdate = this.handleCreateAndUpdate.bind(this);
    this.findTotalItemCost = this.findTotalItemCost.bind(this);
    this.checkFilled = this.checkFilled.bind(this);
    this.toggleMissing = this.toggleMissing.bind(this);
  }

  componentDidMount() {
    this.findTotalItemCost();
  }

//ask when to use componentWillReceiveProps() vs componentWillUpate

//toggles modal in state
  toggle(){
    this.setState({
      modal: !this.state.modal
    });
  }

  toggleMissing() {
    this.setState({
      missing_info: !this.state.missing_info
    });
  }

  //method passed down to inventory and into inventory form to handle changes to dashboard state.
  handleChange(e) {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({
      [name]: value,
    });
  }

//checkedFilled only active when submit button is pressed. Checking dashboard state whether its state is empty, if not empty then proceed to post in handleSubmit method.
  checkFilled() {
    if (
      this.state.item_id !== '' &&
      this.state.inventory_quantity !== '' &&
      this.state.cost_per_unit !== ''
    ) {
      console.log('this is true')
      return true
    } else {
      return false
    }
  }

//this method calculates the total cost of inventory. will need to add another method to filter out expenses by month.
  findTotalItemCost() {
    let sum = 0;
    this.props.inventory_costs.map((inventory_cost) => {
      const itemTotal = inventory_cost.inventory_quantity * inventory_cost.cost_per_unit;
      sum += itemTotal;
      return sum;
    })
    console.log(sum, 'before setting state SUM')
    this.setState({
       totalCost: sum
    });
  }


//method run both create and update and then find total for inventory expense
  handleCreateAndUpdate() {
    this.handleInventorySubmit();
    this.handleQuantityUpdate();
  }


  //method posts dashboard state into inventory_costs table then refreshes inventoryCosts.
  handleInventorySubmit(){
    if (this.checkFilled()) {
      axios.post('/api/inventorycosts', this.state)
      .then(res => {
        this.props.getInventoryCosts();
      })
    } else {
      this.toggleMissing();
    }
  }

  /*method updates the total inventory quantity. even though state has costperunit it wont update inventories database because in models we customized the SET update to only add quantity and item_id*/

  handleQuantityUpdate() {
    const rootUrl = window.location.origin;
    const pathUrl = `/api/inventories/${this.state.item_id}`;
    const newUrl = rootUrl.concat(pathUrl);
    if (this.checkFilled()) {
      axios.put(newUrl, this.state)
      .then(res => {
        this.props.getInventories();
      })
    } else {
      this.setState({
        missing_info: true
      })
    }
  }


  render(){
    return (
      <div className="dashboard">

      <div>
          <p>Months Go Here</p>
          <form>

          </form>
      </div>

        <InventoryCosts {...this.props}
                        totalCost={this.state.totalCost}

        />

        <Inventory {...this.props}
                   handleChange={this.handleChange}
                   toggle={this.toggle}
                   inventory_id={this.state.inventory_id}
                   item_id={this.state.item_id}
                   inventory_quantity={this.state.inventory_quantity}
                   cost_per_unit={this.state.cost_per_unit}
                   modal={this.state.modal}
                   handleCreateAndUpdate={this.handleCreateAndUpdate}
                   findTotalItemCost={this.findTotalItemCost}
                   checkFilled={this.checkFilled}
                   toggleMissing={this.toggleMissing}

        />

      {/* Show this modal warning if missing fields were not filled in */}
      <Form>
      <Modal isOpen={this.state.missing_info}
             className = {this.props.className}>
             <ModalBody>
              Please Fill Out All Sections
            </ModalBody>
            <ModalFooter>
              <Button color="danger" onClick={this.toggleMissing}> OK </Button>
            </ModalFooter>
      </Modal>
      </Form>
      </div>
    );
  }
}



export default Dashboard;
