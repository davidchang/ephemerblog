import React from 'react';
import { AuthConsumer } from './AuthProvider';

export default function OnlyWhenAuthenticated(Component) {
  const Inner = () => {
    return (
      <AuthConsumer>
        {({ user }) => {
          if (!user) {
            return null;
          }

          return <Component />;
        }}
      </AuthConsumer>
    );
  };

  return Inner;
}
