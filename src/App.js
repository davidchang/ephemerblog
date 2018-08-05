import React, { Component } from 'react';
import './App.css';
import Header from './Header';
import AuthProvider from './AuthProvider';

class App extends Component {
  render() {
    return (
      <AuthProvider>
        <div className="App">
          <Header />
        </div>
      </AuthProvider>
    );
  }
}

export default App;
