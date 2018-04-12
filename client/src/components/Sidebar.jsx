import React from 'react';
import '../css/Sidebar.css';
import { NavLink } from 'react-router-dom';
import { Nav, NavItem } from 'reactstrap';

const Sidebar = props => {
  return (
    <div className="sidebar">
      <h3> This is sidebar </h3>
      <Nav className="sidenav">
        <NavItem className="nav-link">
          <NavLink to="/dashboard"> Update Inventory </NavLink>
        </NavItem>
        <NavItem className="nav-link">
          <NavLink to="/"> Sales </NavLink>
        </NavItem>
      </Nav>
    </div>
  );
}


export default Sidebar;
