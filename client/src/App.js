import React, { Component } from 'react';
import './App.css';
import { Switch, Route } from 'react-router-dom';
import Axios from 'axios';

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
      inventory: null,
      dataLoaded: false
    }
  }

  componentDidMount() {

  }




  render() {
    return (
      <div className="App">
        <Header />
        <Sidebar />
        <div className="body-container">
         <Switch>
          <Route
            exact
            path='/'
            render={props => <Sales {...props} />}
          />
          <Route
            exact
            path='/dashboard'
            render={props => <Dashboard {...props} />}
          />

        </Switch>
        </div>

        <Footer />
      </div>

    );
  }
}














export default App;
