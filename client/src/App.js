import React, { Component } from 'react';
import './App.css';
import { Switch, Route } from 'react-router-dom';
import axios from 'axios';

import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import Footer from './components/Footer';
import Header from './components/Header';
import Sales from './components/Sales';



class App extends Component {
  // Initialize state
  constructor() {
    super();
    this.state = {
      orders: null,
      inventories: null,
      items: null,
      inventory_costs: null,
      dataLoaded: false,

    }
    this.getOrders = this.getOrders.bind(this);
    this.getInventories = this.getInventories.bind(this);
    this.getItems = this.getItems.bind(this);
    this.getInventoryCosts = this.getInventoryCosts.bind(this);
    this.salesCreate = this.salesCreate.bind(this);
  }

  componentDidMount(){
    this.getOrders();
    this.getInventories();
    this.getItems();
    this.getInventoryCosts();
  }


  getOrders(){
    // get order data and save to state
    axios.get('/api/orders')
      .then(res => {
        this.setState({
          orders: res.data.orders
        });
      })
      .catch(err => console.log(err));
  }

  getItems() {
    axios.get('/api/items')
      .then(res => {
        this.setState({
          items: res.data.items
        });
      })
      .catch(err => console.log(err));
  }

  getInventories(){
    // get inventory data and save to state
    axios.get('/api/inventories')
      .then(res => {
        this.setState({
          inventories: res.data.inventories
        })
      })
      .catch(err => console.log(err))
  }

  getInventoryCosts() {
    axios.get('/api/inventorycosts')
      .then(res => {
        this.setState({
          inventory_costs: res.data.inventory_costs,
          dataLoaded: true
        })
      })
  }


  salesCreate(event, data) {
    event.preventDefault();

    // create new order
    axios.post('/api/orders', data)

    // update current inventory quantity
    const rootUrl = window.location.origin;
    this.state.inventories.forEach((inventory) => {

      // find url for PUT using inventory_id in each loop
      const pathUrl = `/api/inventories/${inventory.inventory_id}`;
      const newUrl = rootUrl.concat(pathUrl);

      // get inventory_name and turn into lowercase
      const inventory_name = inventory.inventory.toLowerCase()

      // find new inventory quantity by subtract current inventory by sales quantity
      const new_inventory_quantity = inventory.inventory_quantity - data[inventory_name]

      // data to pass into server end
      const new_inventory = {
        inventory_id: inventory.inventory_id,
        inventory_quantity: new_inventory_quantity
      }
      axios.put(newUrl, new_inventory)
    })

    // get new inventory data and save to state
    this.getInventories();
  }

  render() {
    console.log(this.state.inventory_costs, "this is inventory costs")
    return (
      <div className="App">
        <Header />
        <Sidebar />
        <div className="body-container">

        {this.state.dataLoaded === true ? (
           <Switch>
          <Route
            exact
            path='/'
            render={props => <Sales {...props}
                    salesCreate={this.salesCreate}

            />}
          />
          <Route
            path='/dashboard'
            render={props => <Dashboard {...props}
                    inventories={this.state.inventories}
                    orders={this.state.orders}
                    inventory_costs={this.state.inventory_costs}
                    items={this.state.items}
                    dataLoaded={this.state.dataLoaded}
                    getInventories={this.getInventories}
                    getInventoryCosts={this.getInventoryCosts}

            />}
          />

        </Switch>
        ) : (
          <p> Loading.... </p>
        )}
        </div>
        <Footer />
      </div>

    );
  }
}














export default App;
