import React from 'react';
import { AuthConsumer } from './contexts/Auth';

export default function OnlyWhenAuthenticated(Component) {
  const Inner = props => {
    return (
      <AuthConsumer>
        {({ userLoaded, user }) => {
          if (!userLoaded || !user) {
            return null;
          }

          return <Component {...props} />;
        }}
      </AuthConsumer>
    );
  };

  return Inner;
}
