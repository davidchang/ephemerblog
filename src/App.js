import React, { Component } from 'react';
import { HashRouter as Router, Route } from 'react-router-dom';
import './App.css';
import Header from './Header';
import AuthProvider from './contexts/Auth';
import PostsProvider from './contexts/Posts';
import User from './User';
import Home from './Home';

class App extends Component {
  render() {
    return (
      <Router>
        <AuthProvider>
          <PostsProvider>
            <div className="App">
              <Header />
              <Route path="/u/:id" component={User} />
              <Route exact path="/" component={Home} />
            </div>
          </PostsProvider>
        </AuthProvider>
      </Router>
    );
  }
}

export default App;
