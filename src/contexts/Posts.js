import React, { createContext } from 'react';
import { getPosts } from '../firebaseActions';

const DEFAULT_STATE = {
  posts: [],
  loading: false,
  loaded: false,
};

const { Provider, Consumer } = createContext(DEFAULT_STATE);
export const PostsConsumer = Consumer;

export default class PostsProvider extends React.Component {
  state = DEFAULT_STATE;

  fetchPosts = authorID => {
    this.setState({
      loading: true,
    });

    getPosts(authorID)
      .then(querySnapshot => {
        this.setState({
          posts: querySnapshot.docs,
          loading: false,
          loaded: true,
        });
      })
      .catch(error => {
        console.log('Error getting documents: ', error);
        // todo show this; not exactly sure what this object is
        this.setState({ error, loading: false, loaded: true });
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
