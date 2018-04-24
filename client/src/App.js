import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import axios from 'axios';
import './App.css';
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
      dataLoaded: false,
      currentDate: null,
    };
    this.getOrders = this.getOrders.bind(this);
    this.getInventories = this.getInventories.bind(this);
    this.getItems = this.getItems.bind(this);
    this.processOrder = this.processOrder.bind(this);
  }

  componentDidMount() {
    this.getOrders();
    this.getItems();
    this.getCurrentDate();
    this.getInventories();
  }

  getCurrentDate() {
    let today = new Date();
    let day = today.getDate();
    let month = today.getMonth() + 1;
    const year = today.getFullYear();

    if (day < 10) {
      day = '0' + day;
    }
    if (month < 10) {
      month = '0' + month;
    }

    today = year + '-' + month + '-' + day;

    this.setState({
      currentDate: today,
    });
  }

  getOrders() {
    // get order data and save to state
    axios.get('/api/orders')
      .then(res => (
        this.setState({
          orders: res.data.orders,
        })
      ))
      .catch(err => console.log(err));
  }

  getItems() {
    axios.get('/api/items')
      .then(res => (
        this.setState({
          items: res.data.items,
        })
      ))
      .catch(err => console.log(err));
  }


  getInventories() {
    // get inventory data and save to state
    axios.get('/api/inventories')
      .then(res => (
        this.setState({
          inventories: res.data.inventories,
          dataLoaded: true,
        })
      ))
      .catch(err => console.log(err));
  }

  // create new order and get that order id
  processOrder(event, data) {
    event.preventDefault();
    axios.post('/api/orders', data)
      .then((res) => {
        // add newest order id as new key/value into data
        data.latestOrderId = res.data.last_order.order_id;
        axios.post('/api/useditems', data);
      })

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
                path="/"
                render={props => (<Sales
                  {...props}
                  processOrder={this.processOrder}
                  currentDate={this.state.currentDate}
                  items={this.state.items}
                />)}
              />
              <Route
                path="/dashboard"
                render={props => (<Dashboard
                  {...props}
                  inventories={this.state.inventories}
                  orders={this.state.orders}
                  dataLoaded={this.state.dataLoaded}
                />)}
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
