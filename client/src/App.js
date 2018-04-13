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
    this.updateInventoryQuantity = this.updateInventoryQuantity.bind(this);
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

  salesCreate(data) {
    console.log(data);
  }

  updateInventoryQuantity(data) {
    console.log(data);
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
                    updateInventoryQuantity={this.updateInventoryQuantity}
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
