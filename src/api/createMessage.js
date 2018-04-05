// import gql from "graphql-tag";

// import _ from 'lodash';

import apolloClient from './apollo/apollo-client';
import CREATE_MESSAGE from './graphql/mutations/CREATE_MESSAGE.gql';

// import store from '../store';

export default newMessage =>
  // const { name } = channel;
  apolloClient.mutate({
    mutation: CREATE_MESSAGE,
    variables: newMessage
  });
