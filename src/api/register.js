import gql from 'graphql-tag';

import apolloClient from '../apollo/apollo-client';

export default user =>
  apolloClient.mutate({
    mutation: gql`
      mutation {
        register(username: "${user.username}", password: "${
      user.password
    }", email: "${user.email}") {
          status
          errors{
            path,
            message
          }
        }
      }
    `
  });
