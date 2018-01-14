import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Text from './Text';
import GetHeader from './GetHeader';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <p className="App-intro">
          <Text text="ハンズオン" />
          <GetHeader />
        </p>
      </div>
    );
  }
}

export default App;
