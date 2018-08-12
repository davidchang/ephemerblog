import React, { Fragment, Component } from 'react';
import PostList from '../PostList';

class User extends Component {
  render() {
    const { id } = this.props.match.params;
    return (
      <Fragment>
        <h1>User {id}</h1>
        <PostList userID={id} />
      </Fragment>
    );
  }
}

export default User;
