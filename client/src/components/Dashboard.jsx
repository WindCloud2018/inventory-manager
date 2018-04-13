import React, { Component } from 'react';
import '../css/Dashboard.css';
import FormInput from './FormInput';
import Inventory from './Inventory';

class Dashboard extends Component {


  render(){
    return (
      <div className="dashboard">
        <FormInput {...this.props}/>
        <Inventory {...this.props}/>
      </div>
    );
  }
}



export default Dashboard;
