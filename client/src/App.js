import React, { Component } from 'react';
import './App.css';

class App extends Component {
  // Initialize state
  constructor() {
    super();
    this.state = {
      passwords: [],
      test: null
    };
  }

  // Fetch passwords after first mount
  componentDidMount() {
    this.getPasswords();
    this.getTest();
  }

  getPasswords = () => {
    // Get the passwords and store them in state
    fetch('/api/passwords')
      .then(res => res.json())
      .then(passwords => this.setState({ passwords }));
  }

  getTest() {
    fetch('/api/test')
      .then(res => res.json())
      .then((res) => {
        this.setState({
          test: res.data.test,
        });
      })
      .catch(err => console.log(err));
  }

  render() {
    const { passwords } = this.state;

    return (
      <div className="App">
        {/* Render the passwords if we have them */}
        {(passwords.length && this.state.test !== null) ? (
          <div>
            <h1>5 Passwords.</h1>
            <p>{this.state.test[0].amount}</p>
            <ul className="passwords">
              {/*
                Generally it's bad to use "index" as a key.
                It's ok for this example because there will always
                be the same number of passwords, and they never
                change positions in the array.
              */}
              {passwords.map((password, index) =>
                <li key={index}>
                  {password}
                </li>
              )}
            </ul>
            <button
              className="more"
              onClick={this.getPasswords}>
              Get More
            </button>
          </div>
        ) : (
          // Render a helpful message otherwise
          <div>
            <h1>No passwords :(</h1>
            <button
              className="more"
              onClick={this.getPasswords}>
              Try Again?
            </button>
          </div>
        )}
      </div>
    );
  }
}

export default App;
