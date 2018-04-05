import React, { Component } from 'react';
import './App.css';

class App extends Component {
  // Initialize state
  constructor() {
    super();
    this.state = {
      tests: null,
      title: '',
      description: '',
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
          tests: res.data.test,
          dataLoaded: true
        });
      })
      .catch(err => console.log(err));
  }

  testCreate(event, data) {
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

  deleteTest(id) {
    const rootUrl = window.location.origin;
    const pathUrl = `/api/test/${id}`;
    const newUrl = rootUrl.concat(pathUrl);
    // const newUrl = window.location.pathname.slice(0,1);
    fetch(newUrl, {
      method: 'DELETE',
    }).then(res => res.json())
      .then(res => {
        this.getTest();
      });
  }

  editTest(id) {

  }

  render() {
    return (
      <div className="App">
        {this.state.dataLoaded === true ? (
          <div>
            {this.state.tests.map((test, i) => (
              <div key={test.id}>
                <p>{test.title}</p>
                <p>{test.description}</p>
                <button onClick={(id) =>
                  this.editTest(test.id)
                }>Edit</button>
                <button onClick={(id) =>
                  this.deleteTest(test.id)
                }>Delete</button>
              </div>
            ))}
            <form onSubmit={this.handleSubmit}>
              <label>
                <input className="submitTitle" type="text" name="title" value={this.state.title} placeholder="Title" onChange={this.handleChange} />
                  <br/>
                <input className="submitPost" type="text" name="description" value={this.state.description} placeholder="Description" onChange={this.handleChange} />
              </label>
              <br/>
              <input className="submitButton" type="submit" value="Submit" />
            </form>
          </div>
        ) : (
          <p> Loading </p>
        )}
      </div>
    );
  }
}

export default App;
