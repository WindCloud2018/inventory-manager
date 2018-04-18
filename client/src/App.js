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
      dataLoaded: false,
      currentDate: null,
    }
    this.getOrders = this.getOrders.bind(this);
    this.getInventories = this.getInventories.bind(this);
    this.getItems = this.getItems.bind(this);
    this.salesCreate = this.salesCreate.bind(this);
  }

  componentDidMount(){
    this.getOrders();
    this.getInventories();
    this.getItems();
    this.getCurrentDate();
  }

  getCurrentDate() {
    let today = new Date();
    let day = today.getDate();
    let month = today.getMonth() + 1;
    let year = today.getFullYear();

    if (day < 10) {
      day = '0' + day;
    }
    if (month < 10) {
      month = '0' + month;
    }

    today = year + '-' + month + '-' + day;

    this.setState({
      currentDate: today
    })
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
                    currentDate={this.state.currentDate}

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
