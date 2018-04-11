// import gql from "graphql-tag";

// import _ from 'lodash';

import apolloClient from './apollo/apollo-client';
import CREATE_DIRECT_MESSAGE from './graphql/mutations/CREATE_DIRECT_MESSAGE.gql';

// import store from '../store';

export default newDirectMessage =>
  // const { name } = channel;
  apolloClient.mutate({
    mutation: CREATE_DIRECT_MESSAGE,
    variables: newDirectMessage,
    update: async (proxy, { data: { createDirectMessage } }) => {
      console.log(
        'api.createDirectMessage.update.data.createDirectMessage: ',
        createDirectMessage
      );
    }
  });
