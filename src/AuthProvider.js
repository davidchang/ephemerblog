import React, { createContext } from 'react';
import firebase from 'firebase';

const DEFAULT_STATE = {
  user: null,
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
        });
      } else {
        // No user is signed in.
        this.setState({
          user: null,
        });
      }
    });
  }

  render() {
    return <Provider value={this.state}>{this.props.children}</Provider>;
  }
}
