import React, { Component } from 'react';
import '../css/Dashboard.css';
import InventoryCosts from './InventoryCosts';
import Inventory from './Inventory';
import axios from 'axios';
import { Button, Form, Modal, ModalBody, ModalFooter } from 'reactstrap';

const Dashboard = props => {

    return (
      <div className="dashboard">

        <div className="selector-container">

          <form className="selector-container-left">
            <select value={props.currentMonth}
                    onChange={(e) => {props.handleMonthCall(e.target.value)}}
            >
            {props.monthLabels.map((month, i) => {
              const index = i < 9 ? '0' + (i + 1) :
              (String(i+1))
              return <option key={i}
                           value={index}
                   >
                {month}
              </option>
            })}
            </select>
          </form>

          <form className="selector-container-right">
            <select value={props.currentYear}
                    onChange={(e) => {
                    props.handleSelectYearCall(e.target.value)}}>
            {props.years.map((year, i) => {
              return <option  key={i}
                              value={year}>
              {year}
              </option>
            })}
            </select>
          </form>
        </div>

        <div>
        <p>Months Go Here</p>
        </div>

        <InventoryCosts {...props} />

        <Inventory {...this.props}
                   handleChange={props.handleChange}
                   toggle={props.toggle}
                   inventory_id={props.inventory_id}
                   item_id={props.item_id}
                   inventory_quantity={props.inventory_quantity}
                   cost_per_unit={props.cost_per_unit}
                   modal={props.modal}
                   handleCreateAndUpdate={props.handleCreateAndUpdate}
                   findTotalItemCost={props.findTotalItemCost}
                   checkFilled={props.checkFilled}
                   toggleMissing={props.toggleMissing}

        />

      {/* Show this modal warning if missing fields were not filled in */}
      <Form>
      <Modal isOpen={props.missing_info}
             className = {props.className}>
             <ModalBody>
              Please Fill Out All Sections
            </ModalBody>
            <ModalFooter>
              <Button color="danger" onClick={props.toggleMissing}> OK </Button>
            </ModalFooter>
      </Modal>
      </Form>
    </div>
    );
}



export default Dashboard;
