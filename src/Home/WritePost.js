import React, { Component } from 'react';
import OnlyWhenAuthenticated from '../OnlyWhenAuthenticatedHOC';
import { Box, Button, TextArea } from 'gestalt';
import firebase from 'firebase';
import { getCurrentUser } from '../contexts/Auth';

class WritePost extends Component {
  state = {
    value: '',
  };

  handleChange = ({ value }) => this.setState({ value });

  handleSubmit = () => {
    const { onPublish } = this.props;
    firebase
      .firestore()
      .collection('posts')
      .add({
        createdAt: new Date(),
        text: this.state.value,
        authorID: getCurrentUser().providerData[0].uid,
      })
      .then(docRef => {
        console.log('Document written with ID: ', docRef.id);
        this.setState(
          {
            value: '',
          },
          () => onPublish && onPublish(docRef),
        );
      })
      .catch(error => {
        console.error('Error adding document: ', error);
      });
  };

  render() {
    const { value } = this.state;
    // TODO would be cool to pull down some random prompts for the placeholder text
    return (
      <Box>
        <TextArea
          id="writePost"
          onChange={this.handleChange}
          placeholder="Write something..."
          value={value}
        />
        <Box display="flex" justifyContent="end" marginTop={2}>
          <Box>
            <Button
              text="Submit"
              color="red"
              disabled={!value.length}
              onClick={this.handleSubmit}
            />
          </Box>
        </Box>
      </Box>
    );
  }
}

export default OnlyWhenAuthenticated(WritePost);
