import React from 'react';
import '../css/Sidebar.css';
import appLogo from '../img/inventoryapplogo.png';
import { NavLink } from 'react-router-dom';
import { Nav, NavItem } from 'reactstrap';

const Sidebar = (props) => {
  return (
    <div className="sidebar">
      <NavLink to="/"><img src={appLogo} alt="Warehouse" className="app-logo" /></NavLink>
      <Nav className="sidenav" vertical>
        <NavItem className="nav-link">
          <NavLink to="/">Sales</NavLink>
        </NavItem>
        <NavItem className="nav-link">
          <NavLink to="/dashboard">Inventory</NavLink>
        </NavItem>
        <NavItem className="nav-link">
          <NavLink to="/overview">Overview</NavLink>
        </NavItem>
      </Nav>
    </div>
  );
};


export default Sidebar;
