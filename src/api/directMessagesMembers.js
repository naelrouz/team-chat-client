import apolloClient from './apollo/apollo-client';
// import apolloProvider from './apollo/apollo-provider';

import DIRECT_MESSAGES_MEMBERS from './graphql/queries/DIRECT_MESSAGES_MEMBERS.gql';

// import NEW_CHANNEL_MESSAGE from './graphql/subscriptions/NEW_CHANNEL_MESSAGE.gql';

import store from '../store';

export default async team => {
  try {
    console.log('api.directMessagesMembers.user:', direct);

    const { data: { directMessagesMembers } } = await apolloClient.query({
      query: DIRECT_MESSAGES,
      variables: direct
    });

    // console.log('api.directMessagesMembersObserv: ', directMessagesMembersObserv);

    console.log('api.directMessagesMembers: ', directMessagesMembers);
    store.commit('SET_MESSAGES', directMessagesMembers);
  } catch (err) {
    console.error('api.directMessagesMembers.err:', err);
  }
};
