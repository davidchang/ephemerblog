import React, { Component } from 'react';
import firebase from 'firebase';
import { AuthConsumer } from './contexts/Auth';
import { Box, Button, Heading, Text } from 'gestalt';

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
              <Box paddingY={5}>
                <Heading>EphemerBlog</Heading>
                <Box display="flex" justifyContent="start">
                  <Box
                    marginRight={2}
                    display="flex"
                    direction="column"
                    justifyContent="center"
                  >
                    <Text>Logged in as {user.displayName}</Text>
                  </Box>
                  <Box>
                    <Button onClick={this.logOut} text="Log Out" />
                  </Box>
                </Box>
              </Box>
            );
          }
          return (
            <Box paddingY={5}>
              <Heading>EphemerBlog</Heading>
              <Button inline onClick={this.logIn} text="Log In" />
            </Box>
          );
        }}
      </AuthConsumer>
    );
  }
}

export default Header;
