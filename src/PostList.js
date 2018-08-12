import React, { Component } from 'react';
import { Box, Divider, Heading, Text } from 'gestalt';
import { PostsConsumer } from './contexts/Posts';

class PostList extends Component {
  constructor(props) {
    super(props);
    props.fetchPosts(props.userID);
  }

  render() {
    const { loaded, posts } = this.props;
    if (!loaded) {
      return null;
    }

    if (posts.length === 0) {
      return (
        <Box paddingY={4}>
          <Divider />
          <Heading>No Posts!</Heading>
        </Box>
      );
    }

    return posts.map(doc => (
      <Box key={doc.id} paddingY={4}>
        <Divider />
        <Box paddingY={2}>
          <Heading size="xs">
            {doc
              .data()
              .createdAt.toDate()
              .toString()}
          </Heading>
          <Text>{doc.data().text}</Text>
        </Box>
      </Box>
    ));
  }
}

function WrappedPostList(props) {
  return (
    <PostsConsumer>
      {postsState => <PostList {...postsState} {...props} />}
    </PostsConsumer>
  );
}

export default WrappedPostList;
