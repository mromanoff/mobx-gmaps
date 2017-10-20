import React, { Component } from 'react';
import './App.css';
import Providers from './Providers';


class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Google map POC</h1>
        </header>
        <Providers/>
      </div>
    );
  }
}

export default App;
