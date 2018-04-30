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
import { Button, Form, Modal, ModalBody, ModalFooter } from 'reactstrap';
import MissingInfoModal from './components/MissingInfoModal';

class App extends Component {
  // Initialize state
  constructor() {
    super();
    this.state = {
      monthLabels: ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'],
      orders: null,
      inventories: null,
      items: null,
      inventory_costs: null,
      dataLoaded: false,
      currentDate: null,
      years: [],
      currentMonth: null,
      currentYear: null,
      lineChartData: null,
      barChartData: null,
      salesYearToView: 2,
      salesModal: false,
      salesStatus: '',
      //dashboard stuff below
      item_id: '1',
      inventory_quantity: '',
      cost_per_unit: '',
      totalCost: null,
      modal: false,
      missing_info: false,
      inventoryCostData: {}
    };
    this.getOrders = this.getOrders.bind(this);
    this.getInventories = this.getInventories.bind(this);
    this.getItems = this.getItems.bind(this);
    this.getInventoryCosts = this.getInventoryCosts.bind(this);
    this.salesCreate = this.salesCreate.bind(this);
    this.getYears = this.getYears.bind(this);
    this.findKeyInObject = this.findKeyInObject.bind(this);
    this.getLineChartData = this.getLineChartData.bind(this);
    this.getBarChartData = this.getBarChartData.bind(this);
    this.handleSelectYearCall = this.handleSelectYearCall.bind(this);
    this.getCurrentMonth = this.getCurrentMonth.bind(this);
    this.getCurrentYear = this.getCurrentYear.bind(this);
    this.salesCreatedToggle = this.salesCreatedToggle.bind(this);


    this.handleInventorySubmit = this.handleInventorySubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleQuantityUpdate = this.handleQuantityUpdate.bind(this);
    this.handleCreateAndUpdate = this.handleCreateAndUpdate.bind(this);
    this.findTotalItemCost = this.findTotalItemCost.bind(this);
    this.checkFilled = this.checkFilled.bind(this);
    this.toggle = this.toggle.bind(this);
    this.toggleMissing = this.toggleMissing.bind(this);
  }

  componentWillMount() {
    this.getOrders();
    this.getItems();
    this.getInventories();
    this.getInventoryCosts();
    this.getCurrentDate();
    this.getInventories();
    this.getCurrentMonth();
    this.getCurrentYear();
  }

  componentDidMount() {
    this.getLineChartData();
    this.getBarChartData();
    console.log(this.state.inventory_costs, 'this is inventory costs bro')
  }

//get current month so we can compare with database month. and render specific month user choses on selector.
  getCurrentMonth() {
    const current = new Date().getMonth();
    console.log(current, 'this is currentMonth')
    let newCurrent = current + 1
    if (newCurrent < 10) {
      newCurrent = '0' + newCurrent;
    }
    this.setState({
      currentMonth: newCurrent
    });
  }

  getCurrentYear(){
    const currYear = new Date().getFullYear().toString();
    console.log(currYear, 'this is the current year')
    this.setState({
      currentYear: currYear
    })
  }

  getInventoryCostData() {
    this.setState({
      inventoryCostData : {
        inventory_quantity: this.state.inventory_quantity,
        cost_per_unit: this.state.cost_per_unit,

      }
    })
  }

  getLineChartData() {
    // choose how many year back you want to view
    this.state.salesYearToView

    this.setState({
      lineChartData: {
        labels: this.state.monthLables,
        datasets: [
          {
            label: 'Current Year Sales',
            fill: false,
            lineTension: 0,
            backgroundColor: 'rgba(75,192,192,0.4)',
            borderColor: 'rgba(75,192,192,1)',
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointRadius: 3,
            pointHitRadius: 10,
            data: [65, 59, 80, 81, 56, 55, 40, 65, 59, 80, 81, 56],
          },
          {
            label: 'Last Year Sales',
            lineTension: 0,
            fill: false,
            data: [50, 20, 40, 60, 40, 70, 50, 75, 40, 60, 52, 75],
          },
        ],
      },
    });
  }

