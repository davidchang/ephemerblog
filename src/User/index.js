import React, { Fragment, Component } from 'react';
import PostList from '../PostList';
import { findUserByUsername } from '../firebaseActions';

class User extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loaded: false,
      user: null,
    };

    const { id } = props.match.params;
    findUserByUsername(id)
      .then(user => {
        if (user) {
          this.setState({
            user,
            loaded: true,
          });
        } else {
          this.setState({
            loaded: true,
          });
        }
      })
      .catch(e => {
        console.error('e', e);
        this.setState({
          loaded: true,
        });
      });
  }
  render() {
    const { loaded, user } = this.state;
    if (!loaded) {
      return null;
    }

    return (
      <Fragment>
        <h1>{user.username}</h1>
        <PostList userID={user.userID} />
      </Fragment>
    );
  }
}

export default User;
