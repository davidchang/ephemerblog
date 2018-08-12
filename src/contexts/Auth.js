import React, { createContext } from 'react';
import firebase from 'firebase';

const DEFAULT_STATE = {
  user: null,
  userLoaded: false,
};

const { Provider, Consumer } = createContext(DEFAULT_STATE);
export const AuthConsumer = Consumer;

export default class AuthProvider extends React.Component {
  state = DEFAULT_STATE;

  constructor(props) {
    super(props);
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        // User is signed in.
        console.log('user', user);
        this.setState({
          user,
          userLoaded: true,
        });
      } else {
        // No user is signed in.
        this.setState({
          user: null,
          userLoaded: true,
        });
      }
    });
  }

  render() {
    return <Provider value={this.state}>{this.props.children}</Provider>;
  }
}

export const getCurrentUser = () => firebase.auth().currentUser;
