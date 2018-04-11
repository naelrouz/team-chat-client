import apolloClient from './apollo/apollo-client';
// import apolloProvider from './apollo/apollo-provider';

import DIRECT_MESSAGES from './graphql/queries/DIRECT_MESSAGES.gql';

// import NEW_CHANNEL_MESSAGE from './graphql/subscriptions/NEW_CHANNEL_MESSAGE.gql';

import store from '../store';

export default async direct => {
  try {
    console.log('api.directMessages.user:', direct);

    const { data: { directMessages } } = await apolloClient.query({
      query: DIRECT_MESSAGES,
      variables: direct
    });

    // console.log('api.directMessagesObserv: ', directMessagesObserv);

    console.log('api.directMessages: ', directMessages);
    store.commit('SET_MESSAGES', directMessages);
  } catch (err) {
    console.error('api.directMessages.err:', err);
  }
};
