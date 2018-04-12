import React, { Component } from 'react';
import '../css/Dashboard.css';
import FormInput from './FormInput';
import Inventory from './Inventory';

class Dashboard extends Component {
  constructor(){
    super();

  }





  render(){
    return (
      <div className="dashboard">
        <FormInput />
        <Inventory />
      </div>
    );
  }
}



export default Dashboard;
