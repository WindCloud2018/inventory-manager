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
      inventory_costs: null,
      dataLoaded: false,
      currentDate: null,
      years: [],
      months: [],

      currentYear: null
    };
    this.getOrders = this.getOrders.bind(this);
    this.getInventories = this.getInventories.bind(this);
    this.getItems = this.getItems.bind(this);
    this.getInventoryCosts = this.getInventoryCosts.bind(this);
    this.salesCreate = this.salesCreate.bind(this);
    this.getYears = this.getYears.bind(this);
    this.findKeyInObject = this.findKeyInObject.bind(this);
  }

  componentDidMount() {
    this.getOrders();
    this.getItems();
    this.getInventories();
    this.getInventoryCosts();
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

  getOrders(){
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
          inventories: res.data.inventories
        })
      ))
      .catch(err => console.log(err));
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

  checkIfExist(array, value){
    return array.some((element) => {
      return element === value
    })
  }

  findKeyInObject(date){
    console.log(date, 'this is dates findKeyInObject')
    for (let key in date) {
      if (key.search('_date') !== -1) {

        return key
      }
    }
  }

  getYears(dates) {
    let year_array = [];
    dates.forEach((date) => {
      let dateKey = this.findKeyInObject(date);
      let curr_year = date[dateKey].slice(0,4);
      if (year_array.length === 0) {
        year_array.push(curr_year);
      } else if (!this.checkIfExist(year_array, curr_year)) {
        year_array.push(curr_year)
      }
    })
    this.setState({
      years: year_array
    })
  }

  // create new order and get that order id
  salesCreate(event, data) {
    event.preventDefault();
    axios.post('/api/orders', data)
      .then((res) => {
        // add newest order id as new key/value into data
        data.latestOrderId = res.data.last_order.order_id;
        axios.post('/api/useditems', data);
      })

  }

  handleSelectYearCall(value){
    this.setState({
      currentYear: value
    });
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
                path="/"
                render={props => (<Sales
                  {...props}
                  salesCreate={this.salesCreate}
                  currentDate={this.state.currentDate}
                  items={this.state.items}
                />)}
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
                        getYears={this.getYears}
                        currentYear={this.state.currentYear}
                        years={this.state.years}

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
