import React, { Component } from 'react';
import { Box, Button, Flyout, TextField } from 'gestalt';
import { updateUserInfo } from './firebaseActions';

class ChangeUsernameFlyout extends Component {
  state = {
    open: false,
    username: this.props.initialUsername || '',
    saving: false,
  };

  handleClick = () => this.setState(() => ({ open: !this.state.open }));
  handleDismiss = () => this.setState(() => ({ open: false }));
  handleUsernameChange = ({ value }) => this.setState({ username: value });
  handleSave = () => {
    const { username } = this.state;
    this.setState({
      saving: true,
    });

    updateUserInfo({
      username,
    })
      .then(() =>
        this.setState({
          open: false,
          saving: false,
        }),
      )
      .catch(error => {
        console.error(error);
        this.setState({
          saving: false,
        });
      });
  };

  render() {
    const { open, username, saving } = this.state;

    return (
      <Box paddingX={2}>
        <div
          style={{ display: 'inline-block' }}
          ref={c => {
            this.anchor = c;
          }}
        >
          <Button onClick={this.handleClick} text="Change username" />
        </div>
        {open && (
          <Flyout
            anchor={this.anchor}
            idealDirection="down"
            onDismiss={this.handleDismiss}
            size="md"
          >
            <Box padding={3} width="100%">
              <TextField
                id="username"
                onChange={this.handleUsernameChange}
                placeholder="Username"
                value={username}
              />
              <Box marginTop={3}>
                <Button
                  disabled={saving}
                  onClick={this.handleSave}
                  text="Save username"
                />
              </Box>
            </Box>
          </Flyout>
        )}
      </Box>
    );
  }
}

export default ChangeUsernameFlyout;
