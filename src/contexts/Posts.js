import React, { createContext } from 'react';
import firebase from 'firebase';

const DEFAULT_STATE = {
  posts: [],
  fetching: false,
  fetched: false,
};

const { Provider, Consumer } = createContext(DEFAULT_STATE);
export const PostsConsumer = Consumer;

export default class PostsProvider extends React.Component {
  state = DEFAULT_STATE;

  fetchPosts = authorID => {
    this.setState({
      fetching: true,
    });

    firebase
      .firestore()
      .collection('posts')
      .where('authorID', '==', authorID)
      .orderBy('createdAt', 'desc')
      .get()
      .then(querySnapshot => {
        this.setState({
          posts: querySnapshot.docs,
          fetching: false,
          fetched: true,
        });
      })
      .catch(error => {
        console.log('Error getting documents: ', error);
        // todo show this; not exactly sure what this object is
        this.setState({ error, fetching: false, fetched: true });
      });
  };

  render() {
    return (
      <Provider value={{ ...this.state, fetchPosts: this.fetchPosts }}>
        {this.props.children}
      </Provider>
    );
  }
}