  getBarChartData() {
    this.setState({
      barChartData: {
        labels: this.state.monthLables,
        datasets: [
          {
            label: 'My First dataset',
            backgroundColor: 'rgba(255,99,132,0.2)',
            borderColor: 'rgba(255,99,132,1)',
            borderWidth: 1,
            hoverBackgroundColor: 'rgba(255,99,132,0.4)',
            hoverBorderColor: 'rgba(255,99,132,1)',
            data: [65, 59, 80, 81, 56, 55, 40],
          },
        ],
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
          inventories: res.data.inventories,
        })
      ))
      .catch(err => console.log(err));
  }

  getInventoryCosts() {
    axios.get('/api/inventorycosts')
      .then((res) => {
        this.getYears(res.data.inventory_costs);
        this.setState({
          inventory_costs: res.data.inventory_costs,
          dataLoaded: true,
        })
        this.findTotalItemCost();
      })
  }

//this method calculates the total cost of inventory. will need to add another method to filter out expenses by month.
  findTotalItemCost() {
    let sum = 0;
    this.state.inventory_costs.map((inventory_cost) => {
      const itemTotal = inventory_cost.inventory_quantity * inventory_cost.cost_per_unit;
      sum += itemTotal;
      return sum;

    })
    console.log(sum, 'before setting state SUM')
    this.setState({
       totalCost: sum
    });
  }


//take in two parameters an array and a value and return with a .some method where if element equals value we return.
  checkIfExist(array, value){
    return array.some((element) => {
      return element === value
    })
  }

//iterate through a single keyvalue in a collection of objects and locate a keyvalue pair with a key that has _date with a .search method.
  findKeyInObject(date){
    for (let key in date) {
      if (key.search('_date') !== -1) {

        return key
      }
    }
  }

// we then use date[dateKey] to explicitly use the dateKey variable and location the date produced by forEach method and slice out the year portion with slice(0,4). thus getting current year. everything else is self explanatory.
  getYears(dates) {
    let year_array = [];
    dates.forEach((date) => {
      let dateKey = this.findKeyInObject(date);
      let curr_year = date[dateKey].slice(0,4);
      if (year_array.length === 0) {
        year_array.push(curr_year);
      } else if (!this.checkIfExist(year_array, curr_year)) {
        year_array.push(curr_year);
      }
    });
    this.setState({
      years: year_array,
    });
  }

  // trigger modal pop up to
  salesCreatedToggle(message) {
    this.setState({
      salesModal: !this.state.salesModal,
      salesStatus: message,
    });
  }

  // create new order and get that order id
  salesCreate(event, data) {
    event.preventDefault();
    axios.post('/api/orders', data)
      .then((res) => {
        if (res.status === 200) {
        // add newest order id as new key/value into data
          data.latestOrderId = res.data.last_order.order_id;

          // trigger modal pop up to notify that sales has created
          this.salesCreatedToggle('success');

          // axios call to update useditem table and in inventory table in database
          axios.post('/api/useditems', data);
        } else {
          this.salesCreatedToggle('failed');
        }
      });
  }

//used in dashboard year selector
  handleSelectYearCall(value){
    this.setState({
      currentYear: value
    });
  }

//used in dashboard month selector
  handleMonthCall(value) {
    this.setState({
      currentMonth: value
    })
  }

//toggles inventoryModal in state
  toggle(){
    this.setState({
      modal: !this.state.modal
    });
  }

//toggles missingInfo in state
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
      console.log('true')
      return true
    } else {
      console.log('false')
      return false
    }
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
        this.getInventoryCosts();
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
        this.getInventories();
      })
    } else {
      this.setState({
        missing_info: true
      })
    }
  }

  render() {
    // console.log(this.state.inventory_costs, 'this is inventory costs');
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
                  salesModal={this.state.salesModal}
                  salesCreatedToggle={this.salesCreatedToggle}
                  salesStatus={this.state.salesStatus}

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
                        monthLabels={this.state.monthLabels}
                        currentYear={this.state.currentYear}
                        years={this.state.years}
                        totalCost={this.state.totalCost}
                        modal = {this.state.modal}
                        missingInfo = {this.state.missing_info}

                        //handle methods
                        toggle = {this.toggle}
                        handleInventorySubmit = {this.handleInventorySubmit}
                        handleChange = {this.handleChange}
                        handleQuantityUpdate = {this.handleQuantityUpdate}
                        handleCreateAndUpdate = {this.handleCreateAndUpdate}
                        findTotalItemCost = {this.findTotalItemCost}
                        checkFilled = {this.checkFilled}
                        toggleMissing = {this.toggleMissing}
                        handleSelectYearCall={this.handleSelectYearCall}
                />}
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
        <MissingInfoModal missing_info = {this.state.missing_info}
                          toggleMissing = {this.toggleMissing}
        />
        <Footer />
      </div>

    );
  }
}

export default App;
