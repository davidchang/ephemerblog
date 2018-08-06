import React, { Fragment } from 'react';
import { AuthConsumer } from '../contexts/Auth';
import { PostsConsumer } from '../contexts/Posts';
import WritePost from './WritePost';
import PostList from '../PostList';

function Home() {
  return (
    <AuthConsumer>
      {({ user }) => {
        if (!user) {
          return null;
        }

        return (
          <Fragment>
            <PostsConsumer>
              {({ fetchPosts }) => (
                <WritePost
                  onPublish={() => fetchPosts(user.providerData[0].uid)}
                />
              )}
            </PostsConsumer>
            <PostList userID={user.providerData[0].uid} />
          </Fragment>
        );
      }}
    </AuthConsumer>
  );
}

export default Home;
