import React, { Component } from 'react';
import './App.css';
import Header from './Header';
import AuthProvider from './contexts/Auth';
import PostsProvider from './contexts/Posts';
import Home from './Home';

class App extends Component {
  render() {
    return (
      <div className="App">
        <AuthProvider>
          <PostsProvider>
            <Header />
            <Home />
          </PostsProvider>
        </AuthProvider>
      </div>
    );
  }
}

export default App;
