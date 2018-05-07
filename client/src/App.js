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
import MissingInfoModal from './components/MissingInfoModal';

class App extends Component {
  // Initialize state
  constructor() {
    super();
    this.state = {
      months: ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'],
      yearColors: [
        'rgba(93,138,168,1)',
        'rgba(93,168,123,0.3)',
        'rgba(168,93,138,0.3)',
        'rgba(255,128,150,0.3)',
        'rgba(93,101,168,0.3)',
      ],
      orders: [],
      inventories: [],
      items: [],
      inventory_costs: [],
      dataLoaded: false,
      currentDate: null,
      years: [],
      currentMonth: null,
      currentYear: null,
      lineChartData: {},
      barChartData: {},
      salesYearToView: 1,
      salesModal: false,
      salesStatus: '',
      //dashboard stuff below
      item_id: '1',
      inventory_quantity: '',
      cost_per_unit: '',
      totalCost: null,
      modal: false,
      missing_info: false,
      low_inventory: false,
      inventoryCostData: [],
      inventoryData: [],
      barColor: []
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
    this.getCurrentMonth = this.getCurrentMonth.bind(this);
    this.getCurrentYear = this.getCurrentYear.bind(this);
    this.salesCreatedToggle = this.salesCreatedToggle.bind(this);
    this.handleYearsView = this.handleYearsView.bind(this);
    this.handleInventorySubmit = this.handleInventorySubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleQuantityUpdate = this.handleQuantityUpdate.bind(this);
    this.handleCreateAndUpdate = this.handleCreateAndUpdate.bind(this);
    this.findTotalItemCost = this.findTotalItemCost.bind(this);
    this.checkFilled = this.checkFilled.bind(this);
    this.toggle = this.toggle.bind(this);
    this.toggleMissing = this.toggleMissing.bind(this);

    this.getInventoryCostData = this.getInventoryCostData.bind(this);
    this.handleMonthYearChange = this.handleMonthYearChange.bind(this);
    this.preLoadInventoryCost = this.preLoadInventoryCost.bind(this);

  }

  componentDidMount() {
    this.getOrders();
    this.getItems();
    this.getInventories();
    this.getInventoryCosts();
    this.getCurrentDate();
    this.getInventories();
    this.getCurrentMonth();
    this.getCurrentYear();
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

  lineChartDataHelper(year) {
    console.log("helper running")
    // create array with length of 12, fill each with 0. then add 1 to each indice in data if year matches to represent a boolean 0,1 for month.
    const data = Array(12).fill(0);
    this.state.orders.map((order, i) => {
      const orderYear = order.order_date.split('-')[0]
      const orderMonth = Number(order.order_date.split('-')[1])
      if (orderYear === year) {
        data[orderMonth-1] += 1
      }
    })
    return data;
  }


//handleYearsView handles the tab selector and depending on the number you select the size of the array changes in getLineChartData.
  handleYearsView(e) {
    this.setState({
      salesYearToView: e,
    }, () => {
      this.getLineChartData();
    });
  }

  getLineChartData() {
    const yearsView = Number(this.state.salesYearToView);
    const yearColors = this.state.yearColors;
    const datasets = [];

    [...Array(yearsView)].map((e, i) => {
      if (this.state.years[i] === undefined) {
        return
      } else {
        datasets.push({
          label: this.state.years[i],
          fill: false,
          lineTension: 0,
          borderColor: yearColors[i],
          borderDashOffset: 0.0,
          borderJoinStyle: 'miter',
          pointRadius: 3,
          pointHitRadius: 10,
          data: this.lineChartDataHelper(this.state.years[i]),
        });
      }
    });
    this.setState({
      lineChartData: {
        labels: this.state.months,
        datasets,
      },
    });
  }

//helper function grabs inventory data and checks if less or more than 50 if so blue/red
  checkQuantity(data) {
    const blue = 'rgba(98,98,255,0.8)';
    const red = 'rgba(220,20,60,0.8)';
    const barColor = [];
    data.map((bar) => {
      console.log(bar, 'this is single bar');
      bar > 50 ? barColor.push(blue) : barColor.push(red);
    })
    this.setState({
      barColor: barColor,
    })
    console.log(barColor, 'this is colors for bars')
  }

  getBarChartData() {
    const data = [];
    {this.state.inventories.map((inventory) => {
      data.push(inventory.inventory_quantity);
    })}
    console.log(data, 'this is data after mapping inventory in barChart Data')
    this.checkQuantity(data);

    const items = this.state.items.map((item) => {
      return item.item[0].toUpperCase() + item.item.slice(1);
    });

    const backgroundColor = 'rgba(98,98,255,0.8)';

    this.setState({
      barChartData: {
        labels: items,
        datasets: [
          {
            label: 'Quantity',
            backgroundColor: this.state.barColor,
            borderColor: this.state.barColor,
            borderWidth: 1,
            // hoverBackgroundColor: 'rgba(98,98,255,0.4)',
            // hoverBorderColor: 'rgba(98,98,255,0.4)',
            data: data,
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
        // run filter through respond data to find all years.
        this.getYears(res.data.inventory_costs);
        this.setState({
          inventory_costs: res.data.inventory_costs,
          dataLoaded: true,
        })
        this.getLineChartData();
        this.findTotalItemCost();
        this.getInventoryCostData();
        this.preLoadInventoryCost();
        this.getBarChartData();
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


  /* take in two parameters an array and a value
  and return with a .some method where if element equals value we return. */
  checkIfExist(array, value) {
    return array.some((element) => {
      return element === value
    })
  }

  /* iterate through a single keyvalue in a collection of objects
  and locate a keyvalue pair with a key that has _date with a .search method. */
  findKeyInObject(date){
    for (let key in date) {
      if (key.search('_date') !== -1) {

        return key
      }
    }
  }

// we then use date[dateKey] to explicitly use the dateKey variable and locate the keyvalue pair from the forEach method. sliced out the year portion with slice(0,4). thus getting current year. followed by helper functions.
  getYears(dates) {
    const year_array = [];
    dates.forEach((date) => {
      const dateKey = this.findKeyInObject(date);
      let curr_year = date[dateKey].slice(0, 4);
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
          this.getOrders();
          this.getInventoryCosts()

          // axios call to update useditem table and in inventory table in database
          axios.post('/api/useditems', data)

        } else {
          this.salesCreatedToggle('failed');
        }
      })

  }


/*getCostData takes in two parameters, year and month.
Depending on its value and its availibility through the search method used on inventoryCost, the resulting data will be pushed to costData array and setting state to that array.
*/
  getCostData(yearValue, monthValue) {
    const costData = [];
    this.state.inventory_costs.map((inventoryCost) => {

        const inventoryCostDate = yearValue + '-' + monthValue;
        if (inventoryCost.inventory_date.search(inventoryCostDate) !== -1) {
            costData.push(inventoryCost)
          }
        }
      )
    this.setState({
      inventoryCostData: costData
    })
  }


/*
  this method takes in two parameters name and value when changes are made in the month or year selector. condition if and else sets getCost function.
*/
  getInventoryCostData(name, value) {
    if (name === 'currentMonth') {
      this.getCostData(this.state.currentYear, value);
    } else {
      this.getCostData(value, this.state.currentMonth);
    }
  }

//this method is set initially after inventory cost data is received so inventoryCost renders all current to date costs when page loads.
  preLoadInventoryCost() {
    const data = [];
    {this.state.inventory_costs.map((inventoryCost) => {
      const dateToday = (this.state.currentYear + '-' + this.state.currentMonth);
      if (inventoryCost.inventory_date.search(dateToday) > -1) {
        data.push(inventoryCost);
      }
    })}
    this.setState({
      inventoryCostData: data
    })
  }

//this is used in inventoryForm component, to handle the changes to years and months in the selectors.
  handleMonthYearChange(e) {
    const name = e.target.name
    const value = e.target.value
    this.setState({
      [name]: value
    })
    this.getInventoryCostData(name, value)
  }

//toggles inventoryModal in state, exists in FormModal component
  toggle(){
    this.setState({
      modal: !this.state.modal
    });
  }

//toggles missingInfo in state, exists in MissingInfo Component
  toggleMissing() {
    this.setState({
      missing_info: !this.state.missing_info
    });
  }

//toggles low_inventory in state
  toggleRefill() {
    this.setState({
      low_inventory: !this.state.low_inventory
    })
  }

 //handles changes in InventoryForm Component, changes State of item_id, inventoryquantity, and cpu
  handleChange(e) {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({
      [name]: value,
    });
  }

//checkedFilled only active when submit button is pressed. exists handleInventorySubmit method and is used in handleCreateAndUpdate method located in InventoryForm Component.
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
                  months={this.state.months}
                  currentYear={this.state.currentYear}
                  years={this.state.years}
                  totalCost={this.state.totalCost}
                  modal = {this.state.modal}
                  missingInfo = {this.state.missing_info}
                  inventoryCostData={this.state.inventoryCostData}
                  currentMonth={this.state.currentMonth}
                  currentYear={this.state.currentYear}

                  //handle methods
                  toggle = {this.toggle}
                  handleInventorySubmit = {this.handleInventorySubmit}
                  handleChange = {this.handleChange}
                  handleQuantityUpdate = {this.handleQuantityUpdate}
                  handleCreateAndUpdate = {this.handleCreateAndUpdate}
                  findTotalItemCost = {this.findTotalItemCost}
                  checkFilled = {this.checkFilled}
                  toggleMissing={this.toggleMissing}
                  handleSelectYearCall = {this.handleSelectYearCall}
                  handleMonthCall = {this.handleMonthCall}
                  handleMonthYearChange = {this.handleMonthYearChange}
                />}
              />

              <Route
                exact
                path="/overview"
                render={props => (<Overview
                  {...props}
                  lineChartData={this.state.lineChartData}
                  barChartData={this.state.barChartData}
                  handleYearsView={this.handleYearsView}
                  years={this.state.years}
                  orders={this.state.orders}
                  inventory_costs={this.state.inventory_costs}
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
