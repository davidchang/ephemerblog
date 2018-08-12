import React, { createContext } from 'react';
import firebase from 'firebase';
import { getUserInfo } from '../firebaseActions';

const DEFAULT_STATE = {
  user: null,
  loaded: false,
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
        console.log('getCurrentUserID', getCurrentUserID());
        getUserInfo(getCurrentUserID()).then(doc => {
          if (doc.exists) {
            console.log('Document data:', doc.data());
          } else {
            // doc.data() will be undefined in this case
            console.log('No such document!');
          }
          this.setState({
            user: {
              displayName: user.displayName,
              username: doc.exists ? doc.data().username : null,
            },
            loaded: true,
          });
        });
      } else {
        // No user is signed in.
        this.setState({
          user: null,
          loaded: true,
        });
      }
    });
  }

  render() {
    return <Provider value={this.state}>{this.props.children}</Provider>;
  }
}

export const getCurrentUser = () => firebase.auth().currentUser;
export const getCurrentUserID = () => getCurrentUser().providerData[0].uid;
