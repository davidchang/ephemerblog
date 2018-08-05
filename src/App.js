import React, { Component } from 'react';
import './App.css';
import Header from './Header';
import AuthProvider from './AuthProvider';
import WritePost from './WritePost';

class App extends Component {
  render() {
    return (
      <AuthProvider>
        <div className="App">
          <Header />
          <WritePost />
        </div>
      </AuthProvider>
    );
  }
}

export default App;
