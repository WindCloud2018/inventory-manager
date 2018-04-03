import React, { Component } from 'react';
import './App.css';

class App extends Component {
  // Initialize state
  constructor() {
    super();
    this.state = {
      test: null,
      amount: 12345,
      description: 'tester',
      asset: true,
      category_id: 1,
      dataLoaded: false
    };
    this.getTest = this.getTest.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  // Fetch passwords after first mount
  componentDidMount() {
    this.getTest();
  }

  getTest() {
    fetch('/api/test')
      .then(res => res.json())
      .then((res) => {
        this.setState({
          test: res.data.test,
          dataLoaded: true
        });
      })
      .catch(err => console.log(err));
  }

  testCreate(event, data) {
    console.log(data)
    event.preventDefault();
    fetch('/api/test', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    }).then(res => res.json())
      .then(res => {
        this.getTest();
      });
  }

  handleChange(e) {
    const name = e.target.name;
    const val = e.target.value;
    this.setState({
      [name]: val,
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    {this.testCreate(e, this.state)}
  }

  render() {
    return (
      <div className="App">
        {this.state.dataLoaded === true ? (
          <form onSubmit={this.handleSubmit}>
            <label>
              <input className="submitTitle" type="text" name="amount" value={this.state.amount} placeholder="Amount" onChange={this.handleChange} />
                <br/>
              <input className="submitPost" type="text" name="description" value={this.state.description} placeholder="Description" onChange={this.handleChange} />
            </label>
            <br/>
            <input className="submitButton" type="submit" value="Submit" />
          </form>
        ) : (
          <p> Loading </p>
        )}
      </div>
    );
  }
}

export default App;
