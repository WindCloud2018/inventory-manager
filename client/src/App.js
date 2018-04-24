import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import axios from 'axios';
import './App.css';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import Footer from './components/Footer';
import Header from './components/Header';
import Sales from './components/Sales';
import Overview from './components/Overview';

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
      lineChartData: null,
      barChartData: null,
    };
    this.getOrders = this.getOrders.bind(this);
    this.getInventories = this.getInventories.bind(this);
    this.getItems = this.getItems.bind(this);
    this.getInventoryCosts = this.getInventoryCosts.bind(this);
    this.salesCreate = this.salesCreate.bind(this);
    this.getLineChartData = this.getLineChartData.bind(this);
    this.getBarChartData = this.getBarChartData.bind(this);
  }

  componentWillMount() {
    this.getOrders();
    this.getItems();
    this.getInventories();
    this.getInventoryCosts();
    this.getCurrentDate();
    this.getInventories();
  }

  componentDidMount() {
    this.getLineChartData();
    this.getBarChartData();
  }

  getLineChartData() {
    this.setState({
      lineChartData: {
        labels: ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'],
        datasets: [
          {
            label: 'Annual Sales',
            fill: true,
            lineTension: 0.1,
            backgroundColor: 'rgba(75,192,192,0.4)',
            borderColor: 'rgba(75,192,192,1)',
            borderCapStyle: 'butt',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: 'rgba(75,192,192,1)',
            pointBackgroundColor: '#fff',
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: 'rgba(75,192,192,1)',
            pointHoverBorderColor: 'rgba(220,220,220,1)',
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
            data: [65, 59, 80, 81, 56, 55, 40, 65, 59, 80, 81, 56],
          },
        ],
      },
    });
  }

  getBarChartData() {
    this.setState({
      barChartData: {
        label: 'My First dataset',
        backgroundColor: 'rgba(255,99,132,0.2)',
        borderColor: 'rgba(255,99,132,1)',
        borderWidth: 1,
        hoverBackgroundColor: 'rgba(255,99,132,0.4)',
        hoverBorderColor: 'rgba(255,99,132,1)',
        data: [65, 59, 80, 81, 56, 55, 40],
      },
    });
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
          inventories: res.data.inventories
        })
      ))
      .catch(err => console.log(err));
  }

  getInventoryCosts() {
    axios.get('/api/inventorycosts')
      .then((res) => {
        this.setState({
          inventory_costs: res.data.inventory_costs,
          dataLoaded: true,
        });
      });
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

  render() {
    console.log(this.state.inventory_costs, 'this is inventory costs');
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
                  orders={this.state.orders}
                />)}
              />
              <Route
                path="/dashboard"
                render={props => (<Dashboard
                  {...props}
                  inventories={this.state.inventories}
                  orders={this.state.orders}
                  inventory_costs={this.state.inventory_costs}
                  items={this.state.items}
                  dataLoaded={this.state.dataLoaded}
                  getInventories={this.getInventories}
                  getInventoryCosts={this.getInventoryCosts}

                />)}
              />

              <Route
                exact
                path="/overview"
                render={props => (<Overview
                  {...props}
                  lineChartData={this.state.lineChartData}
                  barChartData={this.state.barChartData}
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
