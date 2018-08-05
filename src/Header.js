import React, { Component, Fragment } from 'react';
import firebase from 'firebase';
import { AuthConsumer } from './AuthProvider';

class Header extends Component {
  constructor(props) {
    super(props);
    const provider = new firebase.auth.TwitterAuthProvider();

    this.state = {
      provider,
    };
  }

  logIn = () => {
    firebase
      .auth()
      .signInWithPopup(this.state.provider)
      .then(result => {
        const { user, additionalUserInfo } = result;
        const { displayName, photoURL } = user;
        const { username } = additionalUserInfo;

        const userInfo = { displayName, photoURL, username };

        console.log('result', result, userInfo);
      })
      .catch(error => {
        const { code, message } = error;

        console.log('error', error, { code, message });
      });
  };

  logOut = () => {
    firebase
      .auth()
      .signOut()
      .then(() => {
        // Sign-out successful.
      })
      .catch(error => {
        // An error happened.
      });
  };

  render() {
    return (
      <AuthConsumer>
        {({ user }) => {
          if (user) {
            return (
              <Fragment>
                <span>Logged in as {user.displayName}</span>
                <button onClick={this.logOut}>Log Out</button>
              </Fragment>
            );
          }
          return <button onClick={this.logIn}>Log In</button>;
        }}
      </AuthConsumer>
    );
  }
}

export default Header;
