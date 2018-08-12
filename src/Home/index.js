import React, { Fragment } from 'react';
import { AuthConsumer } from '../contexts/Auth';
import { PostsConsumer } from '../contexts/Posts';
import WritePost from './WritePost';
import PostList from '../PostList';
import { getCurrentUserID } from '../contexts/Auth';

function Home() {
  return (
    <AuthConsumer>
      {({ loaded, user }) => {
        if (!loaded || !user) {
          return null;
        }

        return (
          <Fragment>
            <PostsConsumer>
              {({ fetchPosts }) => (
                <WritePost onPublish={() => fetchPosts(getCurrentUserID())} />
              )}
            </PostsConsumer>
            <PostList userID={getCurrentUserID()} />
          </Fragment>
        );
      }}
    </AuthConsumer>
  );
}

export default Home;
