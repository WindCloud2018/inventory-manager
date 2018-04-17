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
      dataLoaded: false
    }
    this.getOrders = this.getOrders.bind(this);
    this.getInventories = this.getInventories.bind(this);
    this.salesCreate = this.salesCreate.bind(this);
  }

  componentDidMount(){
    this.getOrders();
    this.getInventories();
  }


  getOrders(){
    axios.get('/api/orders')
      .then(res => {
        this.setState({
          orders: res.data.orders
        });
      })
      .catch(err => console.log(err));
  }


  getInventories(){
    axios.get('/api/inventories')
      .then(res => {
        this.setState({
          inventories: res.data.inventories,
          dataLoaded: true
        })
      })
      .catch(err => console.log(err))
  }

  salesCreate(event, data) {
    event.preventDefault();

    // create new order
    axios.post('/api/orders', data)

    // update current inventory quantity
    const rootUrl = window.location.origin;
    this.state.inventories.forEach((inventory) => {
      const pathUrl = `/api/inventories/${inventory.inventory_id}`;
      const newUrl = rootUrl.concat(pathUrl);
      const inventory_name = inventory.inventory.toLowerCase()
      const inventory_quantity = inventory.inventory_quantity - data[inventory_name]
      const new_inventory = {
        inventory_id: inventory.inventory_id,
        inventory_quantity: inventory_quantity
      }
      axios.put(newUrl, new_inventory)
    })

    this.getInventories();
  }

  render() {
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
                    dataLoaded={this.state.dataLoaded}
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
